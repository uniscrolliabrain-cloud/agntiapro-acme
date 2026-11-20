import {ProviderPort} from '../core/ports.mjs';
/** Airtable REST skeleton. Requires a dedicated test PAT, base and table. */
export class AirtableAdapter extends ProviderPort{
 constructor({token,baseId,tableId,fetchImpl=fetch}){super();Object.assign(this,{token,baseId,tableId,fetchImpl});}
 async capabilities(){return {createRecord:true,readBack:true,updateRecord:false,webhook:false};}
 #url(suffix=''){return 'https://api.airtable.com/v0/'+encodeURIComponent(this.baseId)+'/'+encodeURIComponent(this.tableId)+suffix;}
 async #request(url,options={}){if(!this.token||!this.baseId||!this.tableId)throw new Error('Airtable credentials/base/table not configured');const r=await this.fetchImpl(url,{...options,headers:{authorization:'Bearer '+this.token,'content-type':'application/json',...options.headers}});if(!r.ok)throw new Error('Airtable HTTP '+r.status);return r.json();}
 async execute(job){if(job.operation!=='createRecord')throw new Error('unsupported Airtable operation');const record=await this.#request(this.#url(),{method:'POST',body:JSON.stringify({records:[{fields:job.payload}]})});const first=record.records?.[0];if(!first?.id)throw new Error('Airtable response missing id');return {provider:'airtable',providerRecordId:first.id,correlationId:job.correlationId,idempotencyKey:job.idempotencyKey};}
 async readBack(receipt){return this.#request(this.#url('/'+encodeURIComponent(receipt.providerRecordId)));}
}
