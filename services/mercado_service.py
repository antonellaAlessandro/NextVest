from sqlalchemy.orm import Session
from models.instrumento import Instrumento
from models.perfil_riesgo import PerfilRiesgo
from typing import List, Optional

PERFIL_NIVEL = {"conservador": 1, "moderado": 2}

def obtener_instrumentos(usuario_id: int, tipo: Optional[str], db: Session) -> List[Instrumento]:
    perfil = db.query(PerfilRiesgo).filter(PerfilRiesgo.usuario_id == usuario_id).first()
    nivel_usuario = PERFIL_NIVEL.get(perfil.tipo if perfil else "conservador", 1)

    query = db.query(Instrumento).filter(Instrumento.activo == True)
    if tipo:
        query = query.filter(Instrumento.tipo == tipo)

    instrumentos = query.all()
    return [i for i in instrumentos if PERFIL_NIVEL.get(i.perfil_minimo, 99) <= nivel_usuario]

def obtener_instrumento(instrumento_id: int, db: Session) -> Instrumento:
    from fastapi import HTTPException
    instrumento = db.query(Instrumento).filter(Instrumento.id == instrumento_id).first()
    if not instrumento:
        raise HTTPException(status_code=404, detail="Instrumento no encontrado")
    return instrumento