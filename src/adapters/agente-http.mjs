import {AgentePort} from '../core/ports.mjs';
/** Endpoints are deliberately configurable: discover actual agente routes first. */
export class AgenteHttpAdapter extends AgentePort{
 constructor({baseUrl,token,verifyPath=null,actionPath=null,fetchImpl=fetch}){super();Object.assign(this,{baseUrl,token,verifyPath,actionPath,fetchImpl});}
 async #post(path,payload){if(!path)throw new Error('agente endpoint not mapped');const response=await this.fetchImpl(new URL(path,this.baseUrl),{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+this.token},body:JSON.stringify(payload)});if(!response.ok)throw new Error('agente HTTP '+response.status);return response.json();}
 async verifyIngestion(receipt){return this.#post(this.verifyPath,{receipt});}
 async requestAction(action){return this.#post(this.actionPath,{action});}
}
