from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import settings

class ConexionBD:
    """
    Singleton que garantiza una única instancia del engine
    y del sessionmaker en toda la aplicación.
    """
    _instancia = None

    def __new__(cls):
        if cls._instancia is None:
            cls._instancia = super().__new__(cls)
            cls._instancia._inicializar()
        return cls._instancia

    def _inicializar(self):
        self.engine = create_engine(settings.DATABASE_URL)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

# Única instancia compartida en toda la app
conexion_bd = ConexionBD()

engine = conexion_bd.engine
SessionLocal = conexion_bd.SessionLocal
Base = declarative_base()

def obtener_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()