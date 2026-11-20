/** ACME local contracts. Replace with versioned imports from agente once audited. */
export const SOURCES=Object.freeze(['synthetic','sandbox','real']);
export const JOB_STATES=Object.freeze(['planned','queued','leased','delivered','verified','failed','dead_letter','blocked']);
export function assertNonEmpty(value,name){if(typeof value!=='string'||!value.trim())throw new TypeError(name+' required');return value;}
export function envelope({tenantBinding,scenarioId,runId,eventId,provider,operation,payload,releaseAt,source='synthetic'}){
  for(const [k,v] of Object.entries({tenantBinding,scenarioId,runId,eventId,provider,operation,releaseAt}))assertNonEmpty(v,k);
  if(!SOURCES.includes(source))throw new Error('invalid source');
  if(!Number.isFinite(Date.parse(releaseAt)))throw new Error('invalid releaseAt');
  return Object.freeze({schemaVersion:1,tenantBinding,scenarioId,runId,eventId,provider,operation,payload,releaseAt,source,idempotencyKey:[tenantBinding,scenarioId,runId,eventId].join(':'),correlationId:[scenarioId,runId,eventId].join(':')});
}
