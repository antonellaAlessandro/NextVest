from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import obtener_db
from core.security import obtener_usuario_actual
from models.usuario import Usuario
from schemas.usuario import UsuarioOut, UsuarioUpdate
from services import usuario_service
from pydantic import BaseModel

router = APIRouter()

class CambioContrasenia(BaseModel):
    contrasenia_actual: str
    contrasenia_nueva: str

class RespuestasPerfilRiesgo(BaseModel):
    respuestas: dict

@router.get("/me", response_model=UsuarioOut)
def obtener_perfil(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    return usuario

@router.patch("/me", response_model=UsuarioOut)
def actualizar_perfil(
    datos: UsuarioUpdate,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    return usuario_service.actualizar_usuario(usuario.id, datos, db)

@router.patch("/me/contrasenia")
def cambiar_contrasenia(
    datos: CambioContrasenia,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    return usuario_service.cambiar_contrasenia(usuario.id, datos.contrasenia_actual, datos.contrasenia_nueva, db)

@router.post("/me/perfil-riesgo")
def guardar_perfil_riesgo(
    datos: RespuestasPerfilRiesgo,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    return usuario_service.guardar_perfil_riesgo(usuario.id, datos.respuestas, db)

@router.get("/me/representante")
def obtener_representante(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    return usuario_service.obtener_representante(usuario.id, db)