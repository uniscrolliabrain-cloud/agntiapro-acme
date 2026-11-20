/*
 * ACME_AGENT_HANDOFF_TEMP — REMOVE AFTER IMPLEMENTATION
 * TASK: Align connector registry and lifecycle with agente; add capability negotiation, health and scoped credentials without leaking secrets. Delete this instruction block once provider wiring is complete.
 * BEFORE REMOVAL: record changed paths, upstream SHA, tests/evidence and residual risks
 * in docs/reports/. Remove only this temporary instruction, not functional comments.
 */
export class ProviderRegistry{
 #ports=new Map();
 register(name,port){if(this.#ports.has(name))throw new Error('duplicate provider: '+name);this.#ports.set(name,port);return this;}
 get(name){const port=this.#ports.get(name);if(!port)throw new Error('provider not registered: '+name);return port;}
 list(){return [...this.#ports.keys()];}
}
