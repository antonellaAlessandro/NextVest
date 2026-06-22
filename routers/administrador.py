from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from core.database import obtener_db
from core.security import obtener_admin_actual
from schemas.orden import InstrumentoOut, InstrumentoCreate
from services import admin_service
from pydantic import BaseModel

router = APIRouter()

class AdminLogin(BaseModel):
    email: str
    contrasenia: str

@router.post("/login")
def login_admin(datos: AdminLogin, db: Session = Depends(obtener_db)):
    return admin_service.iniciar_sesion_admin(datos.email, datos.contrasenia, db)

@router.get("/usuarios")
def listar_usuarios(
    admin=Depends(obtener_admin_actual),
    db: Session = Depends(obtener_db)
):
    return admin_service.listar_usuarios(db)

@router.patch("/usuarios/{usuario_id}/estado")
def cambiar_estado(
    usuario_id: int,
    estado: str,
    admin=Depends(obtener_admin_actual),
    db: Session = Depends(obtener_db)
):
    return admin_service.cambiar_estado_usuario(usuario_id, estado, db)

@router.get("/instrumentos", response_model=List[InstrumentoOut])
def listar_instrumentos(
    admin=Depends(obtener_admin_actual),
    db: Session = Depends(obtener_db)
):
    return admin_service.listar_instrumentos(db)

@router.post("/instrumentos", response_model=InstrumentoOut)
def crear_instrumento(
    datos: InstrumentoCreate,
    admin=Depends(obtener_admin_actual),
    db: Session = Depends(obtener_db)
):
    return admin_service.crear_instrumento(datos, db)

@router.patch("/instrumentos/{instrumento_id}/estado")
def toggle_instrumento(
    instrumento_id: int,
    activo: bool,
    admin=Depends(obtener_admin_actual),
    db: Session = Depends(obtener_db)
):
    return admin_service.toggle_instrumento(instrumento_id, activo, db)

@router.get("/configuracion")
def obtener_configuracion(
    admin=Depends(obtener_admin_actual),
    db: Session = Depends(obtener_db)
):
    return admin_service.obtener_configuracion(db)
@router.get("/usuarios/{usuario_id}")
def detalle_usuario(
    usuario_id: int,
    admin=Depends(obtener_admin_actual),
    db: Session = Depends(obtener_db)
):
    return admin_service.obtener_detalle_usuario(usuario_id, db)