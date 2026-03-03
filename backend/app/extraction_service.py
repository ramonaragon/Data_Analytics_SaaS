import json

class ExtractionService:
    def __init__(self, ai_client=None):
        self.ai_client = ai_client
        self.system_prompt = """
        Eres un experto en extracción de datos financieros de facturas para un sistema SaaS B2B de Data Analytics.
        Tu objetivo es transformar el texto de una factura en un objeto JSON tabular limpio y consistente.
        
        Campos requeridos:
        1. fecha (Formato: YYYY-MM-DD)
        2. proveedor (Nombre legal de la empresa)
        3. concepto_resumen (Breve descripción del gasto)
        4. importe_total (Número flotante neto)
        5. moneda (Código ISO 4217, ej: EUR, USD)
        6. numero_factura (Si existe)
        
        Reglas:
        - Si el texto es confuso, marca 'status' como 'requires_review'.
        - Normaliza los nombres de los proveedores (ej: 'Amazon EU S.a.r.l' -> 'Amazon').
        - Ignora el IVA si puedes extraer el total bruto.
        """

    async def extract_from_text(self, text: str):
        """
        Simulates the call to a local/private LLM (Mistral/Zephyr)
        using the Prompt Maestro.
        """
        # In a real scenario, this would call: 
        # response = await self.ai_client.chat(prompt=self.system_prompt + text)
        
        # Simulation of a successful extraction for demo purposes
        return {
            "fecha": "2026-03-01",
            "proveedor": "Google Cloud",
            "concepto_resumen": "Servicios de Infraestructura",
            "importe_total": 145.20,
            "moneda": "EUR",
            "numero_factura": "INV-2026-001",
            "status": "processed"
        }

extraction_service = ExtractionService()
