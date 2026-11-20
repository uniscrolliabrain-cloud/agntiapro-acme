/*
 * ACME_AGENT_HANDOFF_TEMP — REMOVE AFTER IMPLEMENTATION
 * TASK: Inspect concrete stores, connector interfaces, and lifecycle in agente. Replace placeholder ports with typed contracts; define errors, cancellation and transactional boundaries. Delete this instruction block after ports are wired and documented.
 * BEFORE REMOVAL: record changed paths, upstream SHA, tests/evidence and residual risks
 * in docs/reports/. Remove only this temporary instruction, not functional comments.
 */
/** Structural ports; no production adapters are assumed to exist. */
export class ScenarioRepository{async list(){throw new Error('not implemented');}async load(_id){throw new Error('not implemented');}}
export class JobRepository{async enqueue(_job){throw new Error('not implemented');}async lease(_owner,_now){throw new Error('not implemented');}async complete(_id,_receipt){throw new Error('not implemented');}async fail(_id,_error){throw new Error('not implemented');}}
export class ProviderPort{async capabilities(){throw new Error('not implemented');}async execute(_job){throw new Error('not implemented');}async readBack(_receipt){throw new Error('not implemented');}}
export class AgentePort{async verifyIngestion(_receipt){throw new Error('not implemented');}async requestAction(_action){throw new Error('not implemented');}}
export class AuditPort{async record(_event){throw new Error('not implemented');}}
