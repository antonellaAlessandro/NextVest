from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text
from core.database import Base

class PerfilRiesgo(Base):
    __tablename__ = "perfiles_riesgo"

    id= Column(Integer, primary_key=True, index=True)
    tipo= Column(String(45))
    fecha_evaluacion= Column(Date)
    respuestas= Column(Text)
    usuario_id= Column(Integer, ForeignKey("usuarios.id"), unique=True, nullable=False)