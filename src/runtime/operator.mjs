/** The LLM proposes; policy and runtime dispose. */
export class OperatorAgent{
 constructor({planner,policy,scheduler,audit}){Object.assign(this,{planner,policy,scheduler,audit});}
 async propose(instruction,context){const proposal=await this.planner.plan({instruction,context});await this.audit.record({type:'acme.operator.proposed',proposal,at:new Date().toISOString()});return {status:'awaiting_approval',proposal};}
 async scheduleApproved({proposal,approval,tenantBinding,runId}){
  if(!approval?.approved||!approval?.actorId)throw new Error('human approval required');
  if(!proposal?.scenarioId)throw new Error('invalid proposal');
  await this.audit.record({type:'acme.operator.approved',actorId:approval.actorId,scenarioId:proposal.scenarioId,at:new Date().toISOString()});
  return this.scheduler.tick({tenantBinding,runId});
 }
}
