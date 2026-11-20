# Espejo documental del árbol de agente

Fuente: `uniscrolliabrain-cloud/agente`, rama `main`, HEAD observado `3023637d72994460b1aa4742f558557ec0c69922` (20-11-2026). **Árbol parcial auditado**, no inventario exhaustivo. Worktrees sin push no son visibles.

```
agente/
├── package.json                         [leído]
├── pnpm-workspace.yaml                 [leído]
├── apps/
│   ├── server/src/
│   │   ├── index.ts                    [leído parcialmente]
│   │   ├── worker-entry.ts             [leído]
│   │   ├── agent.ts                    [leído]
│   │   ├── tenant-scope.ts             [leído]
│   │   └── engine/
│   │       ├── conversation.ts         [leído parcialmente]
│   │       ├── model-chain.ts          [leído parcialmente]
│   │       ├── worker.ts               [leído parcialmente]
│   │       ├── sop-executor.ts         [leído parcialmente]
│   │       ├── sop-triggers.ts         [leído parcialmente]
│   │       └── events/
│   │           ├── index.ts            [leído]
│   │           └── exporters/otel.ts   [stub confirmado]
│   └── web/src/
│       ├── api/chat.ts                 [auditoría previa]
│       └── demo/chat.ts                [auditoría previa]
├── packages/domain/src/sop.ts          [leído]
└── docs/                               [NO inventariado íntegramente]
```

## Ramas comparadas con main
- `feat/cognition-v2-runtime-C00-C15`: 0 ahead, 21 behind.
- `docs/observability-dogfooding-audit-20261117`: diverge, 5 ahead, 8 behind; 5 documentos OBS solo en rama.
- `wip/mobile-chat-sheet`: 2 ahead, 0 behind; afecta chat móvil y hooks.
No se ha comparado aún la totalidad de ramas.

## Clon real reproducible para documentación
```bash
git clone --filter=blob:none https://github.com/uniscrolliabrain-cloud/agente.git upstream/agente
git -C upstream/agente checkout 3023637d72994460b1aa4742f558557ec0c69922
node scripts/snapshot-upstream.mjs upstream/agente
```
El clon vive localmente en `upstream/agente` (gitignored); el script genera `docs/upstream/generated/REPO-SNAPSHOT.md` con árbol de todos los archivos rastreados y dependencias importadas. **Este archivo aún no ha sido generado desde un clon completo** porque el entorno de ejecución no tiene acceso de red a GitHub; se entrega el procedimiento para el agente con acceso.

## Riesgos demostrados
- `sop-executor.ts` depende de AgentService, EventBus, kernel, worker, model-chain y rutas relativas profundas: no copiar como módulo aislado.
- `worker.ts` usa Store, TenantScopedStore, DLQ, métricas, contexto tenant y reloj inyectable de lease; no acelerar leases con tiempo virtual.
- `sop-triggers.ts` soporta daily/weekly en UTC, no calendario laboral local.
- `events/exporters/otel.ts` es interfaz vacía (stub), no telemetría funcional.
- `tenant-scope.ts` utiliza AsyncLocalStorage; no sustituir por variable global.
- `agent.ts` construye ConversationAgent en CopilotRuntime; ACME debe consumir API y no clonarlo.
- `worker-entry.ts` requiere DATABASE_URL para worker separado.

Ver `FILE-MAP.md` para decisiones por archivo.
