from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from core.database import obtener_db
from core.security import obtener_usuario_actual
from models.usuario import Usuario
from models.orden import Orden
from schemas.orden import OrdenIn, OrdenOut
from services import orden_service

router = APIRouter()

@router.post("/", response_model=OrdenOut)
def crear_orden(
    datos: OrdenIn,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    return orden_service.ejecutar_orden(datos, usuario.id, db)

@router.get("/", response_model=List[OrdenOut])
def historial_ordenes(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    return db.query(Orden).filter(
        Orden.usuario_id == usuario.id
    ).order_by(Orden.id.desc()).all()