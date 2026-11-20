import {ProviderPort} from '../core/ports.mjs';
export class UnsupportedProviderAdapter extends ProviderPort{
 constructor(name){super();this.name=name;}
 async capabilities(){return {name:this.name,configured:false,operations:[]};}
 async execute(){throw new Error(this.name+' adapter not implemented');}
 async readBack(){throw new Error(this.name+' readback not implemented');}
}
export const PLANNED_PROVIDERS=['hubspot','notion','slack','discord','google-gmail','google-calendar','google-drive','buffer','apify','make','baserow','n8n'];
