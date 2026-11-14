import { catalogCategories, catalogTrail, inCatalogCategory } from './catalog-taxonomy';
import { t, localizeError } from "./i18n";
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Gift, Heart, Plus, RotateCcw, Sparkles, X } from 'lucide-react';
import { imagePath, occasions, productById, products } from './catalog';
import { blankGift, blankPersonalization, giftErrors, type GiftDraft } from './order';
import { Breadcrumbs, PageHeading } from './components';
import { CustomizationForm, Preview } from './Editor';
import { useSaved, useStore } from './state';
import Inquiry from './Inquiry';
const steps = ['האירוע', 'הקופסה', 'המתנות', 'הנגיעה שלכם', 'הברכה', 'מבט אחרון', 'לסטודיו'];
export function GiftSummary({
  gift
}: {
  gift: GiftDraft;
}) {
  return <div className="gift-summary"><div className="gift-summary-top"><Gift size={30} /><div><h3>{t(gift.box) || t('המארז האישי שלכם')}</h3><p>{t(gift.occasion)} · {t(gift.boxColor)}</p></div></div><div className="gift-summary-grid">{gift.items.map(item => {
        const product = productById(item.productId)!;
        return <div key={item.productId}><img src={imagePath(product.image)} alt={product.imageKind === 'provided' ? t(product.title) : t("הדמיה: {0}", [t(product.title)])} /><h4>{t(product.title)}</h4><p>{item.custom.name || t('ללא שם')}{t(" · כמות ")}{item.custom.quantity}</p>{item.custom.text && <p>{item.custom.text}</p>}{Object.entries(item.custom.options).filter(([, v]) => v).map(([k, v]) => <small key={k}>{k === 'modelOther' ? v : t(v)} </small>)}{item.custom.attachments.length > 0 && <small>{item.custom.attachments.length}{t(" תמונות לצירוף ידני")}</small>}</div>;
      })}</div>{gift.greeting && <blockquote><span>{t("ל")}{gift.recipient || t('מישהו מיוחד')},</span>{gift.greeting}<Heart size={18} /></blockquote>}{gift.notes && <p>{t("הערות: ")}{gift.notes}</p>}</div>;
}
export default function GiftBuilder() {
  const [gift, setGift] = useSaved<GiftDraft>('gift-builder', blankGift());
  const {
    addItem,
    toast
  } = useStore();
  const [errors, setErrors] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [activeProduct, setActiveProduct] = useState('');
  const active = gift.items.find(i => i.productId === activeProduct) || gift.items[0];
  const change = (next: Partial<GiftDraft>) => {
    setGift({
      ...gift,
      ...next
    });
    setErrors([]);
  };
  function next() {
    const issues = giftErrors(gift, gift.step);
    setErrors(issues);
    if (!issues.length) {
      change({
        step: Math.min(6, gift.step + 1)
      });
      window.scrollTo({
        top: 160,
        behavior: 'smooth'
      });
    }
  }
  function toggle(id: string) {
    if (gift.items.some(i => i.productId === id)) change({
      items: gift.items.filter(i => i.productId !== id)
    });else if (gift.items.length >= 9) toast('אפשר להוסיף עד 9 סוגי מוצרים. ניתן לשנות את הכמות בכל מוצר.');else change({
      items: [...gift.items, {
        productId: id,
        custom: blankPersonalization()
      }]
    });
  }
  function saveGift() {
    const allErrors = [0, 1, 2, 3].flatMap(step => giftErrors(gift, step));
    setErrors(allErrors);
    if (!allErrors.length) addItem({
      gift
    });
  }
  return <div className="container gift-page"><Breadcrumbs items={[{
      label: 'בונים מתנה אישית'
    }]} /><PageHeading eyebrow={t("A LITTLE OF THIS. A LOT OF LOVE.")} title={t("בואו נבנה משהו משמח.")} description={t("בחרו את הרגע, אספו דברים אהובים והוסיפו את עצמכם.")} /><div className="gift-progress" aria-label={t("שלבי בניית מתנה")}>{steps.map((step, i) => <button key={step} disabled={i > gift.step} aria-current={i === gift.step ? 'step' : undefined} className={i === gift.step ? 'current' : i < gift.step ? 'complete' : ''} onClick={() => change({
        step: i
      })}><span>{i < gift.step ? <Check size={16} /> : i + 1}</span><b>{t(step)}</b></button>)}</div><div className={`gift-layout ${gift.step === 3 ? 'editing' : ''}`}><section className="gift-workspace"><div className="builder-section-heading"><span>0{gift.step + 1} / 07</span><button className="text-link" onClick={() => {
            if (confirm(t('להתחיל את המארז מחדש? הבחירות במארז הזה יימחקו.'))) {
              setGift(blankGift());
              setErrors([]);
            }
          }}><RotateCcw size={14} />{t("התחלה חדשה")}</button></div>
    {gift.step === 0 && <><h2>{t("איזה רגע חוגגים?")}</h2><p>{t("כל סיבה היא סיבה טובה לשמח.")}</p><div className="occasion-grid">{occasions.map((occasion, i) => <button key={occasion} className={`occasion-choice ${gift.occasion === occasion ? 'selected' : ''}`} onClick={() => change({
              occasion
            })}><span>{['✷', '♡', '❋', '✧', '☀', '♥', '✿', '✳'][i]}</span><strong>{t(occasion)}</strong>{gift.occasion === occasion && <Check size={15} />}</button>)}</div></>}
    {gift.step === 1 && <><h2>{t("מתחילים מבחוץ")}</h2><p>{t("בחרו סגנון קופסה. הגודל הסופי יתואם לפי התכולה.")}</p><div className="box-options">{['קופסה קלאסית', 'מארז עם סרט', 'סל מתנות'].map((box, i) => <button className={gift.box === box ? 'selected' : ''} key={box} onClick={() => change({
              box
            })}><div className={`box-illustration box-style-${i}`}><Gift size={65} strokeWidth={1} /></div><strong>{t(box)}</strong><span>{t(['נקייה, אישית ומלאת מחשבה', 'טאץ׳ חגיגי, עד הפרט האחרון', 'כל הדברים האהובים, ביחד'][i])}</span></button>)}</div><label>{t("העדפת צבע")}<select value={gift.boxColor} onChange={e => change({
              boxColor: e.target.value
            })}><option value={"ורוד עתיק"}>{t("ורוד עתיק")}</option><option value={"קרם"}>{t("קרם")}</option><option value={"קראפט טבעי"}>{t("קראפט טבעי")}</option><option value={"לבנדר"}>{t("לבנדר")}</option></select></label></>}
    {gift.step === 2 && <><h2>{t("מה נכנס למתנה שלכם?")}</h2><p>{t("אפשר לשלב עד 9 סוגי מוצרים. התאמת התכולה לקופסה תיבדק בסטודיו.")}</p><label>{t("מוצרים לפי קטגוריה")}<select value={category} onChange={e => setCategory(e.target.value)}><option value="">{t("בחירת הסטודיו")}</option>{catalogCategories.filter(c => products.some(p => p.category !== 'boxes' && inCatalogCategory(p,c.id))).map(c => <option key={c.id} value={c.id}>{catalogTrail(c.id).map(node => t(node.short)).join(' / ')}</option>)}</select></label><div className="gift-products">{products.filter(p => p.category !== 'boxes' && (category ? inCatalogCategory(p,category) : p.index === 0 || p.id === 'jewelry-4')).map(p => <button key={p.id} className={gift.items.some(i => i.productId === p.id) ? 'selected' : ''} onClick={() => toggle(p.id)}><img src={imagePath(p.image)} alt={p.imageKind === 'provided' ? t(p.title) : t("הדמיה: {0}", [t(p.title)])} loading="lazy" /><strong>{t(p.title)}</strong><span className="gift-add">{gift.items.some(i => i.productId === p.id) ? <Check size={17} /> : <Plus size={17} />}</span></button>)}</div></>}
    {gift.step === 3 && active && <><h2>{t("אותה מתנה. הסיפור שלכם.")}</h2><p>{t("לכל פריט אפשר להוסיף נגיעה אחרת.")}</p><div className="item-tabs">{gift.items.map(item => <button className={active.productId === item.productId ? 'active' : ''} key={item.productId} onClick={() => setActiveProduct(item.productId)}>{t(productById(item.productId)!.title)}</button>)}</div><Preview product={productById(active.productId)!} value={active.custom} onChange={custom => change({
            items: gift.items.map(item => item.productId === active.productId ? {
              ...item,
              custom
            } : item)
          })} /><CustomizationForm product={productById(active.productId)!} value={active.custom} onChange={custom => change({
            items: gift.items.map(item => item.productId === active.productId ? {
              ...item,
              custom
            } : item)
          })} /></>}
    {gift.step === 4 && <><h2>{t("כמה מילים, ישר מהלב")}</h2><p>{t("כרטיס קטן שיישאר גם אחרי שפותחים את המתנה.")}</p><label>{t("למי המתנה?")}<input maxLength={70} placeholder={t("שם מקבל/ת המתנה")} value={gift.recipient} onChange={e => change({
              recipient: e.target.value
            })} /></label><label>{t("הברכה שלכם")}<textarea rows={6} maxLength={1000} placeholder={t("יש דברים שפשוט מגיע לך לשמוע…")} value={gift.greeting} onChange={e => change({
              greeting: e.target.value
            })} /></label><span className="fine-print">{gift.greeting.length}{t(" / 1000 · אפשר להשאיר ריק")}</span><div className="greeting-preview"><span>{t("just for you")}</span><p>{gift.greeting || t('המילים שלכם יופיעו כאן…')}</p><Heart size={22} /></div></>}
    {gift.step === 5 && <><h2>{t("יש כאן משהו מיוחד.")}</h2><p>{t("מבט אחרון על הבחירות שלכם לפני ששולחים לסטודיו.")}</p><GiftSummary gift={gift} /><label>{t("עוד משהו שחשוב לכם?")}<textarea rows={3} maxLength={1000} placeholder={t("מועד מבוקש, משלוח או בקשה מיוחדת")} value={gift.notes} onChange={e => change({
              notes: e.target.value
            })} /></label><p className="notice">{t("המחיר, הזמינות, התאמת התכולה והעיצוב יאושרו בשיחה. עדיין לא בוצעה הזמנה.")}</p></>}
    {gift.step === 6 && <><h2>{t("נותנים למחשבה צורה.")}</h2><p>{t("הבקשה שלכם מוכנה לשיחה עם הסטודיו.")}</p><Inquiry items={[{
            id: 'gift-request',
            gift
          }]} /><button className="button outline full" onClick={saveGift}><Plus size={17} />{t("שמירת המארז בסל הפניות")}</button></>}
    {errors.length > 0 && <div role="alert" className="form-error">{errors.map(e => <p key={e}>{localizeError(e)}</p>)}</div>}
    <div className="builder-navigation">{gift.step > 0 && <button className="button outline" onClick={() => change({
            step: gift.step - 1
          })}><ArrowRight size={17} />{t("חזרה")}</button>}{gift.step < 6 && <button className="button dark" onClick={next}>{gift.step === 5 ? t('לבקשת הצעת מחיר') : t('ממשיכים')}<ArrowLeft size={17} /></button>}</div>
    </section><aside className="gift-sidebar"><div className="gift-sidebar-title"><Gift size={22} /><h3>{t("קצת אהבה בקופסה")}</h3></div><img className="gift-sidebar-photo" src={imagePath('gift-box')} alt={t("הדמיית השראה למארז מתנה")} /><div className="gift-sidebar-content"><span className="fine-print">{t("תמונת השראה · הבחירות שלכם מפורטות למטה")}</span>{gift.occasion && <p>{t(gift.occasion)} <Heart size={14} /></p>}{gift.box && <p>{t(gift.box)} · {t(gift.boxColor)}</p>}{gift.items.length ? <ul>{gift.items.map(item => <li key={item.productId}><img src={imagePath(productById(item.productId)!.image)} alt="" /><div>{t(productById(item.productId)!.title)}<small>{item.custom.name || t('נגיעה אישית בדרך')} · {item.custom.quantity}{t(" יח׳")}</small></div><button className="icon-button" aria-label={t("הסרת {0} מהמארז", [t(productById(item.productId)!.title)])} onClick={() => {
                toggle(item.productId);
                if (gift.step > 2) change({
                  items: gift.items.filter(i => i.productId !== item.productId),
                  step: 2
                });
              }}><X size={14} /></button></li>)}</ul> : <p className="gift-empty-note">{t("המתנה שלכם מחכה לרעיונות ✧")}</p>}<div className="saved-note"><Check size={14} />{t("הבחירות נשמרות בדפדפן הזה")}</div><p className="fine-print">{t("המחיר לפי התכולה וההתאמה האישית.")}</p></div></aside></div></div>;
}
