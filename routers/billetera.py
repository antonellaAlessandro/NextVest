from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from core.database import obtener_db
from core.security import obtener_usuario_actual
from models.usuario import Usuario
from models.billetera import Billetera

router = APIRouter()

class CargaSaldo(BaseModel):
    monto: float

@router.get("/")
def ver_saldo(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    billetera = db.query(Billetera).filter(Billetera.usuario_id == usuario.id).first()
    return {"saldo_disponible": billetera.saldo_disponible}

@router.post("/cargar")
def cargar_saldo(
    datos: CargaSaldo,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    if datos.monto <= 0:
        raise HTTPException(status_code=400, detail="El monto debe ser positivo")
    billetera = db.query(Billetera).filter(Billetera.usuario_id == usuario.id).first()
    billetera.saldo_disponible += datos.monto
    db.commit()
    return {"saldo_disponible": billetera.saldo_disponible}