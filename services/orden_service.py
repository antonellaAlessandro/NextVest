from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException

from models.orden import Orden
from models.instrumento import Instrumento
from models.portafolio import Portafolio, Posicion
from models.billetera import Billetera
from models.perfil_riesgo import PerfilRiesgo
from schemas.orden import OrdenIn

PERFIL_NIVEL = {"conservador": 1, "moderado": 2}

def _verificar_perfil(usuario_id: int, instrumento: Instrumento, db: Session):
    perfil = db.query(PerfilRiesgo).filter(PerfilRiesgo.usuario_id == usuario_id).first()
    if not perfil:
        raise HTTPException(status_code=403, detail="Debés completar el perfil de riesgo primero")
    if PERFIL_NIVEL.get(instrumento.perfil_minimo, 99) > PERFIL_NIVEL.get(perfil.tipo, 0):
        raise HTTPException(status_code=403, detail="Este instrumento no está disponible para tu perfil")

def ejecutar_orden(datos: OrdenIn, usuario_id: int, db: Session):
    instrumento = db.query(Instrumento).filter(Instrumento.id == datos.instrumento_id).first()
    if not instrumento or not instrumento.activo:
        raise HTTPException(status_code=404, detail="Instrumento no disponible")

    _verificar_perfil(usuario_id, instrumento, db)

    billetera = db.query(Billetera).filter(Billetera.usuario_id == usuario_id).first()
    portafolio = db.query(Portafolio).filter(Portafolio.usuario_id == usuario_id).first()
    monto_total = instrumento.precio_actual * datos.cantidad

    if datos.tipo == "compra":
        if billetera.saldo_disponible < monto_total:
            raise HTTPException(status_code=400, detail="Saldo insuficiente")
        billetera.saldo_disponible -= monto_total
        _actualizar_posicion_compra(portafolio.id, datos.instrumento_id, datos.cantidad, instrumento.precio_actual, db)

    elif datos.tipo == "venta":
        posicion = db.query(Posicion).filter(
            Posicion.portafolio_id == portafolio.id,
            Posicion.instrumento_id == datos.instrumento_id
        ).first()
        if not posicion or posicion.unidades < datos.cantidad:
            raise HTTPException(status_code=400, detail="No tenés suficientes unidades para vender")
        billetera.saldo_disponible += monto_total
        _actualizar_posicion_venta(posicion, datos.cantidad, db)
    else:
        raise HTTPException(status_code=400, detail="Tipo de orden inválido")

    ahora = datetime.now()
    orden = Orden(
        tipo=datos.tipo,
        cantidad=datos.cantidad,
        precio_unitario=instrumento.precio_actual,
        fecha=ahora.date(),
        hora=ahora.strftime("%H:%M:%S"),
        usuario_id=usuario_id,
        instrumento_id=datos.instrumento_id
    )
    db.add(orden)
    db.commit()
    db.refresh(orden)
    return orden

def _actualizar_posicion_compra(portafolio_id, instrumento_id, cantidad, precio, db):
    posicion = db.query(Posicion).filter(
        Posicion.portafolio_id == portafolio_id,
        Posicion.instrumento_id == instrumento_id
    ).first()
    if posicion:
        total_anterior = posicion.unidades * posicion.precio_prom_compra
        posicion.unidades += cantidad
        posicion.precio_prom_compra = (total_anterior + cantidad * precio) / posicion.unidades
    else:
        db.add(Posicion(
            unidades=cantidad,
            precio_prom_compra=precio,
            portafolio_id=portafolio_id,
            instrumento_id=instrumento_id
        ))

def _actualizar_posicion_venta(posicion, cantidad, db):
    posicion.unidades -= cantidad
    if posicion.unidades == 0:
        db.delete(posicion)