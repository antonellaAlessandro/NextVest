from sqlalchemy import Column, Integer, Double, ForeignKey
from core.database import Base

class Billetera(Base):
    __tablename__ = "billeteras"

    id= Column(Integer, primary_key=True, index=True)
    saldo_disponible= Column(Double, default=0.0)
    usuario_id= Column(Integer, ForeignKey("usuarios.id"), unique=True, nullable=False)