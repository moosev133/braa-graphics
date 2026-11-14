import { t, localizeError } from "./i18n";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gift, Trash2, ChevronDown } from 'lucide-react';
import { imagePath, productById } from './catalog';
import { Breadcrumbs, EmptyState, PageHeading } from './components';
import { GiftSummary } from './GiftBuilder';
import { useSaved, useStore } from './state';
import { Preview } from './Editor';
import Inquiry from './Inquiry';
import { customizationLines, giftErrors, validateCustomization } from './order';
export default function Basket() {
  const {
    basket,
    setBasket
  } = useStore();
  const [notes, setNotes] = useSaved<string>('basket-notes', '');
  const [review, setReview] = useState(false);
  const errors = basket.flatMap(item => item.custom && item.productId ? validateCustomization(item.productId, item.custom) : item.gift ? giftErrors(item.gift,3) : []);
  return <div className="container basket-page"><Breadcrumbs items={[{
      label: 'סל הפניות'
    }]} /><PageHeading eyebrow={t("YOUR LITTLE COLLECTION")} title={t("כל המחשבות הטובות, כאן.")} description={t("בודקים את הפרטים, ושולחים יחד לסטודיו להצעת מחיר.")} />{!basket.length ? <EmptyState title={t("הסל מחכה לרעיונות שלכם")} description={t("מוצר אישי או מארז שלם — מוסיפים לסל וממשיכים להתרגש.")} /> : <div className="basket-layout"><div className="basket-items">{basket.map((item, index) => <article className="basket-item" key={item.id}><div className="basket-item-heading"><span>0{index + 1}</span><h2>{item.gift ? t('המארז האישי שלכם') : t(productById(item.productId!)!.title)}</h2><button className="icon-button" aria-label={t("הסרת {0} מהסל", [item.gift ? t('המארז') : t(productById(item.productId!)!.title)])} onClick={() => {
              setBasket(basket.filter(i => i.id !== item.id));
              setReview(false);
            }}><Trash2 size={19} /></button></div>{item.gift ? <details className="basket-gift"><summary><Gift size={22} />{t(item.gift.occasion)} · {item.gift.items.length}{t(" סוגי מוצרים")}<ChevronDown size={18} /></summary><GiftSummary gift={item.gift} /></details> : <div className="basket-product"><Preview product={productById(item.productId!)!} value={item.custom!} compact /><div><p>{item.custom!.name || t('עיצוב אישי')}</p>{item.custom!.text && <p className="basket-message">{item.custom!.text}</p>}<p className="fine-print">{item.custom!.attachments.length}{t(" תמונות לצירוף ידני")}</p><label>{t("כמות")}<input type="number" min={1} max={999} value={item.custom!.quantity} onChange={e => {
                  setBasket(basket.map(i => i.id === item.id ? {
                    ...i,
                    custom: {
                      ...i.custom!,
                      quantity: Number(e.target.value)
                    }
                  } : i));
                  setReview(false);
                }} /></label><details><summary>{t("פרטי ההתאמה האישית")}</summary><ul>{customizationLines(item.productId!, item.custom!).slice(2).map((line, i) => <li key={i}>{line}</li>)}</ul></details></div></div>}</article>)}<Link to="/catalog" className="text-link">{t("ממשיכים לגלות")}<ArrowLeft size={17} /></Link></div><aside className="basket-summary"><span className="eyebrow">{t("עוד רגע שולחים")}</span><h2>{t("בקשה אחת, הרבה מחשבה.")}</h2><div className="summary-count"><span>{t("פריטים / מארזים בפנייה")}</span><b>{basket.length}</b></div><p>{t("מחיר סופי, זמינות ומועד אספקה יימסרו על ידי הסטודיו לאחר בדיקת הבקשה.")}</p><label>{t("הערות לפנייה")}<textarea maxLength={1500} rows={4} value={notes} onChange={e => {
            setNotes(e.target.value);
            setReview(false);
          }} placeholder={t("מתי צריך את המתנה? יש בקשה מיוחדת?")} /></label>{errors.length > 0 && <div role="alert" className="form-error">{errors.map((e, i) => <p key={i}>{localizeError(e)}</p>)}</div>}<button className="button dark full" disabled={errors.length > 0} onClick={() => setReview(true)}>{t("בדיקת הבקשה ושליחה")}<ArrowLeft size={18} /></button>{review && <Inquiry items={basket} notes={notes} />}<p className="fine-print">{t("סל הפניות נשמר בדפדפן הזה. זו אינה הזמנה מאושרת, ואין חיוב באתר.")}</p></aside></div>}</div>;
}
