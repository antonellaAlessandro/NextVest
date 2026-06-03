from pydantic import BaseModel
from typing import List

class PosicionOut(BaseModel):
    instrumento_id: int
    nombre: str
    ticker: str
    unidades: int
    precio_prom_compra: float
    precio_actual: float
    variacion_pct: float
    valor_actual: float

    class Config:
        from_attributes = True

class PortafolioOut(BaseModel):
    valor_total: float
    ganancia_perdida: float
    ganancia_pct: float
    posiciones: List[PosicionOut]