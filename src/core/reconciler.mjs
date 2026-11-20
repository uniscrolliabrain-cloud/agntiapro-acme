/*
 * ACME_AGENT_HANDOFF_TEMP — REMOVE AFTER IMPLEMENTATION
 * TASK: Use independent provider readback and agente ingestion evidence, not a synthetic success flag. Add correlation, revision comparison, retries and mismatch states. Delete this instruction block when end-to-end reconciliation is real.
 * BEFORE REMOVAL: record changed paths, upstream SHA, tests/evidence and residual risks
 * in docs/reports/. Remove only this temporary instruction, not functional comments.
 */
export class Reconciler{
 constructor({providers,agente,audit}){this.providers=providers;this.agente=agente;this.audit=audit;}
 async verify(receipt){
  const provider=await this.providers.get(receipt.provider).readBack(receipt);
  const ingestion=await this.agente.verifyIngestion(receipt);
  const result={correlationId:receipt.correlationId,provider,ingestion,consistent:Boolean(provider&&ingestion?.found)};
  await this.audit.record({type:'acme.reconciliation',result,at:new Date().toISOString()});
  return result;
 }
}
