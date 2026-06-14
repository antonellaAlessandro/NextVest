from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from core.database import obtener_db
from core.security import obtener_usuario_actual
from models.usuario import Usuario
from schemas.orden import InstrumentoOut
from services import mercado_service

router = APIRouter()

@router.get("/", response_model=List[InstrumentoOut])
def listar_instrumentos(
    tipo: Optional[str] = None,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    return mercado_service.obtener_instrumentos(usuario.id, tipo, db)

@router.get("/{instrumento_id}", response_model=InstrumentoOut)
def detalle_instrumento(
    instrumento_id: int,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    return mercado_service.obtener_instrumento(instrumento_id, db)