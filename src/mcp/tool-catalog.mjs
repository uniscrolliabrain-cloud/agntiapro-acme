/** MCP tool definitions, transport and protocol bindings to be wired later. */
export const TOOLS=[
 {name:'scenario_list',description:'List available scenario manifests',inputSchema:{type:'object',properties:{},additionalProperties:false}},
 {name:'scenario_schedule',description:'Schedule an approved scenario',inputSchema:{type:'object',properties:{scenarioId:{type:'string'},approvalId:{type:'string'}},required:['scenarioId','approvalId']}},
 {name:'clock_inspect',description:'Inspect virtual business time',inputSchema:{type:'object',properties:{}}},
 {name:'job_inspect',description:'Inspect job and receipts',inputSchema:{type:'object',properties:{jobId:{type:'string'}},required:['jobId']}},
 {name:'provider_capabilities',description:'List provider capabilities',inputSchema:{type:'object',properties:{provider:{type:'string'}},required:['provider']}},
 {name:'ingestion_verify',description:'Verify provider to agente ingestion',inputSchema:{type:'object',properties:{receiptId:{type:'string'}},required:['receiptId']}}
];
export function createToolDispatcher({scenarios,clock,jobs,providers,reconciler,auth}){
 return async function dispatch(name,args,principal){
  if(!await auth.authorize(principal,name,args))throw new Error('MCP authorization denied');
  switch(name){
   case 'scenario_list':return scenarios.list();
   case 'clock_inspect':return {at:clock.now().toISOString(),mode:clock.mode};
   case 'job_inspect':return jobs.get(args.jobId);
   case 'provider_capabilities':return providers.get(args.provider).capabilities();
   case 'ingestion_verify':return reconciler.verify(await jobs.getReceipt(args.receiptId));
   case 'scenario_schedule':throw new Error('approval workflow not wired');
   default:throw new Error('unknown tool');
  }
 };
}
