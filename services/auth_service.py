import uuid
from datetime import datetime, timedelta, date
from sqlalchemy.orm import Session
from fastapi import HTTPException

from core.security import hashear_contrasenia, verificar_contrasenia, crear_token_acceso
from core.config import settings
from models.usuario import Usuario
from models.representante_legal import RepresentanteLegal
from models.token_autorizacion import TokenAutorizacion
from models.billetera import Billetera
from models.portafolio import Portafolio
from schemas.usuario import RegistroIn, LoginIn
from services.email_service import enviar_autorizacion_parental, enviar_cuenta_activada, enviar_cuenta_rechazada

def calcular_edad(fecha_nacimiento: date) -> int:
    hoy = date.today()
    return hoy.year - fecha_nacimiento.year - (
        (hoy.month, hoy.day) < (fecha_nacimiento.month, fecha_nacimiento.day)
    )

def registrar_usuario(datos: RegistroIn, db: Session):
    edad = calcular_edad(datos.fecha_nacimiento)
    if not (13 <= edad <= 17):
        raise HTTPException(status_code=400, detail="La edad debe estar entre 13 y 17 años")

    if db.query(Usuario).filter(Usuario.email == datos.email).first():
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    if db.query(Usuario).filter(Usuario.dni == datos.dni).first():
        raise HTTPException(status_code=400, detail="El DNI ya está registrado")

    usuario = Usuario(
        nombre=datos.nombre,
        apellido=datos.apellido,
        dni=datos.dni,
        fecha_nacimiento=datos.fecha_nacimiento,
        email=datos.email,
        contrasenia=hashear_contrasenia(datos.contrasenia),
        estado_cuenta="pendiente"
    )
    db.add(usuario)
    db.flush()

    rep = RepresentanteLegal(
    nombre=datos.representante.nombre,
    apellido=datos.representante.apellido,
    dni=datos.representante.dni,
    email=datos.representante.email,
    usuario_id=usuario.id
    )
    db.add(rep)

    db.add(Billetera(saldo_disponible=0.0, usuario_id=usuario.id))
    db.add(Portafolio(valor_total=0.0, usuario_id=usuario.id))

    token = _generar_token_parental(usuario.id, db)
    db.commit()

    enviar_autorizacion_parental(rep.email, usuario.nombre, token.uuid)

    return {"mensaje": "Cuenta creada. Se envió email de autorización al representante legal."}

def _generar_token_parental(usuario_id: int, db: Session) -> TokenAutorizacion:
    vencimiento = datetime.utcnow() + timedelta(hours=settings.TOKEN_PARENTAL_EXPIRE_HOURS)
    token = TokenAutorizacion(
        uuid=str(uuid.uuid4()),
        vencimiento=vencimiento,
        utilizado=False,
        usuario_id=usuario_id
    )
    db.add(token)
    return token

def autorizar_cuenta(token_uuid: str, accion: str, db: Session):
    token = db.query(TokenAutorizacion).filter(TokenAutorizacion.uuid == token_uuid).first()

    if not token:
        raise HTTPException(status_code=404, detail="Token no encontrado")
    if token.utilizado:
        raise HTTPException(status_code=400, detail="Este link ya fue utilizado")
    if datetime.utcnow() > token.vencimiento:
        raise HTTPException(status_code=400, detail="El token expiró. Solicitá un reenvío.")

    token.utilizado = True
    usuario = db.query(Usuario).filter(Usuario.id == token.usuario_id).first()

    if accion == "aprobar":
        usuario.estado_cuenta = "activa"
        db.commit()
        enviar_cuenta_activada(usuario.email, usuario.nombre)
        return {"mensaje": "Cuenta activada correctamente"}
        
    else:
        db.delete(usuario)
        db.commit()
        enviar_cuenta_rechazada(usuario.email, usuario.nombre)
        return {"mensaje": "Cuenta rechazada y eliminada"}
        

def reenviar_token(email: str, db: Session):
    usuario = db.query(Usuario).filter(Usuario.email == email).first()
    if not usuario or usuario.estado_cuenta != "pendiente":
        raise HTTPException(status_code=400, detail="No hay cuenta pendiente con ese email")

    token = _generar_token_parental(usuario.id, db)
    db.commit()
    print(f"[DEV] Nuevo token: /auth/autorizar/{token.uuid}")
    return {"mensaje": "Token reenviado"}

def iniciar_sesion(datos: LoginIn, db: Session):
    usuario = db.query(Usuario).filter(Usuario.email == datos.email).first()

    if not usuario or not verificar_contrasenia(datos.contrasenia, usuario.contrasenia):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    if usuario.estado_cuenta == "pendiente":
        raise HTTPException(status_code=403, detail="Cuenta pendiente de autorización parental")

    if usuario.estado_cuenta == "suspendida":
        raise HTTPException(status_code=403, detail="Cuenta suspendida. Contactá al administrador.")

    token = crear_token_acceso({"sub": str(usuario.id), "rol": "menor"})
    return {"access_token": token, "token_type": "bearer", "rol": "menor"}