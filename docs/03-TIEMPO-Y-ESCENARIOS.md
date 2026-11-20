# Reloj empresarial y escenarios longitudinales

## Dos relojes
- **Wall clock**: UTC real para logs, seguridad, tokens, leases, auditoría técnica y duraciones.
- **Business clock**: fecha/hora virtual inyectable para planificación, jornadas, eventos ficticios y reproducción.

Usar zonas IANA por tenant (ejemplo `Europe/Madrid`), con DST, festivos configurables, pausas y jornadas por rol. La zona del usuario no define automáticamente la zona de ACME.

## Modos
- `realtime`: actividad sintética acompasada con hora real.
- `accelerated`: simular un día/semana en minutos sin afectar seguridad.
- `paused`: congelar generación de escenarios.
- `replay`: ejecutar secuencia y semilla fijas.

## Modelo
Personas → empresas → relaciones → oportunidades → conversaciones → tareas → propuestas → aprobaciones → facturas → resultados. Cada transición tiene precondiciones y resultado esperado.

## Semana de ejemplo
Lunes 08:00 briefing; 09:12 lead por email; 09:30 clasificación; 11:00 propuesta.
Martes 10:00 revisión y aprobación.
Miércoles 09:00 respuesta del cliente.
Jueves 12:00 proyecto en ejecución.
Viernes 16:30 resumen semanal.
Sábado/domingo: sin trabajo ordinario salvo guardias explícitas.

## Distinción esencial
- Planificado ≠ emitido ≠ procesado ≠ ejecutado con éxito.
- Nunca mostrar en el Centro de Mando que se envió un correo si solo se preparó.
- El scheduler real ejecuta SOPs; el simulador no inventa resultados del runtime.

## Test de aceptación
Repetir un escenario con semilla fija y verificar idénticos eventos de entrada y estados finales bajo dependencias controladas; permitir variación de texto LLM y medirla separadamente.
