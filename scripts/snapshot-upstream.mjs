import {execFileSync} from 'node:child_process';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const repo=resolve(process.argv[2]||'upstream/agente');
const git=(...args)=>execFileSync('git',['-C',repo,...args],{encoding:'utf8'}).trim();
const sha=git('rev-parse','HEAD');
const files=git('ls-files','-z').split('\0').filter(Boolean);
const lines=['# Snapshot documental del árbol upstream','',`SHA: \`${sha}\``,`Archivos rastreados: ${files.length}`,'','```',...files,'```','','## Imports detectados heurísticamente',''];
for(const file of files.filter(f=>/\.(ts|tsx|mts|js|mjs)$/.test(f))){
  const src=await readFile(join(repo,file),'utf8').catch(()=>null);
  if(src===null)continue;
  const imports=[...src.matchAll(/(?:from\s*|import\s*\(|require\s*\()\s*['"]([^'"]+)['"]/g)].map(x=>x[1]);
  if(imports.length)lines.push(`- \`${file}\`: ${imports.map(x=>'\`'+x+'\`').join(', ')}`);
}
await mkdir('docs/upstream/generated',{recursive:true});
await writeFile('docs/upstream/generated/REPO-SNAPSHOT.md',lines.join('\n')+'\n');
console.log(JSON.stringify({sha,trackedFiles:files.length,output:'docs/upstream/generated/REPO-SNAPSHOT.md'}));
