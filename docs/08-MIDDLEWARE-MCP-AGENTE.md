# Middleware ACME: agente operador, MCP y conectores bidireccionales

Estado: especificación, NO implementado.

## Objetivo
El repositorio ACME opera una empresa ficticia desde documentación de escenarios y reloj empresarial. Un agente operador supervisado por el propietario puede preparar, programar, ejecutar y verificar misiones. El runtime determinista es autoridad para acciones, permisos, reintentos y estado; el LLM no ejecuta directamente escrituras arbitrarias.

## Separación de responsabilidades
- Agente operador: interpreta instrucciones del propietario, redacta escenarios, propone planes, inspecciona resultados, solicita aprobación.
- MCP server: herramientas con contratos tipados, identidad, autorización y auditoría; transporte local/HTTP según despliegue. No exponer credenciales en respuestas.
- Scheduler: libera eventos de escenarios a hora prevista según BusinessClock, con zona horaria IANA y calendario semanal.
- Workers: procesan jobs durables con leases, idempotencia, reintentos, límites, DLQ y recuperación.
- Adapters outbound: escriben datos en SaaS reales o sandboxes (Airtable, HubSpot, Notion, Slack, Discord, Buffer, Make, Apify, Google).
- Verifier inbound: consulta proveedor para confirmar escritura, y verifica **por separado** que el conector del repo `agente` importó el dato.
- `agente`: dueño exclusivo de sus conectores de ingesta, tenant, ConversationAgent, SOPs, memoria, eventos y vistas.

## Ejemplo Airtable: ida y vuelta real
1. Documento de escenario versionado define lead ficticio, dependencias y liberación lunes 09:12.
2. Scheduler ACME libera job y worker envía createRecord mediante credencial de prueba.
3. Persistir providerRecordId, requestId, externalRevision y prueba de recepción.
4. Conector Airtable de `agente` ingiere **independientemente** por webhook o polling (según capacidad real), normaliza, autoriza tenant y almacena.
5. Verificador ACME consulta API de `agente` con identidad de prueba separada y comprueba correlación, payload y estado.
6. Una acción autorizada desde `agente` actualiza el lead en Airtable.
7. ACME lee Airtable y confirma el cambio, sin modificar la base de datos de `agente`.
8. Comparar resultados esperados/reales y emitir informe con trazas.

Prohibido shortcut: escritura simultánea del mismo registro desde ACME a Airtable y a `agente`, porque no prueba el conector.

## Herramientas MCP candidatas
`scenario.list`, `scenario.validate`, `scenario.schedule`, `scenario.pause`, `clock.inspect`, `clock.advance`, `job.inspect`, `job.retry`, `provider.capabilities`, `provider.test_connection`, `provider.write_fixture`, `provider.read_back`, `ingestion.verify`, `trace.lookup`, `report.generate`.
Las operaciones de escritura requieren scopes explícitos, límites por proveedor, confirmación humana cuando corresponda y registros de auditoría.

## Contratos mínimos
ScenarioManifest: id, version, seed, tenantBinding, timezone, clockMode, dependencies, actors, schedule, expectedEffects, safetyPolicy.
ScheduledEvent: eventId, scenarioId, releaseAt, targetProvider, operation, fixtureRef, idempotencyKey, correlationId.
DeliveryReceipt: provider, providerRecordId, requestId, acceptedAt, retryCount, evidence.
IngestionReceipt: source, connectorRunId, importedEntityId, observedAt, traceId, reconciliationStatus.
Todos son contratos propuestos, sujetos a la auditoría de esquemas reales.

## Requisitos de seguridad
Cuentas de prueba y datos 100% ficticios; dominios example.com; secretos en gestor externo; no exposición de tokens por MCP; deny-by-default para emails, publicaciones, pagos, scraping y operaciones externas; cuotas y presupuestos. Para webhook externo, validar firma y replay. Identificar claramente actor, tenant, escenario y origen.

## Observabilidad
Spans `scenario.release`, `provider.write`, `provider.confirm`, `agente.ingest`, `agente.sop`, `provider.readback`, `scenario.reconcile`. Propagar W3C trace context cuando se pueda; si SaaS no conserva headers, correlacionar por IDs persistidos. Grafana es telemetría, no fuente de verdad.

## No confundir
MCP es la interfaz de herramientas para el agente operador, no reemplaza las APIs externas, el scheduler ni los workers. No se garantiza que un SaaS permita webhooks o API gratuita: comprobar proveedor y plan antes de programar.
