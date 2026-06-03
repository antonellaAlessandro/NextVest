from pydantic import BaseModel
from typing import Optional

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