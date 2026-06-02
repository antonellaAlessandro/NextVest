from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from core.config import settings
from core.database import get_db

contexto_pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
esquema_oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/login")

def hashear_contrasenia(contrasenia: str) -> str:
    return contexto_pwd.hash(contrasenia)

def verificar_contrasenia(plain: str, hasheada: str) -> bool:
    return contexto_pwd.verify(plain, hasheada)

def crear_token_acceso(datos: dict) -> str:
    payload = datos.copy()
    expiracion = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload.update({"exp": expiracion})
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def decodificar_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

def obtener_usuario_actual(token: str = Depends(esquema_oauth2), db: Session = Depends(get_db)):
    from models.usuario import Usuario
    payload = decodificar_token(token)
    usuario_id = payload.get("sub")
    if not usuario_id:
        raise HTTPException(status_code=401, detail="Token inválido")
    usuario = db.query(Usuario).filter(Usuario.id == int(usuario_id)).first()
    if not usuario:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    if usuario.estado_cuenta != "activa":
        raise HTTPException(status_code=403, detail="Cuenta no activa")
    return usuario

def obtener_admin_actual(token: str = Depends(esquema_oauth2), db: Session = Depends(get_db)):
    from models.admin import Administrador
    payload = decodificar_token(token)
    if payload.get("rol") != "admin":
        raise HTTPException(status_code=403, detail="Acceso solo para administradores")
    admin_id = payload.get("sub")
    admin = db.query(Administrador).filter(Administrador.id == int(admin_id)).first()
    if not admin:
        raise HTTPException(status_code=401, detail="Admin no encontrado")
    return admin