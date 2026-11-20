# Contratos de ingesta y procedencia

## Objetivo
Inyectar datos sintéticos por el mismo borde de entrada que un proveedor real, sin saltarse normalización, validación, autorización ni Event Bus.

## Envelope propuesto (no implementado)
```json
{
  "schemaVersion": 1,
  "tenantId": "<resuelto por credencial/servidor>",
  "scenarioId": "lead-web-001",
  "runId": "run-001",
  "correlationId": "corr-001",
  "idempotencyKey": "acme:run-001:mail-001",
  "source": {"kind": "synthetic", "provider": "gmail", "adapter": "gmail-sandbox"},
  "occurredAt": "2026-11-23T09:12:00Z",
  "simulatedAt": "2026-11-23T09:12:00Z",
  "payload": {"type": "email.received", "data": {}}
}
```
Este es un borrador: **ajustar al contrato existente en `agente`**. No aceptar `tenantId` arbitrario del emisor como autoridad; derivarlo de credenciales y vinculación del tenant.

## Estrategias
1. Seed inicial limitado: identidad, organización y catálogo de personas ficticias, por API de provisión o script idempotente autorizado.
2. Adaptador sintético: emite eventos equivalentes al normalizador del proveedor.
3. Sandbox SaaS: crea registros en proveedor de prueba y deja que el conector real los recupere o reciba webhook.
4. Replay: misma semilla y secuencia; ids estables, deduplicación, snapshots y resultados esperados.

## Garantías
- PII ficticia; dominios reservados como `example.com`; no usar direcciones reales.
- Origen y estado separados: planned, emitted, accepted, processing, succeeded, failed, skipped.
- Evidencia y referencia de salida por cada operación.
- Backpressure, cuotas, reintentos con jitter, DLQ, circuit breaker.
- Los escenarios de prueba verifican efectos observables, no solo HTTP 200.
