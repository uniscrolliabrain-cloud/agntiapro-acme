import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
import {dirname} from 'node:path';
export class FileReceiptStore{
  constructor(path){this.path=path;this.queue=Promise.resolve();}
  async all(){try{return JSON.parse(await readFile(this.path,'utf8'));}catch(e){if(e.code==='ENOENT')return {};throw e;}}
  async putIfAbsent(key,receipt){
    const work=async()=>{
      const all=await this.all();
      if(Object.hasOwn(all,key))return {created:false,receipt:all[key]};
      all[key]=receipt;await mkdir(dirname(this.path),{recursive:true});
      const tmp=`${this.path}.${process.pid}.tmp`;
      await writeFile(tmp,JSON.stringify(all,null,2));await rename(tmp,this.path);
      return {created:true,receipt};
    };
    const result=this.queue.then(work);this.queue=result.then(()=>undefined,()=>undefined);return result;
  }
}
