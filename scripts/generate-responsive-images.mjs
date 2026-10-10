import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
const output='public/assets/responsive';
await fs.mkdir(output,{recursive:true});
const files=[];
async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory()){if(e.name!=='blender')await walk(p);}else if(/\.(png|jpe?g)$/i.test(e.name))files.push(p);}}
await walk('assets');await walk('public/assets/cases');
const manifest={};let original=0,small=0,index=0;
async function worker(){while(index<files.length){const file=files[index++];const buffer=await fs.readFile(file);const meta=await sharp(buffer).metadata();const key='/'+file.replaceAll('\\','/').replace(/^public\//,'');const id=crypto.createHash('sha256').update(buffer).digest('hex').slice(0,16);const variants=[];
for(const width of [...new Set([480,960,1600].filter(w=>w<meta.width).concat(Math.min(meta.width,1600)))].sort((a,b)=>a-b)){const name=`${id}-${width}.webp`;const dest=path.join(output,name);try{await fs.access(dest);}catch{await sharp(buffer).resize({width,withoutEnlargement:true}).webp({quality:82,effort:4}).toFile(dest);}variants.push({width,file:`assets/responsive/${name}`});}
manifest[key]={width:meta.width,height:meta.height,variants};original+=buffer.length;const mobile=variants.find(v=>v.width>=960)||variants.at(-1);small+=(await fs.stat('public/'+mobile.file)).size;
}}
await Promise.all(Array.from({length:4},worker));
await fs.writeFile('src/responsive-images.json',JSON.stringify(manifest));
console.log(`Responsive images: ${files.length}; original ${(original/1e6).toFixed(1)} MB; <=960px WebP ${(small/1e6).toFixed(1)} MB`);
