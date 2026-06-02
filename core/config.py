from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    TOKEN_PARENTAL_EXPIRE_HOURS: int = 48
    RESUMEN_SEMANAL_ACTIVO: bool = True
    EMAIL_FROM: str = "noreply@nextvest.com"
    SENDGRID_API_KEY: str = ""

    class Config:
        env_file = ".env"

settings = Settings()