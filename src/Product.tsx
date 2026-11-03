import { t, localizeError } from "./i18n";
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Plus, ShieldCheck, Truck, Sparkles, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { categoryById, imagePath, productById, products, studio, type Product as ProductType } from './catalog';
import { blankPersonalization, validateCustomization, type Personalization } from './order';
import { Breadcrumbs, EmptyState, ProductCard, SectionHeading } from './components';
import { CustomizationForm, Preview } from './Editor';
import { useSaved, useStore } from './state';
import Inquiry from './Inquiry';
function ProductEditor({
  product
}: {
  product: ProductType;
}) {
  const [custom, setCustom] = useSaved<Personalization>(`draft:${product.id}`, blankPersonalization());
  const {
    addItem,
    favorites,
    toggleFavorite
  } = useStore();
  const [errors, setErrors] = useState<string[]>([]);
  const [review, setReview] = useState(false);
  const [view, setView] = useState('design');
  const category = categoryById(product.category)!;
  function validate() {
    const next = validateCustomization(product.id, custom);
    setErrors(next);
    return !next.length;
  }
  const update = (next: Personalization) => {
    setCustom(next);
    setReview(false);
    setErrors([]);
  };
  return <div className="container product-page"><Breadcrumbs items={[{
      label: 'הקטלוג',
      to: '/catalog'
    }, {
      label: category.short,
      to: `/category/${category.id}`
    }, {
      label: product.title
    }]} /><div className="product-layout"><div className="product-visual"><div className="preview-tabs"><button className={view === 'design' ? 'active' : ''} onClick={() => setView('design')}><Sparkles size={16} />{t("העיצוב שלכם")}</button><button className={view === 'photo' ? 'active' : ''} onClick={() => setView('photo')}><ImageIcon size={16} />{t("תמונת השראה")}</button></div>{view === 'design' ? <Preview product={product} value={custom} onChange={update} /> : <div className="product-photo"><img src={imagePath(product.image)} alt={t("הדמיה להשראה עבור {0}", [t(product.title)])} /><p className="fine-print">{t("הדמיית קטגוריה מקורית להשראה. אינה צילום מוצר קיים.")}</p></div>}<div className="product-promises"><span><Heart size={17} />{t("נגיעה אישית")}</span><span><ShieldCheck size={17} />{t("עיצוב בתיאום")}</span><span><Truck size={17} />{t("אספקה בתיאום")}</span></div></div><div className="product-information"><span className="eyebrow" dir="auto">{t("MADE PERSONAL, MADE FOR YOU")}</span><h1>{t(product.title)}</h1><p className="product-description">{t(product.description)}</p><div className="product-price">{product.price === null ? t('מחיר לפי התאמה אישית') : `₪${product.price}`}<span>{t("נכין לכם הצעת מחיר לפי הבקשה.")}</span></div>{product.category === 'boxes' && <Link className="builder-callout" to="/gift-builder"><Sparkles size={19} />{t("רוצים לבחור מה נכנס למארז? בונים אותו כאן")}<ArrowLeft size={17} /></Link>}<div className="personalize-title"><span>01</span><h2>{t("עכשיו, הנגיעה שלכם")}</h2><button className="icon-button" title={t("איפוס העיצוב")} aria-label={t("איפוס העיצוב")} onClick={() => update(blankPersonalization())}><RotateCcw size={16} /></button></div><CustomizationForm product={product} value={custom} onChange={update} />{errors.length > 0 && <div className="form-error" role="alert">{errors.map(e => <p key={e}>{localizeError(e)}</p>)}</div>}<div className="product-actions"><button className="button dark" onClick={() => {
            if (validate()) addItem({
              productId: product.id,
              custom
            });
          }}><Plus size={18} />{t("הוספה לסל הפניות")}</button><button className="favorite-button standalone" aria-label={t("שמירה למועדפים")} aria-pressed={favorites.includes(product.id)} onClick={() => toggleFavorite(product.id)}><Heart size={21} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} /></button></div><button className="button outline full" onClick={() => {
          if (validate()) setReview(true);
        }}>{t("בדיקת הבקשה ושליחה ב־WhatsApp")}<ArrowLeft size={17} /></button>{review && <Inquiry items={[{
          id: 'product-review',
          productId: product.id,
          custom
        }]} />}<details className="info-detail"><summary>{t("הכנה, איסוף ומשלוח")}</summary><p>{t(studio.productionTime) || t('זמן ההכנה יימסר בהצעת המחיר, לאחר בדיקת המוצר והעיצוב.')}</p><p>{t(studio.delivery)}</p></details><details className="info-detail"><summary>{t("אישור העיצוב וההתאמה האישית")}</summary><p>{t("התצוגה היא הדמיה בלבד. הסטודיו יתאם איתכם את האפשרויות הזמינות, מחיר, התאמת הקבצים והעיצוב הסופי לפני אישור ההזמנה.")}</p></details></div></div><section className="section"><SectionHeading eyebrow={t("A LITTLE MORE INSPIRATION")} title={t("אולי תאהבו גם")} /><div className="product-grid">{products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}</div></section></div>;
}
export default function Product() {
  const {
    productId
  } = useParams();
  const product = productById(productId || '');
  if (!product) return <div className="container"><EmptyState title={t("לא מצאנו את המוצר הזה")} description={t("יש עוד הרבה רעיונות יפים בקטלוג.")} /></div>;
  return <ProductEditor key={product.id} product={product} />;
}
