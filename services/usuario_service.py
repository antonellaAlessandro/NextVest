from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.usuario import Usuario
from models.perfil_riesgo import PerfilRiesgo
from models.representante_legal import RepresentanteLegal
from schemas.usuario import UsuarioUpdate
from datetime import date

def obtener_usuario(usuario_id: int, db: Session) -> Usuario:
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

def actualizar_usuario(usuario_id: int, datos: UsuarioUpdate, db: Session) -> Usuario:
    usuario = obtener_usuario(usuario_id, db)
    if datos.nombre:
        usuario.nombre = datos.nombre
    if datos.apellido:
        usuario.apellido = datos.apellido
    if datos.dni:
        dni_existente = db.query(Usuario).filter(
            Usuario.dni == datos.dni,
            Usuario.id != usuario_id
        ).first()
        if dni_existente:
            raise HTTPException(status_code=400, detail="El DNI ya está registrado")
        usuario.dni = datos.dni
    db.commit()
    db.refresh(usuario)
    return usuario

def cambiar_contrasenia(usuario_id: int, contrasenia_actual: str, contrasenia_nueva: str, db: Session):
    from core.security import verificar_contrasenia, hashear_contrasenia
    usuario = obtener_usuario(usuario_id, db)
    if not verificar_contrasenia(contrasenia_actual, usuario.contrasenia):
        raise HTTPException(status_code=400, detail="La contraseña actual es incorrecta")
    usuario.contrasenia = hashear_contrasenia(contrasenia_nueva)
    db.commit()
    return {"mensaje": "Contraseña actualizada correctamente"}

def guardar_perfil_riesgo(usuario_id: int, respuestas: dict, db: Session):
    puntaje = sum(respuestas.values())
    if puntaje <= 4:
        tipo = "conservador"
    else:
        tipo = "moderado"

    perfil = db.query(PerfilRiesgo).filter(PerfilRiesgo.usuario_id == usuario_id).first()
    if perfil:
        perfil.tipo = tipo
        perfil.fecha_evaluacion = date.today()
        perfil.respuestas = str(respuestas)
    else:
        db.add(PerfilRiesgo(
            tipo=tipo,
            fecha_evaluacion=date.today(),
            respuestas=str(respuestas),
            usuario_id=usuario_id
        ))

    db.commit()
    return {"tipo": tipo, "mensaje": f"Tu perfil es {tipo}"}

def obtener_representante(usuario_id: int, db: Session):
    representante = db.query(RepresentanteLegal).filter(
        RepresentanteLegal.usuario_id == usuario_id
    ).first()
    if not representante:
        raise HTTPException(status_code=404, detail="Representante no encontrado")
    return representante