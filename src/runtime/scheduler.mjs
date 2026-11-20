/*
 * ACME_AGENT_HANDOFF_TEMP — REMOVE AFTER IMPLEMENTATION
 * TASK: Port scheduling semantics carefully from agente/sop-triggers.ts without importing its tenant/store coupling. Implement IANA timezone, business calendar, durable release markers and deterministic replay. Delete this instruction block after release behavior is implemented.
 * BEFORE REMOVAL: record changed paths, upstream SHA, tests/evidence and residual risks
 * in docs/reports/. Remove only this temporary instruction, not functional comments.
 */
import {envelope} from '../core/contracts.mjs';
/** Converts due scenario events to jobs; persistence delegated to JobRepository. */
export class ScenarioScheduler{
 constructor({clock,scenarios,jobs,audit}){Object.assign(this,{clock,scenarios,jobs,audit});}
 async tick({tenantBinding,runId}){
  const now=this.clock.now().getTime();const queued=[];
  for(const scenario of await this.scenarios.list()){
   for(const event of scenario.events||[]){
    if(Date.parse(event.releaseAt)>now)continue;
    const job=envelope({tenantBinding,scenarioId:scenario.id,runId,eventId:event.id,provider:event.provider,operation:event.operation,payload:event.payload,releaseAt:event.releaseAt});
    await this.jobs.enqueue(job);queued.push(job);
    await this.audit.record({type:'acme.job.queued',idempotencyKey:job.idempotencyKey,at:new Date().toISOString()});
   }
  }
  return queued;
 }
}
