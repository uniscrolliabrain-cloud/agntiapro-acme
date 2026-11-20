# Catálogo de integraciones para ACME

Los planes gratuitos, APIs y cuotas cambian: **verificar documentación oficial antes de conectar o automatizar**. No se afirma que exista ninguna cuenta ni token ya configurado.

| Plataforma | Uso sintético | Estrategia |
| --- | --- | --- |
| Gmail / Google Workspace | Email, Calendar, Drive | Cuenta de prueba y OAuth; simulación local para volumen |
| Airtable | CRM tabular | API real de prueba + adaptador simulado |
| HubSpot | Leads y pipeline CRM | Cuenta de desarrollador/sandbox según disponibilidad |
| Notion | Documentos, wiki, proyectos | API y workspace de prueba |
| Slack | Mensajes de equipo | App/bot de prueba |
| Discord | Comunidad y bot | Servidor privado + bot |
| Buffer | Ideas y programación social | API y canal de prueba; sin publicar públicamente por defecto |
| Apify | Captación de datos públicos | Actors con presupuesto y cumplimiento de términos |
| Make | Automatizaciones interoperables | Webhooks de prueba; no usar como autoridad del runtime |
| Baserow / NocoDB | Tablas de alto volumen | Alternativa autohospedada para pruebas intensivas |
| Trello / ClickUp | Tareas | Integración posterior |
| Cal.com | Reservas | Integración posterior |
| Brevo | Email marketing | Integración posterior |

## Reglas
1. Primer test por proveedor: lectura, escritura segura, errores, cuotas, idempotencia y webhook si existe.
2. Registrar `providerAccountId` vinculado al tenant; nunca reutilizar credenciales entre tenants.
3. Respetar términos, privacidad, robots, límites y consentimiento en scraping/comunicaciones.
4. Mantener emulador para miles de eventos y usar SaaS reales solo para pruebas de contrato e integración.
5. Ninguna integración se considera operativa hasta que haya pruebas reproducibles.
