/** Dry-run provider; real Airtable adapter intentionally not wired. */
export class MockProvider{
  constructor(){this.records=new Map();}
  async createRecord({key,payload}){
    if(!this.records.has(key))this.records.set(key,{id:`mock-${key}`,fields:structuredClone(payload)});
    return {provider:'mock',recordId:this.records.get(key).id,accepted:true};
  }
  async readRecord(id){return [...this.records.values()].find(r=>r.id===id)||null;}
}
