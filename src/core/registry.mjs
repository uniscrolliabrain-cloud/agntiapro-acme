export class ProviderRegistry{
 #ports=new Map();
 register(name,port){if(this.#ports.has(name))throw new Error('duplicate provider: '+name);this.#ports.set(name,port);return this;}
 get(name){const port=this.#ports.get(name);if(!port)throw new Error('provider not registered: '+name);return port;}
 list(){return [...this.#ports.keys()];}
}
