# Fichas de reutilización: archivos inspeccionados

Cada SHA corresponde al **blob GitHub** del archivo leído en `agente/main`, no al commit de la rama. Imports representativos, no inventario transitivo completo.

| Ruta | Blob SHA | Acoplamiento observado | Decisión ACME |
| --- | --- | --- | --- |
| `package.json` | `8e490918c150a34d071b24d4080506d04ab8bd22` | pnpm 11.19.0, Node >=22.6, CopilotKit, AG-UI, Zod, TS | Alinear versiones solo donde haga falta |
| `pnpm-workspace.yaml` | `017f689b7502a6d903f55b6ea43ee4954c0f4528` | apps/*, packages/*, workspaces/* | No copiar workspace completo |
| `apps/server/src/engine/sop-executor.ts` | `1ab7a390ac0866021b62e0a8632e684ebb4ab377` | AgentService, TaskContext, kernel, EventBus, model-chain, BusinessGraph | Consumir SOP por API |
| `apps/server/src/engine/worker.ts` | `d7918a272c6f3e81b6b075e209b98d172088b5f9` | Store, TenantScopedStore, leads, EventBus, DLQ, metrics, tenant scope | No copiar, diseñar worker ACME específico |
| `apps/server/src/engine/sop-triggers.ts` | `cf4f7be470b4064571668026813aa1e2c76332e9` | TenantScopedStore, LeadsService, GoogleMapsClient, AppError | Solo extraer parser tras tests |
| `apps/server/src/engine/events/index.ts` | `f3aebba346f86458160da2023c4fcd0c3c57072a` | Bus, schemas, sinks y types | Consumir contrato público |
| `apps/server/src/engine/events/exporters/otel.ts` | `3a15ae6a0ff3649a56992a5775918a15ced3b78c` | Solo `interface OtelExporter {}` | STUB: no copiar |
| `apps/server/src/engine/conversation.ts` | `182efc387b9e20d5346fe30d93e6bb3326b2566f` | AG-UI, CopilotKit, RxJS, kernel, model-chain, AgentService | API remota, no copiar |
| `apps/server/src/agent.ts` | `503e0c7e2babf631b3a3601a43fdcd4a3048b959` | makeRuntime, auth, ConversationAgent, CopilotRuntime | API /api/copilotkit con auth |
| `apps/server/src/tenant-scope.ts` | `0879be0aa7f178a027e5684f4aedf2226bde4e9d` | AsyncLocalStorage tenantId/actorId | Respetar auth/tenant de agente |
| `apps/server/src/worker-entry.ts` | `b00014e29e675f5045018e0c0fdb0fcda4c0a552` | createApp, createStore, DATABASE_URL, recovery | No copiar bootstrap |
| `apps/server/src/index.ts` | `5d23618a433989779b7081c0ade3687e34a3ec5b` | RLS, bootstrap kernel, bus, process roles | No copiar |
| `apps/server/src/engine/model-chain.ts` | `602b7ba758e95be25ac73cc3d78b7342fadae099` | Config, TenantConfig, RxJS, AG-UI, circuit breaker | No copiar |
| `packages/domain/src/sop.ts` | `5b21c8e6767d33f1d5f2782b3514bc12b5806344` | Zod schema, enum cerrado | Candidato a paquete público |

## Protocolo por cada archivo del clon
1. Ruta, rama, commit y blob SHA.
2. Imports estáticos/dinámicos, dependencias transitivas, globals, env, side effects.
3. Contrato, consumidores, tests y datos mutados.
4. Tenancy, permisos, clocks, transacciones, lifecycle, fallos.
5. Decisión `API | paquete | copia selectiva | ACME-only | no reutilizar`.
6. Prueba real de compilación y de comportamiento antes de extracción.

## Scaffolding implementado en ACME
`src/clock.mjs`: reloj de negocio manual/pausado/realtime; no toca reloj de seguridad.
`src/manifest.mjs`: validación estricta de escenario, eventos y tiempos UTC.
`src/provider.mjs`: MockProvider, sin credenciales ni API externa.
`src/store.mjs`: recibos JSON locales, **no** durables multi-proceso.
`src/engine.mjs`: libera eventos vencidos, registra recibos y bloquea Airtable real.
`src/cli.mjs`: ejecuta demostración local.
`scenarios/lead-airtable.json`: lead ficticio.
`tests/engine.test.mjs`: reloj, deduplicación y bloqueo de proveedor real.

## Riesgo abierto del scaffold
La escritura del proveedor y el recibo no son transacción distribuida: un crash entre ambas puede duplicar un efecto externo. Antes de permitir Airtable real se requiere outbox durable, idempotencia de proveedor o reconciliación y prueba de crash. Tampoco hay todavía MCP, LLM, scheduler automático ni conector `agente`. La fecha UTC del escenario no representa automáticamente las 09:12 locales en Madrid.
