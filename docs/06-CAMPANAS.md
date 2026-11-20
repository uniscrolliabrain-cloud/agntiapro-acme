# Campañas secuenciales de construcción

Todas las campañas en rama `feat/acme-<id>-<slug>`, reporte `docs/reports/<id>.md`, tests y evidencia. No merge ni deploy sin aprobación.

| ID | Campaña | Dependencia | Gate |
| --- | --- | --- | --- |
| ACME-00 | Auditoría de `agente` main/ramas y tres demos; identificar tenant canónico, API y contratos | Ninguna | Inventario verificable |
| ACME-01 | Auditoría de observabilidad y enlace a campañas OBS de `agente` | 00 | Traza vertical |
| ACME-02 | Chat real de demo en `agente`, sin script de respuestas | 01 | LLM y herramientas verificadas |
| ACME-03 | Contratos y SDK de ingesta, identidad y origen sintético | 00 | Test de compatibilidad |
| ACME-04 | Reloj dual, calendarios, DST, scheduler y modo replay | 01,03 | Semana virtual reproducible |
| ACME-05 | Personas y datos iniciales coherentes de agencia digital | 03 | Bootstrap idempotente |
| ACME-06 | Generador causal de escenarios de ventas, email y propuestas | 04,05 | Caso de negocio completo |
| ACME-07 | Adaptadores de Gmail/Calendar/Drive y sandbox | 06 | Entrada/salida segura |
| ACME-08 | CRM: Airtable/HubSpot o emuladores | 06 | Sincronización y dedup |
| ACME-09 | Notion, Slack y Discord | 06 | Eventos bidireccionales |
| ACME-10 | Buffer, Apify y Make | 06 | Cuotas y webhooks |
| ACME-11 | Panel de control de escenarios, avance de tiempo y replay | 04,06 | Pausar/avanzar/inspeccionar |
| ACME-12 | Suite E2E, resiliencia, coste y reporte de dogfooding | 07-11 | Aceptación transversal |

## Primera vertical
Contacto ficticio → email entrante → normalización y auth → evento → LAIA con LLM real → SOP de Marcos → aprobación → envío simulado → auditoría, memoria y Grafana.

## Cada reporte
SHA y rama; rutas modificadas; contratos afectados; comandos ejecutados; tests y resultados reales; trazas de ejemplo; riesgos; bloqueos por cuentas/secrets; decisión de merge; siguiente campaña.
