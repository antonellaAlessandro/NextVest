from sqlalchemy import Column, Integer, String, Date, Enum
from core.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id= Column(Integer, primary_key=True, index=True)
    nombre= Column(String(45), nullable=False)
    apellido= Column(String(45), nullable=False)
    dni= Column(Integer, unique=True, nullable=False)
    fecha_nacimiento= Column(Date, nullable=False)
    email= Column(String(45), unique=True, nullable=False)
    contrasenia= Column(String(255), nullable=False)
    estado_cuenta= Column(
        Enum("pendiente", "activa", "suspendida", name="estado_cuenta_enum"),
        default="pendiente"
    )