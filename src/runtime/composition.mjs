/*
 * ACME_AGENT_HANDOFF_TEMP — REMOVE AFTER IMPLEMENTATION
 * TASK: Inspect agente bootstrap and DI lifecycle. Bind real repositories, configuration, identity and secret providers; avoid copying global kernel or RLS initialization. Delete this instruction block after integration wiring is validated.
 * BEFORE REMOVAL: record changed paths, upstream SHA, tests/evidence and residual risks
 * in docs/reports/. Remove only this temporary instruction, not functional comments.
 */
import {ProviderRegistry} from '../core/registry.mjs';
import {Policy} from '../core/policy.mjs';
import {AirtableAdapter} from '../adapters/airtable.mjs';
import {UnsupportedProviderAdapter,PLANNED_PROVIDERS} from '../adapters/provider-stubs.mjs';
import {AgenteHttpAdapter} from '../adapters/agente-http.mjs';
import {ScenarioScheduler} from './scheduler.mjs';
import {DeliveryWorker} from './worker.mjs';
/** Composition root; requires durable ports and credentials injected by host. */
export function composeAcme({clock,scenarios,jobs,audit,config}){
 const providers=new ProviderRegistry();
 providers.register('airtable',new AirtableAdapter({token:config.airtableToken,baseId:config.airtableBaseId,tableId:config.airtableTableId}));
 for(const name of PLANNED_PROVIDERS)providers.register(name,new UnsupportedProviderAdapter(name));
 const policy=new Policy({allowSyntheticWrites:config.allowSyntheticWrites,allowedProviders:config.allowedProviders||[],tenantBinding:config.tenantBinding});
 const agente=new AgenteHttpAdapter({baseUrl:config.agenteBaseUrl,token:config.agenteToken,verifyPath:config.agenteVerifyPath,actionPath:config.agenteActionPath});
 return {providers,policy,agente,scheduler:new ScenarioScheduler({clock,scenarios,jobs,audit}),worker:new DeliveryWorker({jobs,providers,policy,audit})};
}
