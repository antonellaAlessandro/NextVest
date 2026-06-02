# NextVest
Broker digital para menores de edad que permite operaciones con instrumentos financieros. Ideal para adentrarse en el mundo de las inversiones desde pequeño.

# Stack tecnológico
-Frontend: React
-Backend: FastAPI
-Base de datos: PostgreSQL

# Cómo correr el proyecto
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
# Variables de entorno
Copiar `.env.example` como `.env` y completar con tus datos.

# Estructura 
-core --> configuracion, bdd, seguridad
-models --> tablas de bdd
-schemas --> validacion de datos
-services --> logica de negocio
-routers --> endpoints http
-external --> APIs externas
-src --> frontend
 

