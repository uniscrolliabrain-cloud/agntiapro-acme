export function validateScenario(value){
  if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('scenario object required');
  if(!/^[a-z0-9][a-z0-9-]{1,79}$/.test(value.id||''))throw new Error('invalid scenario id');
  if(!Number.isInteger(value.version)||value.version<1)throw new Error('invalid version');
  if(!Array.isArray(value.events)||!value.events.length)throw new Error('events required');
  const ids=new Set();
  for(const e of value.events){
    if(!e||typeof e.id!=='string'||!e.id||ids.has(e.id))throw new Error('duplicate or invalid event id');
    ids.add(e.id);
    if(!Number.isFinite(Date.parse(e.releaseAt))||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/.test(e.releaseAt))throw new Error('releaseAt must be UTC ISO');
    if(!['mock','airtable'].includes(e.provider))throw new Error('unsupported provider');
    if(e.operation!=='createRecord')throw new Error('unsupported operation');
    if(!e.payload||typeof e.payload!=='object'||Array.isArray(e.payload))throw new Error('payload object required');
  }
  return structuredClone(value);
}
