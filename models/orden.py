from sqlalchemy import Column, Integer, String, Double, Date, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base

class Orden(Base):
    __tablename__ = "ordenes"

    id= Column(Integer, primary_key=True, index=True)
    tipo= Column(String(10), nullable=False)
    cantidad= Column(Integer, nullable=False)
    precio_unitario= Column(Double, nullable=False)
    fecha= Column(Date, nullable=False)
    hora= Column(String(8), nullable=False)
    usuario_id= Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    instrumento_id= Column(Integer, ForeignKey("instrumentos.id"), nullable=False)

    usuario= relationship("Usuario")
    instrumento= relationship("Instrumento")