from sqlalchemy import Column, Integer, Double, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base

class Portafolio(Base):
    __tablename__ = "portafolios"

    id= Column(Integer, primary_key=True, index=True)
    valor_total= Column(Double, default=0.0)
    usuario_id= Column(Integer, ForeignKey("usuarios.id"), unique=True, nullable=False)

    posiciones= relationship("Posicion", back_populates="portafolio")

class Posicion(Base):
    __tablename__ = "posiciones"

    id= Column(Integer, primary_key=True, index=True)
    unidades= Column(Integer, nullable=False)
    precio_prom_compra= Column(Double, nullable=False)
    portafolio_id= Column(Integer, ForeignKey("portafolios.id"), nullable=False)
    instrumento_id= Column(Integer, ForeignKey("instrumentos.id"), nullable=False)

    portafolio= relationship("Portafolio", back_populates="posiciones")
    instrumento= relationship("Instrumento")