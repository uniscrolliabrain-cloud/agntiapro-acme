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
