# Campañas del middleware ACME (extensión del programa base)

Dependencias: ACME-00 inventario de `agente`, ACME-01 gate de observabilidad, ACME-03 contratos. Trabajar en ramas individuales; reporte por campaña y comunicación en chat; sin merge/deploy automático.

| ID | Objetivo | Tests / criterio de salida |
| --- | --- | --- |
| MW-00 | Auditar APIs y conectores reales de `agente`; comprobar planes SaaS | Matriz rutas, auth, eventos, webhook/poll, límites y vacíos |
| MW-01 | Contratos tipados, validadores y fixtures versionados | Schema tests, versionado, provenance y tenancy |
| MW-02 | BusinessClock + manifest + motor de liberación | DST, fines de semana, pausas, replay determinista |
| MW-03 | Cola durable y workers | Reintentos, idempotencia, crash recovery, DLQ |
| MW-04 | Servidor MCP con tools de lectura y control | AuthN/AuthZ, scopes, deny-by-default, tests adversariales |
| MW-05 | Agente operador supervisado | Propone misión, requiere aprobación, no ejecuta fuera de política |
| MW-06 | Airtable outbound ACME | Crear/leer/actualizar registro ficticio en sandbox |
| MW-07 | Airtable inbound `agente` y reconciliación | ACME → Airtable → conector `agente`; no bypass |
| MW-08 | Camino inverso `agente` → Airtable → ACME | Actualización visible y comprobada por lectura independiente |
| MW-09 | HubSpot / Notion / Slack / Discord | Cada uno con capacidades reales verificadas y contrato |
| MW-10 | Google / Buffer / Make / Apify | Cuotas, webhooks, sandbox, costes y políticas |
| MW-11 | Suite de escenarios diarios y semanales | Semilla fija, calendario, reconciliación, fallos inducidos |
| MW-12 | Grafana, dashboards y handoff operativo | Trazas correlacionadas, alarmas y reportes reproducibles |

## Primer slice vertical obligatorio
Un lead ficticio se libera a las 09:12; worker ACME lo escribe en Airtable; el conector de `agente` lo descubre por su propia vía; LAIA lo puede consultar; AgntiaPro cambia su estado; ACME verifica en Airtable. Todo queda auditable.

## Formato de reporte
Rama, SHA, rutas, contrato, dependencias, proveedor y plan, secretos requeridos (nombres, nunca valores), pruebas ejecutadas, evidencia, cuotas, costes, incidencias, gate y siguientes pasos.
