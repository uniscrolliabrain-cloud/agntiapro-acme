/*
 * ACME_AGENT_HANDOFF_TEMP — REMOVE AFTER IMPLEMENTATION
 * TASK: Replace console placeholder with OTel SDK/OTLP; inspect agente EventBus exporter stub and OBS branch. Redact sensitive data, propagate trace IDs and avoid high-cardinality metric labels. Delete this instruction block when instrumentation works.
 * BEFORE REMOVAL: record changed paths, upstream SHA, tests/evidence and residual risks
 * in docs/reports/. Remove only this temporary instruction, not functional comments.
 */
/** OTel bridge placeholder; no exporter connected. */
export function telemetry({service='agntiapro-acme',logger=console}={}){
 return {async span(name,attributes,fn){const start=performance.now();try{return await fn();}finally{logger.info(JSON.stringify({service,span:name,attributes,durationMs:performance.now()-start}));}},event(name,attributes={}){logger.info(JSON.stringify({service,event:name,attributes}));}};
}
