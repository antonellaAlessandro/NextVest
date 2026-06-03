from pydantic import BaseModel
from datetime import date

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