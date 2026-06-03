from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from core.database import Base

class TokenAutorizacion(Base):
    __tablename__ = "tokens_autorizacion"

    id= Column(Integer, primary_key=True, index=True)
    uuid= Column(String(36), unique=True, nullable=False)
    vencimiento= Column(DateTime, nullable=False)
    utilizado= Column(Boolean, default=False)
    usuario_id= Column(Integer, ForeignKey("usuarios.id"), nullable=False)