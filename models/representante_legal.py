from sqlalchemy import Column, Integer, String, ForeignKey
from core.database import Base

class RepresentanteLegal(Base):
    __tablename__= "representantes_legales"

    id= Column(Integer, primary_key=True, index=True)
    nombre= Column(String(45), nullable=False)
    apellido= Column(String(45), nullable=False)
    dni= Column(Integer, nullable=False)
    email= Column(String(45), nullable=False)
    usuario_id= Column(Integer, ForeignKey("usuarios.id"), unique=True, nullable=False)