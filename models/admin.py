from sqlalchemy import Column, Integer, String
from core.database import Base

class Administrador(Base):
    __tablename__ = "administradores"

    id= Column(Integer, primary_key=True, index=True)
    email= Column(String(45), unique=True, nullable=False)
    contrasenia= Column(String(255), nullable=False)