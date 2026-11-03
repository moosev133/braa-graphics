import { getLocale, translate, type Locale } from './i18n';
import { categoryById, productById, productFields, studio } from './catalog';
export interface Attachment { id: string; name: string; }
export interface Personalization { name:string; text:string; color:string; productColor:string; font:string; template:string; x:number; y:number; scale:number; imageX:number; imageY:number; imageScale:number; options:Record<string,string>; attachments:Attachment[]; notes:string; quantity:number; }
export const blankPersonalization = ():Personalization => ({name:'',text:'',color:'#6F3D50',productColor:'#FFF7EF',font:'Heebo',template:'מינימליסטי',x:50,y:56,scale:100,imageX:50,imageY:40,imageScale:100,options:{},attachments:[],notes:'',quantity:1});
export interface GiftDraft { step:number; occasion:string; box:string; boxColor:string; items:{productId:string; custom:Personalization}[]; greeting:string; recipient:string; notes:string; }
export const blankGift = ():GiftDraft => ({step:0,occasion:'',box:'',boxColor:'ורוד עתיק',items:[],greeting:'',recipient:'',notes:''});
export interface BasketItem { id:string; productId?:string; custom?:Personalization; gift?:GiftDraft; }
export function validateCustomization(productId:string, custom:Personalization):string[] {
  const product=productById(productId);
  if(!product) return ['המוצר לא נמצא'];
  const errors:string[]=[];
  if(!Number.isInteger(custom.quantity)||custom.quantity<1||custom.quantity>999) errors.push('יש להזין כמות של 1 עד 999');
  for(const field of productFields(product)) if(field.required&&!custom.options[field.key]) errors.push(`יש לבחור ${field.label}`);
  if(custom.options.model==='דגם אחר'&&!custom.options.modelOther?.trim()) errors.push('יש לציין את דגם הטלפון המדויק');
  if(custom.name.length>70||custom.text.length>300) errors.push('יש לקצר את ההקדשה');
  return errors;
}
export function giftErrors(gift:GiftDraft, step:number):string[] {
  if(step===0&&!gift.occasion) return ['בחרו את האירוע שלכם'];
  if(step===1&&!gift.box) return ['בחרו קופסה למארז'];
  if(step===2&&!gift.items.length) return ['הוסיפו לפחות מוצר אחד למתנה'];
  if(step===3) return gift.items.flatMap(i=>validateCustomization(i.productId,i.custom).map(e=>`${productById(i.productId)?.title}: ${e}`));
  return [];
}
export function newReference():string {return `BG-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomUUID().slice(0,6).toUpperCase()}`;}
export function customizationLines(productId:string,c:Personalization,locale:Locale=getLocale()):string[] {
  const tr=(key:string,values:readonly unknown[]=[])=>translate(key,locale,values);
  const product=productById(productId)!;
  const category=categoryById(product.category)!;
  const optionLabels=Object.fromEntries(productFields(product).map(f=>[f.key,f.label]));
  return [
    tr('מוצר: {0}',[tr(product.title)]),tr('כמות: {0}',[c.quantity]),
    ...(c.name?[`${tr(category.nameLabel)}: ${c.name}`]:[]),...(c.text?[tr('הקדשה: {0}',[c.text])]:[]),
    ...Object.entries(c.options).filter(([,v])=>v).map(([k,v])=>`${tr(optionLabels[k]|| (k==='modelOther'?'דגם מדויק':k))}: ${k==='modelOther'?v:tr(v)}`),
    tr('סגנון: {0}',[tr(c.template)]),tr('גופן: {0}',[c.font==='Heebo'?tr('מודרני'):c.font]),tr('צבע טקסט: {0}',[c.color]),tr('גוון מבוקש: {0}',[c.productColor]),
    tr('מיקום טקסט: {0}% / {1}%, גודל: {2}%',[c.x,c.y,c.scale]),
    ...(c.attachments.length?[tr('קבצים לצירוף ידני ב-WhatsApp: {0}',[c.attachments.map(a=>a.name).join(', ')]),tr('מיקום תמונה: {0}% / {1}%, קנה מידה: {2}%',[c.imageX,c.imageY,c.imageScale])]:[]),
    ...(c.notes?[tr('הערות: {0}',[c.notes])]:[]),
  ];
}
export function giftLines(gift:GiftDraft,locale:Locale=getLocale()):string[] {
  const tr=(key:string,values:readonly unknown[]=[])=>translate(key,locale,values);
  return [tr('מארז מתנה אישי'),tr('אירוע: {0}',[tr(gift.occasion)]),tr('קופסה: {0}',[tr(gift.box)]),tr('צבע קופסה: {0}',[tr(gift.boxColor)]),
    ...(gift.recipient?[tr('לכבוד: {0}',[gift.recipient])]:[]),...gift.items.flatMap((item,i)=>['\n'+tr('פריט {0}:',[i+1]),...customizationLines(item.productId,item.custom,locale)]),
    ...(gift.greeting?['\n'+tr('כרטיס ברכה: {0}',[gift.greeting])]:[]),...(gift.notes?[tr('הערות למארז: {0}',[gift.notes])]:[])];
}
export function inquiryMessage(items:BasketItem[],reference:string,notes='',locale:Locale=getLocale()):string {
  const tr=(key:string,values:readonly unknown[]=[])=>translate(key,locale,values);
  return [tr('היי BRAA GRAPHIX, אשמח להצעת מחיר 🌷'),tr('מספר פנייה: {0}',[reference]),'',
    ...items.flatMap((item,i)=>[tr('— בקשה {0} —',[i+1]),...(item.gift?giftLines(item.gift,locale):item.productId&&item.custom?customizationLines(item.productId,item.custom,locale):[]),'']),
    ...(notes?[tr('הערות כלליות: {0}',[notes])]:[]),tr('האפשרויות הן בקשה לבדיקה מול הסטודיו. אשמח לאישור זמינות, מחיר, עיצוב ומועד אספקה.'),
    ...(items.some(i=>i.custom?.attachments.length||i.gift?.items.some(p=>p.custom.attachments.length))?[tr('אצרף את התמונות ידנית בשיחה.')]:[])
  ].join('\n');
}
export const whatsappUrl=(message:string)=>`https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(message)}`;
const normalizeSearch=(text:string)=>text.normalize('NFKD').replace(/\p{M}/gu,'').replace(/ـ/g,'').toLocaleLowerCase().trim();
export function filterProducts<T extends {title:string;category:string;occasion:string;isNew:boolean}>(items:T[],query:string,category:string,occasion:string,newOnly:boolean):T[] {
  const term=normalizeSearch(query);
  return items.filter(p=>{
    const categoryTitle=categoryById(p.category)?.title||'';
    const searchable=['he','ar','en'].map(locale=>translate(p.title,locale as Locale)+' '+translate(categoryTitle,locale as Locale)).join(' ');
    return (!term||normalizeSearch(searchable).includes(term))&&(!category||p.category===category)&&(!occasion||p.occasion===occasion)&&(!newOnly||p.isNew);
  });
}
