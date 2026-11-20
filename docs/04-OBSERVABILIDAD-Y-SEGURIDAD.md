# Observabilidad previa a simulación masiva

## Gate OBS-0
Antes de habilitar carga sintética, instrumentar en `agente` una transacción completa: API/webhook → autenticación/tenant → normalización → Event Bus → scheduler/SOP → worker → memoria/LLM → resultado. Debe poder seguirse por correlationId/traceId.

## Stack preferente
OpenTelemetry SDK y Collector con OTLP; Grafana Cloud Free para iniciar (trazas, métricas, logs según límites vigentes). El Event Bus y almacenamiento de auditoría siguen siendo fuente de verdad de hechos; Grafana es telemetría, no registro de negocio.

## Señales
- HTTP: errores, latencia, tasa.
- Chat: tiempo hasta primer token, duración, fallos, consumo y coste estimado.
- SOP: pasos, reintentos, duración, errores, aprobaciones, DLQ.
- Integraciones: cuota, rate limits, webhooks, fallos, deduplicación.
- Simulador: eventos previstos/emitidos/aceptados/ejecutados, desfase temporal, escenarios fallidos.

## Correlación
Propagar trace context W3C y referencias `tenantId`, `scenarioId`, `runId`, `correlationId`, `taskId`, `sopRunId` en spans/logs cuando proceda. Evitar identificadores de alta cardinalidad como etiquetas de métricas.

## Seguridad
No enviar prompts completos, cuerpos de correo, tokens OAuth ni datos privados a logs generales. Redactar payloads. Credenciales por entorno y tenant. Aislamiento fail-closed. Deny-by-default para email saliente, publicaciones, pagos y webhooks externos. Probar escenarios adversariales: replay duplicado, tenant cruzado, proveedor caído, límite de cuota y clock skew.

## Gate de salida
Desde un evento sintético se puede abrir una traza completa, ver estado real, identificar fallo, latencia y coste, y reconstruir el resultado empresarial.
