# Scaffold ampliado: responsabilidades por archivo

Estado: estructura de código para completar por agentes posteriores. No se garantiza compilación integrada ni funcionamiento real. El scaffold anterior de `src/engine.mjs` es una demo aislada, **no** la cola durable definitiva.

## Árbol
```
src/
  core/
    contracts.mjs       Envelope de eventos, ids y procedencia
    ports.mjs           Puertos de repositorios, proveedores y AgntiaPro
    policy.mjs          Política fail-closed
    registry.mjs        Registro de proveedores
    reconciler.mjs      Comprobación de ida y vuelta
  runtime/
    scheduler.mjs       Escenario -> job liberado
    worker.mjs          Job -> API externa -> recibo
    operator.mjs        Agente supervisor, propuestas y aprobación
    observability.mjs   Punto de conexión a OpenTelemetry
    composition.mjs     Inyección de dependencias
  adapters/
    agente-http.mjs     Verificación y acciones contra agente
    airtable.mjs        Escritura y lectura por REST
    provider-stubs.mjs  Catálogo de proveedores pendientes
  mcp/
    tool-catalog.mjs    Contratos de herramientas MCP
    server.mjs          Punto de conexión al SDK MCP
```

## Decisión sobre el código upstream
No copiar literalmente `worker.ts`, `sop-executor.ts`, `conversation.ts` ni `index.ts` porque arrastran Store, AgentService, kernel, RLS y bootstrap. Conservar el nivel de separación profesional (contratos, políticas, adaptadores, composición) y extraer código upstream por módulos después de mapear imports transitivos. El objetivo no es simplificar el producto sino **evitar ejecutar su segundo kernel**.

## Bloqueos explícitos
- Falta implementar JobRepository durable con leases, outbox, DLQ y transacciones.
- Falta implementar ScenarioRepository y AuditPort persistentes.
- Falta auth y transport MCP; los tools de escritura requieren aprobación verificable.
- Falta adaptar endpoints reales de `agente` y verificar contrato.
- Airtable REST es preliminar: faltan retries, rate limits, reconciliación de timeout, schema mapping y deduplicación externa.
- Falta OTel SDK real, traces y correlación.
- Falta business calendar IANA y liberación automática del scheduler.
- No utilizar `allowSyntheticWrites=true` hasta completar seguridad y pruebas.

## Orden de modificación
1. Upstream mirror completo + fichas de imports y runtime.
2. Ports tipados y contratos compartidos con agente.
3. Persistencia durable, leases y transactional outbox.
4. MCP real y operador con aprobaciones.
5. Airtable bidireccional y verificador.
6. Reloj de negocio + workers + escenarios de semana.
7. Grafana/OTel y gates de resiliencia.
