import {execFileSync} from 'node:child_process';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
const repo=resolve(process.argv[2]||'upstream/agente');
const git=(...args)=>execFileSync('git',['-C',repo,...args],{encoding:'utf8'}).trim();
const sha=git('rev-parse','HEAD');
const files=git('ls-files','-z').split('\0').filter(Boolean);
const root='docs/upstream/generated';
const index=['# Snapshot documental del árbol upstream','',`SHA: \`${sha}\``,`Archivos rastreados: ${files.length}`,'','```',...files,'```','','## Fichas por archivo',''];
for(const file of files){
  const blob=git('rev-parse',`HEAD:${file}`);
  const source=await readFile(join(repo,file),'utf8').catch(()=>null);
  const isCode=/\.(ts|tsx|mts|js|mjs|py)$/.test(file);
  const imports=source&&isCode?[...source.matchAll(/(?:from\s*|import\s*\(|require\s*\()\s*['"]([^'"]+)['"]/g)].map(x=>x[1]):[];
  const risks=source&&isCode?[
    [/process\.env|os\.environ/, 'Lee variables de entorno'],
    [/AsyncLocalStorage|tenantScope|tenantId/, 'Revisar aislamiento de tenant'],
    [/setInterval|setTimeout|Date\.now|new Date\(/, 'Revisar reloj y ciclo de vida'],
    [/createStore|DATABASE_URL|\bdb\./, 'Revisar almacenamiento y transacciones'],
    [/fetch\(|axios|http\.request/, 'Revisar llamadas externas'],
  ].filter(([re])=>re.test(source)).map(([,note])=>note):[];
  const doc=`${root}/files/${file}.md`;
  const lines=[`# ${file}`,'',`- Commit: \`${sha}\``,`- Blob SHA: \`${blob}\``,`- Tipo: ${isCode?'código':'otro'}`,'','## Imports detectados (heurística, revisar manualmente)','',...(imports.length?imports.map(x=>`- \`${x}\``):['Sin imports detectados']),'','## Alertas para auditoría','',...(risks.length?risks.map(x=>`- ${x}`):['Sin alertas heurísticas; no implica ausencia de riesgos']),'','## Revisión manual pendiente','','- [ ] Contrato público y consumidores','- [ ] Imports dinámicos y dependencias transitivas','- [ ] Side effects, lifecycle y singleton','- [ ] Auth, permisos, tenancy y datos','- [ ] Tests existentes y compatibilidad','- [ ] Decisión API/paquete/copia/no reutilizar',''];
  await mkdir(dirname(doc),{recursive:true});await writeFile(doc,lines.join('\n'));
  index.push(`- \`${file}\` → \`${doc}\``);
}
await mkdir(root,{recursive:true});
await writeFile(`${root}/REPO-SNAPSHOT.md`,index.join('\n')+'\n');
console.log(JSON.stringify({sha,trackedFiles:files.length,generatedDossiers:files.length,output:`${root}/REPO-SNAPSHOT.md`}));
