from core.config import settings

def enviar_autorizacion_parental(email_representante: str, nombre_menor: str, token_uuid: str):
    link_aprobar = f"http://localhost:5173/autorizar/{token_uuid}?accion=aprobar"
    link_rechazar = f"http://localhost:5173/autorizar/{token_uuid}?accion=rechazar"
    print(f"[DEV] Email de autorización para: {email_representante}")
    print(f"[DEV] Menor: {nombre_menor}")
    print(f"[DEV] Aprobar: {link_aprobar}")
    print(f"[DEV] Rechazar: {link_rechazar}")

def enviar_cuenta_activada(email_menor: str, nombre_menor: str):
    print(f"[DEV] Email a menor {email_menor}: Tu cuenta fue activada, {nombre_menor}")

def enviar_cuenta_rechazada(email_menor: str, nombre_menor: str):
    print(f"[DEV] Email a menor {email_menor}: Tu cuenta fue rechazada, {nombre_menor}")

def enviar_resumen_semanal(email_representante: str, nombre_menor: str, resumen: dict):
    if not settings.RESUMEN_SEMANAL_ACTIVO:
        return
    print(f"[DEV] Resumen semanal para {email_representante}")
    print(f"[DEV] Menor: {nombre_menor}")
    print(f"[DEV] Resumen: {resumen}")