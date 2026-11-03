export const studio = {
  name: 'BRAA GRAPHIX', tagline: 'INSPIRE AND CAPTIVATE',
  whatsapp: '972545503130', phone: '0545503130',
  instagram: 'https://www.instagram.com/braagraphix/',
  logo: null as string | null,
  productionTime: null as string | null,
  delivery: 'אפשרויות איסוף ומשלוח יתואמו עם הסטודיו בהתאם למוצר ולכתובת.',
};

export type CategoryId = 'mugs'|'stationery'|'albums'|'prints'|'candles'|'clothing'|'beauty'|'jewelry'|'cases'|'bottles'|'events'|'boxes';
export interface Field { key: string; label: string; type: 'select'|'text'|'date'; options?: string[]; required?: boolean; }
export interface Category { id: CategoryId; title: string; short: string; image: string; color: string; description: string; fields: Field[]; photo: boolean; nameLabel: string; }
const field = (key: string, label: string, options: string[], required = false): Field => ({ key, label, type: 'select', options, required });
export const phoneModels: Record<string, string[]> = {
  Apple: ['iPhone 13','iPhone 14','iPhone 15','iPhone 16','דגם אחר'],
  Samsung: ['Galaxy S23','Galaxy S24','Galaxy S25','דגם אחר'],
  'מותג אחר': ['דגם אחר'],
};
export const categories: Category[] = [
  { id:'mugs',title:'ספלים וכוסות בעיצוב אישי',short:'ספלים וכוסות',image:'mug',color:'#F5DEE4',description:'רגע קטן של קפה, עם נגיעה שהיא רק שלכם.',photo:true,nameLabel:'שם להדפסה',fields:[field('finish','גימור מבוקש',['לבן קלאסי','ידית צבעונית','בהמלצת הסטודיו'])]},
  { id:'stationery',title:'מחברות וכלי כתיבה',short:'מחברות ונייר',image:'notebook',color:'#E7E1F1',description:'מקום יפה לרעיונות, לחלומות ולכל מה שבדרך.',photo:true,nameLabel:'שם על הכריכה',fields:[field('cover','עיצוב כריכה',['מינימליסטי','פרחוני','איור אישי']),field('format','סוג דפים מבוקש',['שורות','נקודות','חלק'])]},
  { id:'albums',title:'אלבומי תמונות',short:'אלבומי תמונות',image:'album',color:'#F4E8DC',description:'הזיכרונות האהובים, בסיפור שתוכלו להחזיק ביד.',photo:true,nameLabel:'כותרת האלבום',fields:[field('size','גודל מבוקש',['קטן','בינוני','גדול']),field('cover','סוג כריכה',['קשיחה','רכה','בהמלצת הסטודיו']),field('pages','מספר עמודים מבוקש',['20','30','40','לתיאום'])]},
  { id:'prints',title:'תמונות ומסגרות',short:'תמונות ומסגרות',image:'framed-art',color:'#E8E4D9',description:'לתת לרגעים שלכם את המקום שמגיע להם.',photo:true,nameLabel:'כותרת או שם',fields:[field('size','מידה מבוקשת (ס״מ)',['10×15','13×18','20×30','30×40','40×60']),field('frame','צבע מסגרת מבוקש',['עץ טבעי','לבן','שחור']),field('orientation','כיוון',['לאורך','לרוחב']),field('printType','סוג הדפס',['נייר צילום','קנבס'])]},
  { id:'candles',title:'נרות בעיצוב אישי',short:'נרות ורגעים',image:'candle',color:'#FAE8CA',description:'אור רך, הקדשה אישית והרבה מחשבה.',photo:false,nameLabel:'שם על התווית',fields:[field('label','סגנון תווית',['נקי ואלגנטי','פרחוני','חגיגי']),field('scent','העדפת ריח',['לבחירה לאחר בדיקת זמינות','ללא ריח, אם זמין'])]},
  { id:'clothing',title:'ביגוד בהדפסה אישית',short:'ביגוד אישי',image:'tshirt',color:'#E4EAF0',description:'ללבוש רעיון, לחגוג יחד, להיות אתם.',photo:true,nameLabel:'שם או כותרת להדפסה',fields:[field('size','מידה מבוקשת',['XS','S','M','L','XL','XXL','מידת ילדים — לציין בהערות'],true),field('placement','מיקום הדפס',['קדמי','אחורי','קדמי ואחורי'])]},
  { id:'beauty',title:'בשמים ומתנות טיפוח',short:'בשמים וטיפוח',image:'perfume',color:'#EEDFD9',description:'הפרטים שעושים את האריזה לאישית.',photo:false,nameLabel:'שם על האריזה בלבד',fields:[field('packaging','התאמת אריזה',['תווית אישית','כרטיס ברכה','אריזת מתנה'])]},
  { id:'jewelry',title:'תכשיטים ואקססוריז',short:'תכשיטים ואקססוריז',image:'jewelry',color:'#F2E5D8',description:'מחווה עדינה, עם אריזה שמספרת את הסיפור.',photo:false,nameLabel:'שם על כרטיס המתנה',fields:[field('finish','גוון מבוקש',['זהוב','כסוף','בהמלצת הסטודיו']),field('packaging','אריזה',['קופסת מתנה','כרטיס אישי'])]},
  { id:'cases',title:'כיסויים לטלפון בהדפסה אישית',short:'כיסויים לטלפון',image:'phone-case',color:'#E4DCEE',description:'התמונה, השם או האיור שלכם, תמיד איתכם.',photo:true,nameLabel:'שם להדפסה',fields:[field('brand','מותג טלפון',Object.keys(phoneModels),true),field('model','דגם הטלפון',[],true),field('caseType','סוג כיסוי מבוקש',['שקוף','אטום','בהמלצת הסטודיו'])]},
  { id:'bottles',title:'בקבוקים בעיצוב אישי',short:'בקבוקים',image:'bottle',color:'#DDEAE9',description:'לכל הרפתקה, עם השם שלכם.',photo:false,nameLabel:'שם על הבקבוק',fields:[field('bottleType','סוג בקבוק מבוקש',['נירוסטה','ספורט','לילדים']),field('design','עיצוב',['שם בלבד','איור ושם','עיצוב אישי'])]},
  { id:'events',title:'הדפסות לאירועים',short:'אירועים וחגיגות',image:'event-printing',color:'#F3DCD9',description:'מההזמנה ועד המתנה הקטנה, כל פרט חוגג איתכם.',photo:true,nameLabel:'שמות בעלי השמחה',fields:[field('occasion','סוג האירוע',['יום הולדת','חתונה','אירוסין','לידה','אירוע אחר']),{key:'date',label:'תאריך האירוע',type:'date'},field('theme','סגנון',['פרחוני','מינימליסטי','צבעוני','עיצוב מותאם'])]},
  { id:'boxes',title:'מארזי מתנה בהתאמה אישית',short:'מארזי מתנה',image:'gift-box',color:'#F6E0D8',description:'כמה דברים קטנים. הרבה אהבה בקופסה אחת.',photo:false,nameLabel:'שם מקבל/ת המתנה',fields:[field('occasion','לכבוד',['יום הולדת','יום נישואין','חתונה','סיום לימודים','לידה','חברות','סתם כי אוהבים']),field('boxSize','גודל מארז מבוקש',['קטן','בינוני','גדול'])]},
];
export const occasions = ['יום הולדת','יום נישואין','חתונה','סיום לימודים','לידה','יום האהבה','חברות','סתם כי אוהבים'];
const seeds: Record<CategoryId, string[]> = {
  mugs:['ספל עם השם שלכם','ספל עם תמונה אהובה','זוג ספלים, סיפור אחד','ספל יום הולדת','כוס בעיצוב אישי','ספל קרמיקה קלאסי'],
  stationery:['מחברת מלאה בחלומות','יומן אישי','פלנר עם השם שלכם','מחברת לבית הספר','מארז כלי כתיבה','עט עם שם'],
  albums:['אלבום החתונה שלנו','השנה הראשונה שלי','אלבום יום הולדת','הסיפור הזוגי שלנו','אלבום משפחתי','ספר תמונות אישי'],
  prints:['רגע בתוך מסגרת','תמונת קנבס','הדפס אמנותי לקיר','דיוקן מאויר אישי','קולאז׳ של זיכרונות','תמונה זוגית'],
  candles:['נר עם הקדשה אישית','נר ריחני במתנה','נר קטן לאורחים','נר יום הולדת','נר עם שם','נר דקורטיבי'],
  clothing:['טי שירט, בדיוק אתם','קפוצ׳ון בעיצוב אישי','בגד לתינוק עם שם','חולצות זוגיות','חולצות לאירוע','חולצת יום הולדת'],
  beauty:['מארז בושם במתנה','אריזת בושם אישית','תווית לבושם','קופסת מתנות טיפוח','אביזר טיפוח באריזת מתנה'],
  jewelry:['עגילים באריזת מתנה','שרשרת עם כרטיס אישי','צמיד במתנה','מחזיק מפתחות אישי','אקססוריז באריזה אישית','אריזת מתנה לתכשיט'],
  cases:['כיסוי עם תמונה','כיסוי עם שם','כיסויים לזוג','כיסוי עם איור אישי','כיסוי בהדפס אישי'],
  bottles:['בקבוק עם השם שלכם','בקבוק עם הקדשה','בקבוק עם הדפס','בקבוק ספורט אישי','בקבוק לילדים','בקבוק באריזת מתנה'],
  events:['שוקולד עם סיפור אישי','מזכרת ליום הולדת','מזכרת לאורחי חתונה','מתנה קטנה לאירוסין','מזכרת לחגיגת לידה','תוויות למסיבה','הזמנה מעוצבת','כרטיס תודה אישי','מדבקות מעוצבות','אריזות לאירוע'],
  boxes:['מארז יום הולדת','מארז ליום נישואין','מארז זוגי','מארז לסיום הלימודים','מארז לאמא','מארז לחברה','סל מתנות אישי'],
};
export interface Product { id: string; title: string; category: CategoryId; index: number; image: string; description: string; price: number|null; isNew: boolean; occasion: string; }
const occasionFor=(title:string):string=>{
  if(/חתונ/.test(title))return 'חתונה';
  if(/נישואין/.test(title))return 'יום נישואין';
  if(/יום הולדת/.test(title))return 'יום הולדת';
  if(/לידה|תינוק|השנה הראשונה/.test(title))return 'לידה';
  if(/לימוד/.test(title))return 'סיום לימודים';
  if(/זוג|לזוג/.test(title))return 'יום האהבה';
  if(/לחברה/.test(title))return 'חברות';
  return 'סתם כי אוהבים';
};
export const products: Product[] = categories.flatMap(category=>seeds[category.id].map((title,index)=>({
  id: `${category.id}-${index+1}`,title,category:category.id,index,image:category.image,
  description: `${category.description} בוחרים את הסגנון, מוסיפים הקדשה ויחד עם הסטודיו הופכים את הרעיון למתנה אישית.`,
  price:null,isNew:index===0||index===2,occasion:occasionFor(title),
})));
export const featuredIds = ['mugs-1','stationery-1','candles-1','boxes-1'];
export const categoryById = (id: string) => categories.find(c=>c.id===id);
export const productById = (id: string) => products.find(p=>p.id===id);
export const imagePath = (name: string) => `/images/${name}.webp`;
export const productFields = (product: Product): Field[] => {
  if(product.id==='stationery-6') return [field('finish','גוון עט מבוקש',['בהמלצת הסטודיו','שחור','לבן'])];
  if(product.id==='clothing-3') return [field('size','מידת תינוק מבוקשת',['0–3 חודשים','3–6 חודשים','6–12 חודשים','12–18 חודשים','לתיאום'],true),field('placement','מיקום הדפס',['קדמי','אחורי'])];
  if(product.id==='prints-2') return [field('size','מידה מבוקשת (ס״מ)',['20×30','30×40','40×60']),field('orientation','כיוון',['לאורך','לרוחב']),field('printType','סוג הדפס',['קנבס'])];
  if(product.category==='prints') return categoryById('prints')!.fields.map(f=>f.key==='printType'?{...f,options:['נייר צילום']}:f);
  if(product.id==='jewelry-4') return [field('finish','גוון מבוקש',['זהוב','כסוף','בהמלצת הסטודיו']),field('packaging','אריזה',['קופסת מתנה','כרטיס אישי'])];
  return categoryById(product.category)!.fields;
};
export const supportsPhoto = (product: Product) => categoryById(product.category)!.photo && product.id!=='stationery-6';
// A compatibility filter describes design requests, never live inventory.
export const matchesRequestedOptions=(product:Product,requested:Record<string,string>)=>Object.entries(requested).every(([key,value])=>!value||productFields(product).some(f=>f.key===key&&f.options?.includes(value)));
export const services = [
  {title:'מיתוג וזהות חזותית',subtitle:'IDENTITY',description:'לוגו, צבעים ושפה עיצובית שמספרים מי אתם.',tone:'lilac'},
  {title:'הזמנות וניירת לאירועים',subtitle:'CELEBRATIONS',description:'עיצוב שמתחיל את החגיגה עוד לפני שנפגשים.',tone:'pink'},
  {title:'עיצוב לרשתות חברתיות',subtitle:'SOCIAL',description:'פוסטים וגרפיקה פרסומית עם שפה אישית ונוכחות.',tone:'yellow'},
  {title:'כרטיסי ביקור ודפוס',subtitle:'PRINT',description:'כרטיסי ביקור, פליירים וחומרי פרסום מוקפדים.',tone:'blue'},
  {title:'איורים אישיים',subtitle:'ILLUSTRATION',description:'רעיון, אדם או רגע שהופכים לאיור עם אופי.',tone:'yellow'},
  {title:'עיצוב בהתאמה אישית',subtitle:'YOUR IDEA',description:'יש לכם רעיון אחר? נבנה יחד כיוון שמתאים לכם.',tone:'lilac'},
];
