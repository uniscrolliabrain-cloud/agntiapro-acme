/** Fail closed; no write is authorized by default. */
export class Policy{
 constructor({allowSyntheticWrites=false,allowedProviders=[],allowedOperations=['createRecord'],tenantBinding=null}={}){this.allowSyntheticWrites=allowSyntheticWrites;this.allowedProviders=new Set(allowedProviders);this.allowedOperations=new Set(allowedOperations);this.tenantBinding=tenantBinding;}
 decide(job){
  if(!this.allowSyntheticWrites)return {allow:false,reason:'synthetic writes disabled'};
  if(!this.tenantBinding||job.tenantBinding!==this.tenantBinding)return {allow:false,reason:'tenant binding mismatch'};
  if(!this.allowedProviders.has(job.provider))return {allow:false,reason:'provider not allowlisted'};
  if(!this.allowedOperations.has(job.operation))return {allow:false,reason:'operation not allowlisted'};
  if(job.source==='real')return {allow:false,reason:'real source blocked'};
  return {allow:true};
 }
}
