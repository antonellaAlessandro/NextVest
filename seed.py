from core.database import SessionLocal, Base, engine
from models.instrumento import Instrumento
from models.usuario import Usuario
from models.perfil_riesgo import PerfilRiesgo
from datetime import date

Base.metadata.create_all(bind=engine)
db = SessionLocal()

instrumentos = [
    dict(nombre="Fondo Money Market AR", ticker="FCI_MM", tipo="FCI",
         descripcion="Fondo de inversión en pesos de muy bajo riesgo.", perfil_minimo="conservador", precio_actual=1.05),
    dict(nombre="Bono Soberano 2027", ticker="TX27", tipo="Bono",
         descripcion="Bono del Tesoro Nacional en pesos ajustado por CER.", perfil_minimo="moderado", precio_actual=98.50),
    dict(nombre="Cedear Apple", ticker="AAPL", tipo="Cedear",
         descripcion="Certificado de depósito argentino que representa acciones de Apple.", perfil_minimo="moderado", precio_actual=12400.0),
    dict(nombre="Acción YPF", ticker="YPFD", tipo="Accion",
         descripcion="Acción de YPF S.A. en el mercado MERVAL.", perfil_minimo="moderado", precio_actual=28750.0),
]

for datos in instrumentos:
    existe = db.query(Instrumento).filter(Instrumento.ticker == datos["ticker"]).first()
    if not existe:
        db.add(Instrumento(**datos, activo=True))
        print(f"Instrumento creado: {datos['nombre']}")
    else:
        print(f"Ya existe: {datos['nombre']}")

db.commit()
db.close()
print("Seed completado")

usuarios = db.query(Usuario).all()
for usuario in usuarios:
    perfil_existente = db.query(PerfilRiesgo).filter(PerfilRiesgo.usuario_id == usuario.id).first()
    if not perfil_existente:
        db.add(PerfilRiesgo(
            tipo="moderado",
            fecha_evaluacion=date.today(),
            respuestas="{}",
            usuario_id=usuario.id
        ))
        print(f"Perfil de riesgo creado para: {usuario.nombre}")