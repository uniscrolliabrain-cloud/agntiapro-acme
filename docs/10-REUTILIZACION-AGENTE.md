# Reutilización del código de agente: mini-runtime ACME

Estado: decisión de arquitectura, pendiente de auditoría detallada y pruebas.

## Decisión
ACME será un proceso/servicio pequeño especializado en simulación. Reutilizará contratos, utilidades y ejecutores de `uniscrolliabrain-cloud/agente`, evitando duplicar el producto y sus workspaces.

## Evidencia de código inspeccionada
- `apps/server/src/engine/sop-executor.ts` importa directamente rutas relativas de `packages/domain`, EventBus, worker, model-chain, business graph, kernel y agentes. **No es portable como copia aislada**: primero hay que mapear dependencias y extraer una superficie pública.
- `apps/server/src/engine/sop-triggers.ts` contiene parser cron con `daily:HH:MM` y `weekly:DOW:HH:MM` **en UTC**, además de dependencias tenant/store/leads. No resuelve por sí solo calendario empresarial con zona IANA y reloj virtual.

## Estrategia de reutilización por prioridad
1. **Consumir por API** capacidades del runtime principal cuando ACME solo necesita solicitar una operación o verificar resultado.
2. **Extraer paquetes reutilizables** (contratos, clock abstractions, cola, telemetría, adaptadores) a paquetes versionados o workspace compartido. Evitar imports relativos cruzando repos.
3. **Copiar selectivamente con procedencia** únicamente utilidades pequeñas y desacopladas cuando no compense extraer paquete; registrar upstream SHA, licencia, tests y plan de sincronización.
4. **Implementar mínimo específico ACME**: scenario engine, releases temporales, agente operador y MCP controlado, reconciliador externo.

## Propuesta de piezas
- `@agntia/contracts`: contratos versionados de eventos, actores, SOP y procedencia.
- `@agntia/observability`: inicialización OTel, propagación, redacción de secretos.
- `@agntia/clock`: wall/business clock con pruebas DST.
- `@agntia/connector-kit`: interfaces API, rate-limit, idempotencia, receipts.
Estos nombres son propuestas; comprobar si existen paquetes equivalentes antes de crearlos.

## Qué no copiar
ConversationAgent completo, kernel cognitivo, base de datos multi-tenant, 34 workspaces, SOP executor entero y sistemas de seguridad complejos: reutilizar vía API o extraer núcleo solo si hay necesidad comprobada.

## Campaña previa obligatoria: REUSE-00
Inventariar paquetes reales y dependencias transitivas, ramas activas y licencias. Probar import/build de un paquete mínimo. Producir matriz: componente, ruta, contrato, dependencias, tests, decisión (API/paquete/copia/ACME), riesgos. No iniciar duplicación masiva sin esa evidencia.

## Reglas de mantenimiento
Cambios en contrato deben pasar tests de compatibilidad cruzada; usar releases/tags y lockfiles. ACME conserva credenciales y permisos de prueba propios. Ningún merge/deploy sin autorización.
