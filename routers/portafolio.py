from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import obtener_db
from core.security import obtener_usuario_actual
from models.usuario import Usuario
from models.portafolio import Portafolio, Posicion
from models.instrumento import Instrumento
from schemas.portafolio import PortafolioOut, PosicionOut
from services import usuario_service

router = APIRouter()

@router.get("/", response_model=PortafolioOut)
def ver_portafolio(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_db)
):
    portafolio = db.query(Portafolio).filter(Portafolio.usuario_id == usuario.id).first()
    posiciones_out = []
    valor_total = 0.0
    costo_total = 0.0

    for pos in portafolio.posiciones:
        inst = pos.instrumento
        valor_actual = inst.precio_actual * pos.unidades
        costo = pos.precio_prom_compra * pos.unidades
        variacion = ((inst.precio_actual - pos.precio_prom_compra) / pos.precio_prom_compra * 100) if pos.precio_prom_compra else 0
        valor_total += valor_actual
        costo_total += costo
        posiciones_out.append(PosicionOut(
            instrumento_id=inst.id,
            nombre=inst.nombre,
            ticker=inst.ticker,
            unidades=pos.unidades,
            precio_prom_compra=pos.precio_prom_compra,
            precio_actual=inst.precio_actual,
            variacion_pct=round(variacion, 2),
            valor_actual=round(valor_actual, 2)
        ))

    ganancia = valor_total - costo_total
    ganancia_pct = (ganancia / costo_total * 100) if costo_total else 0

    return PortafolioOut(
        valor_total=round(valor_total, 2),
        ganancia_perdida=round(ganancia, 2),
        ganancia_pct=round(ganancia_pct, 2),
        posiciones=posiciones_out
    )