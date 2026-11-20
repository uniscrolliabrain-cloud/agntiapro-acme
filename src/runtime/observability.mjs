/** OTel bridge placeholder; no exporter connected. */
export function telemetry({service='agntiapro-acme',logger=console}={}){
 return {async span(name,attributes,fn){const start=performance.now();try{return await fn();}finally{logger.info(JSON.stringify({service,span:name,attributes,durationMs:performance.now()-start}));}},event(name,attributes={}){logger.info(JSON.stringify({service,event:name,attributes}));}};
}
