import type { Attachment } from './order';
const PREFIX='braa-graphix:v1:';
export function readLocal<T>(key:string,fallback:T):T {
  try { const value=localStorage.getItem(PREFIX+key); return value?JSON.parse(value):fallback; } catch { return fallback; }
}
export function writeLocal(key:string,value:unknown):boolean {
  try { localStorage.setItem(PREFIX+key,JSON.stringify(value)); return true; } catch { return false; }
}
const openDatabase=()=>new Promise<IDBDatabase>((resolve,reject)=>{
  const request=indexedDB.open('braa-graphix-private-images',1);
  request.onupgradeneeded=()=>request.result.createObjectStore('images');
  request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);
});
export async function saveAttachment(file:File):Promise<Attachment> {
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('אפשר להעלות קובצי JPG, PNG או WebP בלבד.');
  if(file.size>10*1024*1024) throw new Error('גודל כל תמונה צריך להיות עד 10MB.');
  const bitmap=await createImageBitmap(file).catch(()=>{throw new Error('לא ניתן לקרוא את התמונה. בחרו קובץ תמונה תקין.');});
  bitmap.close();
  const db=await openDatabase();const id=crypto.randomUUID();
  await new Promise<void>((resolve,reject)=>{const tx=db.transaction('images','readwrite');tx.objectStore('images').put(file,id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(new Error('לא ניתן לשמור את התמונה בדפדפן. נסו לפנות מקום.'));});db.close();
  return {id,name:file.name};
}
export async function attachmentBlob(id:string):Promise<Blob|undefined> {
  const db=await openDatabase();
  return new Promise((resolve,reject)=>{const tx=db.transaction('images','readonly');const req=tx.objectStore('images').get(id);req.onsuccess=()=>{db.close();resolve(req.result);};req.onerror=()=>{db.close();reject(req.error);};});
}
export async function clearPrivateData():Promise<void> {
  Object.keys(localStorage).filter(k=>k.startsWith(PREFIX)).forEach(k=>localStorage.removeItem(k));
  const db=await openDatabase();await new Promise<void>((resolve,reject)=>{const tx=db.transaction('images','readwrite');tx.objectStore('images').clear();tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});db.close();
}
