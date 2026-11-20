# Reporte ACME-SCAFFOLD-00

Fecha: 2026-11-20. Rama: `feat/acme-scaffold-upstream-audit`. Base `main` del repo ACME.

## Auditoría
Lectura real de rutas clave de `agente/main`, árbol documental parcial y fichas por archivo en `docs/upstream`. Comparadas 3 ramas relevantes; **no auditoría exhaustiva de todas las ramas ni del árbol completo**.

## Código entregado
Scaffold Node ESM sin dependencias externas: clock, manifest, provider mock, recibos JSON, release engine, CLI y escenario. No se ha conectado a Airtable ni a `agente`, ni se ha instalado MCP.

## Pruebas ejecutadas localmente
`npm test`: 3/3 correctas (clock, liberación e idempotencia local, proveedor real bloqueado).
`npm run demo`: salida DRY_RUN_ONLY con lead ficticio registrado en mock.
No se ha ejecutado CI GitHub ni test E2E de integración; pruebas locales se realizaron en copia equivalente del scaffold antes de publicarlo.

## Riesgos
- JSON store solo para desarrollo single-process; sin garantías multiworker, sin transacción proveedor/recibo.
- Hora del escenario en UTC; falta business calendar IANA/DST.
- MCP, worker durable, LLM operador y OTel no implementados.
- El script de clon documental requiere git y un clon accesible en el entorno de ejecución del agente; no se ha ejecutado contra el repo completo aquí.
- No mover/copiar el kernel o SOP executor hasta verificar dependencias transitivas.

## Siguiente paso
Ejecutar snapshot completo en Codespace, generar fichas de dependencias y tests por archivo, completar auditoría de ramas; después diseñar port/adapters y outbox durable. No merge ni deploy sin aprobación.
