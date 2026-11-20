# AgntiaPro ACME — laboratorio de empresa sintética

> Estado: diseño y documentación inicial. No hay implementación operativa ni integraciones activadas.
> Fecha: 2026-11-20.

## Propósito

Este repositorio es el **productor de datos y escenarios sintéticos** de la empresa demo AgntiaPro ACME. El producto y runtime viven en `uniscrolliabrain-cloud/agente`. **No es otro tenant ni otro runtime.**

El propietario unificará en `agente` las tres vías demo existentes (`demo:interfaz`, ACME sembrado en backend y la experiencia demo actual) en un único tenant operativo. Este repositorio NO ejecutará esa unificación ni asumirá que ya se ha hecho. El identificador real de tenant, sus credenciales y la política de autenticación se descubrirán y confirmarán al integrar.

## Principios innegociables

1. Los datos sintéticos entran por **los mismos contratos y rutas de ingesta** que los datos reales, con adaptadores de proveedor/sandbox cuando corresponda. No escribir directamente en tablas de negocio salvo bootstrap controlado.
2. AgntiaPro es autoridad de tenant, permisos, políticas, SOPs, memoria, auditoría y estado de ejecución.
3. El generador produce eventos, identidades y narrativas coherentes, no resultados falsamente marcados como ejecutados.
4. Separar `synthetic`, `sandbox` y `real` en toda entidad y evento; nunca mezclar tenants.
5. Efectos externos en modo deny-by-default: sin envíos a clientes reales, pagos, publicaciones ni operaciones destructivas sin autorización explícita.
6. Reproducibilidad: `scenarioId`, `seed`, `runId`, `correlationId`, versiones de contrato y resultados esperados.
7. Tiempo UTC en auditoría, zona IANA por tenant y reloj virtual inyectable solo en el dominio de simulación; no acelerar expiración de tokens, seguridad ni leases reales.
8. Primero observabilidad de extremo a extremo, luego chat real, reloj y carga sintética.

## Documentación

- [Arquitectura y límites](docs/01-ARQUITECTURA.md)
- [Contrato de ingesta y datos](docs/02-CONTRATOS-INGESTA.md)
- [Tiempo y empresa viva](docs/03-TIEMPO-Y-ESCENARIOS.md)
- [Observabilidad y seguridad](docs/04-OBSERVABILIDAD-Y-SEGURIDAD.md)
- [Catálogo de integraciones](docs/05-INTEGRACIONES.md)
- [Campañas secuenciales](docs/06-CAMPANAS.md)
- [Handoff para agente de código](docs/07-HANDOFF.md)

## Política de trabajo

Cada campaña se ejecutará en rama propia, con pruebas y reporte en `docs/reports/<campaña>.md`. No fusionar ni desplegar automáticamente. No afirmar resultados de tests que no se hayan ejecutado. La documentación del repo `agente` puede ser legacy: prevalecen código, ramas y tests medidos.

## Primer escenario vertical

Un contacto ficticio solicita presupuesto por correo; entra por el adaptador de ingesta, el runtime real registra el evento, LAIA lo explica mediante chat LLM real, Marcos ejecuta un SOP autorizado, el owner aprueba, y se registra el resultado con traza completa. Ningún correo sale a destinatarios reales.
