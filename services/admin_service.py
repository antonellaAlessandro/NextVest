from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.usuario import Usuario
from models.instrumento import Instrumento
from models.admin import Administrador
from schemas.orden import InstrumentoCreate
from core.security import verificar_contrasenia, crear_token_acceso
from external.yfinance_cliente import obtener_precio_actual

def iniciar_sesion_admin(email: str, contrasenia: str, db: Session):
    admin = db.query(Administrador).filter(Administrador.email == email).first()
    if not admin or not verificar_contrasenia(contrasenia, admin.contrasenia):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    token = crear_token_acceso({"sub": str(admin.id), "rol": "admin"})
    return {"access_token": token, "token_type": "bearer", "rol": "admin"}

def listar_usuarios(db: Session):
    return db.query(Usuario).all()

def cambiar_estado_usuario(usuario_id: int, estado: str, db: Session):
    if estado not in ("activa", "suspendida", "pendiente"):
        raise HTTPException(status_code=400, detail="Estado inválido")
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    usuario.estado_cuenta = estado
    db.commit()
    return {"mensaje": f"Estado actualizado a {estado}"}

def listar_instrumentos(db: Session):
    return db.query(Instrumento).all()

def crear_instrumento(datos: InstrumentoCreate, db: Session):
    instrumento = Instrumento(
        nombre=datos.nombre,
        ticker=datos.ticker,
        tipo=datos.tipo,
        descripcion=datos.descripcion,
        perfil_minimo=datos.perfil_minimo,
        activo=True,
        precio_actual=0.0
    )
    db.add(instrumento)
    db.commit()
    db.refresh(instrumento)
    return instrumento

def toggle_instrumento(instrumento_id: int, activo: bool, db: Session):
    instrumento = db.query(Instrumento).filter(Instrumento.id == instrumento_id).first()
    if not instrumento:
        raise HTTPException(status_code=404, detail="Instrumento no encontrado")
    instrumento.activo = activo
    db.commit()
    return {"mensaje": "Estado del instrumento actualizado"}

def obtener_configuracion(db: Session):
    from core.config import settings
    return {
        "token_parental_expire_hours": settings.TOKEN_PARENTAL_EXPIRE_HOURS,
        "resumen_semanal_activo": settings.RESUMEN_SEMANAL_ACTIVO
    }
def actualizar_precios_mercado(db: Session):
    """
    Recorre todos los instrumentos de tipo Cedear y Accion,
    y actualiza su precio_actual consultando yfinance.
    """
    instrumentos = db.query(Instrumento).filter(
        Instrumento.tipo.in_(["Cedear", "Accion"]),
        Instrumento.activo == True
    ).all()

    actualizados = []
    fallidos = []
    for inst in instrumentos:
        precio = obtener_precio_actual(inst.ticker)
        if precio is not None:
            inst.precio_actual = precio
            actualizados.append(inst.nombre)
        else:
            fallidos.append(inst.nombre)

    db.commit()
    return {
        "actualizados": actualizados,
        "fallidos": fallidos
    }