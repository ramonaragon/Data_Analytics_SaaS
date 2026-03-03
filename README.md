# Data Analytics Sénior - SaaS B2B

Plataforma SaaS de análisis de datos financieros automatizada mediante IA y OCR, diseñada para escalar desde scripts locales a una solución multi-empresa en la nube.

## 🚀 Arquitectura
- **Frontend**: Next.js 15 + Tailwind CSS + Recharts (Dashboard de elite).
- **Backend**: Node.js + Express (API multi-tenant con aislamiento de datos).
- **Base de Datos**: PostgreSQL (Esquema en `backend/schema.sql`).
- **IA/OCR**: Pipeline preparado para integración con modelos locales (Mistral/Zephyr) y OCR (PaddleOCR).

## 🛠️ Cómo Iniciar

### 1. Backend (API)
```bash
cd backend
npm install
npm start
```
*Corre en http://localhost:8000*

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
*Corre en http://localhost:3000*

## 💎 Características Implementadas (Prompt Maestro)
- [x] **Autenticación Multi-tenant**: Aislamiento total de datos por encabezados de Tenant.
- [x] **Subida de Facturas**: Drag & drop integrado con procesamiento en background.
- [x] **Extracción IA (Mock)**: Simulación de extracción de datos (Fecha, Proveedor, Importe).
- [x] **Analytics Sénior**: Dashboard dinámico con KPIs en tiempo real.
- [x] **Conector ERP**: Funcionalidad para sincronizar datos procesados con sistemas contables.
- [x] **Planes de Precios**: Lógica de límites para planes Basic y Pro.

## 🔒 Privacidad
El sistema está diseñado para usar modelos LLM **locales/privados**, garantizando que los datos financieros nunca salgan del entorno controlado del cliente.
