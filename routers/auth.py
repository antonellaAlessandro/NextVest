from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import obtener_db
from schemas.usuario import RegistroIn, LoginIn, TokenOut
from services import auth_service

router = APIRouter()

@router.post("/registro")
def registro(datos: RegistroIn, db: Session = Depends(obtener_db)):
    return auth_service.registrar_usuario(datos, db)

@router.post("/login", response_model=TokenOut)
def login(datos: LoginIn, db: Session = Depends(obtener_db)):
    return auth_service.iniciar_sesion(datos, db)

@router.get("/autorizar/{token_uuid}")
def autorizar(token_uuid: str, accion: str, db: Session = Depends(obtener_db)):
    return auth_service.autorizar_cuenta(token_uuid, accion, db)

@router.post("/reenviar-token")
def reenviar(email: str, db: Session = Depends(obtener_db)):
    return auth_service.reenviar_token(email, db)