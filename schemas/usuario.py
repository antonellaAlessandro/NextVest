from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class RepresentanteIn(BaseModel):
    nombre: str
    apellido: str
    dni: int
    email: EmailStr

class RegistroIn(BaseModel):
    nombre: str
    apellido: str
    dni: int
    fecha_nacimiento: date
    email: EmailStr
    contrasenia: str
    representante: RepresentanteIn

class UsuarioOut(BaseModel):
    id: int
    nombre: str
    apellido: str
    email: str
    estado_cuenta: str

    class Config:
        from_attributes = True

class LoginIn(BaseModel):
    email: EmailStr
    contrasenia: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    rol: str

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    dni: Optional[int] = None