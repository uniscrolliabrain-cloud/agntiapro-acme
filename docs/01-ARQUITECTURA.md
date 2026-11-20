# Arquitectura y responsabilidades

## Repositorios
- `uniscrolliabrain-cloud/agente`: runtime de producción, UI, ConversationAgent, SOP executor, Event Bus, autorización, tenant, conectores y persistencia.
- `uniscrolliabrain-cloud/agntiapro-acme`: generador de personas, organizaciones, datos, narrativas, horarios, escenarios y orquestación de simulación. No implementa el runtime ni mantiene una BD de negocio alternativa.

## Situación actual y unificación
Hay antecedentes de demo de interfaz `demo:interfaz` con chat guionizado, seed ACME en backend y experiencia demo actual. El propietario unificará esas vías dentro de `agente`. Antes de escribir código: inventariar ramas, localizar tenant real y auth, resolver identificador canónico, revisar fixtures, migración de datos y aislamiento. No asumir que `agntiapro-acme` sea ya un tenant ID válido.

## Flujo objetivo
Scenario engine → generador de payload → adaptador de proveedor/sandbox → endpoint/normalizador canónico de `agente` → tenant/auth/policy → eventos y estado → scheduler/SOP → observabilidad → chat y workspaces.

## Límites
- Sin mutaciones directas de DB en operación normal.
- Sin APIs alternativas que eviten validaciones.
- Los contratos compartidos se publicarán con versionado o se importarán desde `agente`; evitar copiar tipos a mano.
- El simulador puede vivir en proceso independiente y desplegarse por separado; inicialmente solo documentamos.
- Prohibido introducir secretos en Git; configuración mediante secret manager y variables de entorno.
- Separar bootstrap inicial (fixtures deterministas) de actividad diaria (ingesta realista).

## Gates de integración
G0: inventario código/ramas y contrato canónico.
G1: trazas y logs de extremo a extremo.
G2: chat real y tenant autenticado.
G3: una ingesta sintética produce un hecho real auditable.
G4: escenario semanal reproducible.
G5: SaaS externos solo con permisos, cuotas y sandboxes.
