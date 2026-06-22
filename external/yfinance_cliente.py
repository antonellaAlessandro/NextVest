import yfinance as yf

def obtener_precio_actual(ticker: str) -> float:
    """
    Consulta el precio actual de un ticker en Yahoo Finance.
    Devuelve el último precio de cierre disponible.
    Si falla, devuelve None para que el caller decida qué hacer.
    """
    try:
        accion = yf.Ticker(ticker)
        historial = accion.history(period="1d")
        if historial.empty:
            return None
        return round(float(historial["Close"].iloc[-1]), 2)
    except Exception as e:
        print(f"[yfinance] Error al obtener precio de {ticker}: {e}")
        return None