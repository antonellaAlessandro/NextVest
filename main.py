from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.database import Base, engine
from routers import auth, mercado, portafolio, ordenes, billetera, administrador

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="NextVest API",
    description="Broker digital educativo para menores",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,       prefix="/auth",       tags=["Auth"])
app.include_router(mercado.router,    prefix="/mercado",    tags=["Mercado"])
app.include_router(portafolio.router, prefix="/portafolio", tags=["Portafolio"])
app.include_router(ordenes.router,    prefix="/ordenes",    tags=["Ordenes"])
app.include_router(billetera.router,  prefix="/billetera",  tags=["Billetera"])
app.include_router(administrador.router,      prefix="/admin",      tags=["Admin"])

@app.get("/")
def health_check():
    return {"status": "ok", "app": "NextVest"}