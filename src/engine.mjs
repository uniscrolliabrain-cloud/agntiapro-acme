import {validateScenario} from './manifest.mjs';
/** Single-process demonstrator only, NOT a production durable queue. */
export async function releaseDue({scenario,clock,provider,store}){
  const s=validateScenario(scenario);const now=clock.now().getTime();const out=[];
  for(const event of s.events){
    if(Date.parse(event.releaseAt)>now)continue;
    if(event.provider!=='mock'){out.push({eventId:event.id,status:'blocked',reason:'real provider not configured'});continue;}
    const key=`${s.id}:v${s.version}:${event.id}`;
    const existing=(await store.all())[key];
    if(existing){out.push({eventId:event.id,status:'already-recorded',receipt:existing});continue;}
    const receipt=await provider.createRecord({key,payload:event.payload});
    const saved=await store.putIfAbsent(key,{...receipt,eventId:event.id,scenarioId:s.id,recordedAt:new Date().toISOString()});
    out.push({eventId:event.id,status:saved.created?'recorded':'already-recorded',receipt:saved.receipt});
  }
  return out;
}
