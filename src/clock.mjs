/** Business time only; never use for credentials, leases or security. */
export class BusinessClock {
  constructor({mode='realtime',startAt=new Date().toISOString()}={}) {
    if (!['realtime','paused','manual'].includes(mode)) throw new Error('invalid clock mode');
    this.mode=mode;this.instant=new Date(startAt);
    if(Number.isNaN(this.instant.getTime()))throw new Error('invalid startAt');
  }
  now(){return this.mode==='realtime'?new Date():new Date(this.instant);}
  advance(ms){
    if(this.mode==='realtime')throw new Error('cannot advance realtime clock');
    if(!Number.isSafeInteger(ms)||ms<0)throw new Error('invalid advance');
    this.instant=new Date(this.instant.getTime()+ms);return this.now();
  }
}
