from sqlalchemy import Column, Integer, String, Boolean, Double, Enum, Text
from core.database import Base

class Instrumento(Base):
    __tablename__ = "instrumentos"

    id= Column(Integer, primary_key=True, index=True)
    nombre= Column(String(45), nullable=False)
    ticker= Column(String(45), nullable=False)
    tipo= Column(String(45), nullable=False)
    descripcion= Column(Text)
    perfil_minimo= Column(
        Enum("conservador", "moderado", name="perfil_enum"),
        nullable=False
    )
    activo= Column(Boolean, default=True)
    precio_actual= Column(Double, default=0.0)