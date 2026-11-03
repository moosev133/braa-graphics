import { t } from "./i18n";
import { useState } from 'react';
import { ArrowLeft, Check, Instagram, Palette, Sparkles, MessageCircle, Phone } from 'lucide-react';
import { services, studio } from './catalog';
import { Breadcrumbs, PageHeading, WhatsAppLink } from './components';
import { whatsappUrl } from './order';
export function Portfolio() {
  return <div className="container services-page"><Breadcrumbs items={[{
      label: 'תיק עבודות'
    }]} /><PageHeading eyebrow={t("ROOM FOR BEAUTIFUL STORIES")} title={t("הסיפורים שלנו, בעיצוב.")} description={t("כאן יופיעו עבודות אמיתיות של הסטודיו. בינתיים, הנה שלושה כיוונים מקוריים להשראה.")} /><div className="services-grid">{services.slice(0, 3).map((service, i) => <article className={`service-card ${service.tone}`} key={service.title}><div className="service-art" aria-hidden="true"><span>{['Aa', '✿', '@'][i]}</span><small>{t(service.subtitle)}</small></div><h2>{t(service.title)}</h2><p>{t("קומפוזיציה מקורית להשראה בלבד. זו אינה עבודה עבור לקוח.")}</p><WhatsAppLink className="text-link" message={t("היי BRAA GRAPHIX, אהבתי את הכיוון של {0} ואשמח לעיצוב אישי.", [t(service.title)])}>{t("ליצור משהו משלכם")}<ArrowLeft size={15} /></WhatsAppLink></article>)}</div><div className="portfolio-placeholder"><h2>{t("הפרויקט הבא יכול להתחיל ברעיון שלכם.")}</h2><p>{t("שתפו אותנו במחשבה, בסגנון ובמה שחשוב לכם להעביר.")}</p><WhatsAppLink message={t("היי BRAA GRAPHIX, אשמח לדבר על פרויקט עיצוב חדש.")} /></div></div>;
}
export function Services() {
  return <div className="container services-page"><Breadcrumbs items={[{
      label: 'שירותי עיצוב גרפי'
    }]} /><div className="services-hero"><PageHeading eyebrow={t("LET YOUR IDEAS TAKE SHAPE")} title={t("רעיון טוב. עיצוב שמרגישים.")} description={t("מהסיפור שלכם לשפה חזותית עם אופי. עיצוב אישי לעסקים, לחגיגות ולרעיונות שעוד לא קיבלו צורה.")} /><div className="services-mark" aria-hidden="true">{t("a little")}<br /><i>{t("creative")}</i><br />{t("magic.")}<Sparkles size={30} /></div></div><div className="services-grid">{services.map((service, i) => <article className={`service-card ${service.tone}`} key={service.title}><span className="service-number">0{i + 1}</span><div className="service-art" aria-hidden="true"><span>{['Aa', '✿', '@', 'hello.', '✧', '✳'][i]}</span><small>{t(service.subtitle)}</small></div><h2>{t(service.title)}</h2><p>{t(service.description)}</p><WhatsAppLink className="text-link" message={t("היי BRAA GRAPHIX, אשמח לשמוע על {0}.", [t(service.title)])}>{t("בואו נדבר על העיצוב")}<ArrowLeft size={16} /></WhatsAppLink><small className="fine-print">{t("קומפוזיציה להשראה · מחיר לפי היקף הפרויקט")}</small></article>)}</div><section className="portfolio-placeholder"><Palette size={32} /><h2>{t("לכל פרויקט מגיע סיפור משלו.")}</h2><p>{t("תיק העבודות יתעדכן כאן עם עבודות אמיתיות של הסטודיו.")}<br />{t("בינתיים, ספרו לנו על הרעיון שלכם ונבדוק יחד את הכיוון.")}</p><WhatsAppLink message={t("היי BRAA GRAPHIX, יש לי רעיון לעיצוב ואשמח להתייעץ.")} /></section></div>;
}
export function About() {
  return <div className="container about-page"><Breadcrumbs items={[{
      label: 'על הסטודיו'
    }]} /><PageHeading eyebrow="INSPIRE AND CAPTIVATE" title={t("יוצרים דברים. נוגעים באנשים.")} description={t("BRAA GRAPHIX הוא סטודיו לעיצוב גרפי, מתנות אישיות והדפסות יצירתיות.")} /><div className="about-statement"><span>✳</span><p>{t("אנחנו מאמינים ששם קטן על ספל,")}<br />{t("מילים על כרטיס ותמונה בתוך מסגרת")}<br />{t("יכולים להפוך מתנה ל")}<span>{t("משהו שמרגישים.")}</span></p></div><div className="about-columns"><div><h2>{t("הסיפור שלכם, בעיצוב שלנו")}</h2><p>{t("כאן אפשר לגלות רעיונות למתנות, להוסיף שם או הקדשה, לבנות מארז ולתאם את הפרטים ישירות עם הסטודיו. כל בקשה היא התחלה של שיחה.")}</p></div><div><h2>{t("מחשבה עד הפרט הקטן")}</h2><p>{t("בוחרים את הכיוון, בודקים את האפשרויות ומאשרים יחד את העיצוב והמחיר. מהרעיון הראשון ועד לתיאום האספקה, הפרטים נסגרים באופן אישי.")}</p></div></div><WhatsAppLink message={t("היי BRAA GRAPHIX, אשמח להכיר את הסטודיו ולשמוע על האפשרויות.")} /></div>;
}
export function Contact() {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('מתנה אישית');
  const [message, setMessage] = useState('');
  const [ready, setReady] = useState(false);
  return <div className="container contact-page"><Breadcrumbs items={[{
      label: 'דברו איתנו'
    }]} /><PageHeading eyebrow={t("GOOD THINGS START WITH HELLO")} title={t("כל רעיון מתחיל בשיחה.")} description={t("יש לכם מתנה בראש, אירוע בדרך או רעיון לעיצוב? נשמח לשמוע.")} /><div className="contact-layout"><div className="contact-card"><h2>{t("נעים להכיר ♡")}</h2><a href={`tel:${studio.phone}`}><Phone size={20} /><span dir="ltr">{studio.phone}</span></a><a href={studio.instagram} target="_blank" rel="noreferrer"><Instagram size={20} /><span dir="ltr">@braagraphix</span><ArrowLeft size={18} /></a><WhatsAppLink message={t("היי BRAA GRAPHIX, אשמח להתייעץ.")} /><p>{t("פרטי איסוף, משלוח וזמני הכנה יימסרו בשיחה לפי הבקשה.")}</p></div><form className="contact-form" onSubmit={e => {
        e.preventDefault();
        setReady(true);
      }}><label>{t("איך קוראים לכם?")}<input required maxLength={80} value={name} onChange={e => {
            setName(e.target.value);
            setReady(false);
          }} placeholder={t("השם שלכם")} autoComplete="name" /></label><label>{t("על מה מדברים?")}<select value={topic} onChange={e => {
            setTopic(e.target.value);
            setReady(false);
          }}><option value={"מתנה אישית"}>{t("מתנה אישית")}</option><option value={"מארז מתנה"}>{t("מארז מתנה")}</option><option value={"עיצוב גרפי"}>{t("עיצוב גרפי")}</option><option value={"הדפסות לאירוע"}>{t("הדפסות לאירוע")}</option><option value={"משהו אחר"}>{t("משהו אחר")}</option></select></label><label>{t("ספרו לנו קצת")}<input required maxLength={1000} value={message} onChange={e => {
            setMessage(e.target.value);
            setReady(false);
          }} placeholder={t("מה הייתם שמחים ליצור?")} /></label><button type="submit" className="button dark">{t("הכנת הודעה")}<ArrowLeft size={17} /></button>{ready && <div className="contact-ready"><p><Check size={16} />{t("ההודעה מוכנה. נמשיך לשיחה אישית?")}</p><a className="button whatsapp" href={whatsappUrl([t('היי BRAA GRAPHIX, אני ') + name + '.', t('נושא: ') + t(topic), message].join('\n'))} target="_blank" rel="noreferrer"><MessageCircle size={18} />{t("פתיחה ב־WhatsApp")}</a></div>}<p className="fine-print">{t("הטופס מכין הודעה בלבד. שום מידע אינו נשלח עד שתשלחו את ההודעה ב־WhatsApp.")}</p></form></div></div>;
}
export function Privacy() {
  return <div className="container prose-page"><Breadcrumbs items={[{
      label: 'הפרטיות שלכם'
    }]} /><PageHeading eyebrow={t("YOUR IDEAS STAY YOURS")} title={t("הפרטיות שלכם")} /><h2>{t("שמירה בדפדפן שלכם")}</h2><p>{t("סל הפניות, המועדפים, המארז והטיוטות נשמרים באחסון המקומי של הדפדפן במכשיר הזה. התמונות נשמרות מקומית ב־IndexedDB ואינן מועלות לשרת או מוצגות לאנשים אחרים. מידע שנשמר אינו מסתנכרן בין מכשירים. במכשיר משותף, למי שמשתמש באותו פרופיל דפדפן עשויה להיות גישה לטיוטות.")}</p><h2>{t("פנייה לסטודיו")}</h2><p>{t("הקישור ל־WhatsApp כולל את פרטי הבקשה שבחרתם. עליכם לשלוח את ההודעה בעצמכם ולצרף ידנית את התמונות. השימוש ב־WhatsApp וב־Instagram כפוף לתנאים שלהם. פתיחת שיחה אינה אישור הזמנה.")}</p><h2>{t("ניהול המידע")}</h2><p>{t("אפשר להסיר פריטים מהסל או מהמועדפים. למחיקת כל הטיוטות, הפריטים והתמונות המקומיות, השתמשו ב״מחיקת הנתונים מהמכשיר״ בתחתית האתר או נקו את נתוני האתר דרך הדפדפן.")}</p><h2>{t("תמונות ותוכן באתר")}</h2><p>{t("תמונות המוצרים הן הדמיות מקוריות להשראה. אין באתר מערכת תשלום, מעקב פרסומי או חיבור לפיד Instagram חי. מחירים, מידות, אפשרויות, זמני הכנה ואספקה יאושרו מול הסטודיו לפני הזמנה.")}</p><WhatsAppLink message={t("היי BRAA GRAPHIX, יש לי שאלה לגבי פרטיות או נתונים.")} /></div>;
}
