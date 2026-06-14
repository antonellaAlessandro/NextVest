from pydantic import BaseModel
from datetime import date
from typing import Optional

class OrdenIn(BaseModel):
    instrumento_id: int
    tipo: str
    cantidad: int

class OrdenOut(BaseModel):
    id: int
    tipo: str
    cantidad: int
    precio_unitario: float
    fecha: date
    hora: str
    instrumento_id: int

    class Config:
        from_attributes = True

class InstrumentoOut(BaseModel):
    id: int
    nombre: str
    ticker: str
    tipo: str
    descripcion: Optional[str]
    perfil_minimo: str
    activo: bool
    precio_actual: float

    class Config:
        from_attributes = True

class InstrumentoCreate(BaseModel):
    nombre: str
    ticker: str
    tipo: str
    descripcion: Optional[str] = None
    perfil_minimo: str