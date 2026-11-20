/** Skeleton worker: JobRepository must guarantee atomic leases and idempotency. */
export class DeliveryWorker{
 constructor({jobs,providers,policy,audit,workerId='acme-worker'}){Object.assign(this,{jobs,providers,policy,audit,workerId});}
 async tick(){
  const job=await this.jobs.lease(this.workerId,Date.now());if(!job)return null;
  const decision=this.policy.decide(job);
  if(!decision.allow){await this.jobs.fail(job.idempotencyKey,decision.reason);return {status:'blocked',reason:decision.reason};}
  try{
   const receipt=await this.providers.get(job.provider).execute(job);
   await this.jobs.complete(job.idempotencyKey,receipt);
   await this.audit.record({type:'acme.job.delivered',jobId:job.idempotencyKey,receipt,at:new Date().toISOString()});
   return {status:'delivered',receipt};
  }catch(error){
   await this.jobs.fail(job.idempotencyKey,String(error));
   return {status:'failed',error:String(error)};
  }
 }
}
