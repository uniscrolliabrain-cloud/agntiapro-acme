# Handoff para agente de código

## Objetivo inmediato
Este repositorio alimentará el **único** tenant demo de `agente` después de que el propietario unifique las tres vías demo. No crear otro runtime ni otro tenant por su cuenta.

## Primeras acciones
1. Clonar `uniscrolliabrain-cloud/agente` y este repo. Enumerar ramas remotas, HEAD y diferencias relevantes; revisar código y tests, no fiarse de documentación legacy.
2. Identificar `demo:interfaz`, seed ACME, auth/tenant actual y ruta de chat (incluido bypass de demo); elaborar tabla de unificación sin modificar aún el runtime.
3. Auditar OpenTelemetry, Grafana, Event Bus, scheduler, SOP triggers, ConversationAgent, memoria y rutas de ingesta.
4. Proponer contrato canónico de eventos y validación de procedencia. Compararlo con contratos existentes; reutilizar antes que inventar.
5. Medir baseline de tests con dependencias instaladas y versiones de Node/pnpm registradas.
6. Preparar plan de patchsets por campaña y ejecutar únicamente la campaña autorizada.

## Seguridad operativa
- Nunca imprimir secretos en reportes ni chats.
- Sin escritura en cuentas reales, envío de email, publicación social ni pagos sin autorización.
- Usar dominios y contactos ficticios; proteger cuotas de SaaS.
- No mezclar la hora simulada con expiraciones de seguridad.
- No fusionar ramas ni desplegar sin aprobación explícita.

## Entregable de cada campaña
`docs/reports/<ID>.md` con: fecha, SHA, ramas, paths, decisiones, diffs, pruebas, evidencias, pendientes y solicitud de aprobación. Reportar además en chat al terminar cada campaña.

## Pendientes del propietario
- Confirmar tenant ID real y secuencia de unificación.
- Aprobar cuentas/sandboxes y conectar credenciales en secret manager.
- Aprobar cualquier integración externa, merge o despliegue.
