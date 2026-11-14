import { catalogRoots, catalogPath, inCatalogCategory } from './catalog-taxonomy';
import { t } from "./i18n";
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Gift, Heart, Palette, Package, Sparkles, Instagram, Pause, Play, PenLine } from 'lucide-react';
import { featuredIds, imagePath, products, studio } from './catalog';
import { ProductCard, SectionHeading } from './components';
const slides = [
  { label:'A LITTLE LIGHT. A LOT OF JOY.', title:'دفء ولحظات جميلة.', text:'شموع Country Candles', image:'country-candles/01.jpg', to:'/category/candles/country-candles', button:'اكتشفوا الشموع', color:'#EAE2F3' },
  { label:'YOUR EVERYDAY FAVORITES.', title:'تصاميم ترافق يومكم.', text:'اختاروا من منتجاتنا وأضيفوا إهداءً لمن تحبّون.', image:'ready-mugs/01.jpg', to:'/category/mugs/ready', button:'اكتشفوا الأكواب الجاهزة', color:'#F6E2E5' },
  { label:'WORDS TO MAKE YOU SMILE.', title:'كلمة جميلة مع كل رشفة.', text:'اختاروا من منتجاتنا وأضيفوا إهداءً لمن تحبّون.', image:'quote-mugs/06.jpg', to:'/category/mugs/quotes', button:'اكتشفوا أكواب جمل', color:'#F3E6D6' },
  { label:'A LITTLE COLOR, EVERY DAY.', title:'قناني ستانلي بألوان تحبّونها.', text:'اختاروا من منتجاتنا وأضيفوا إهداءً لمن تحبّون.', image:'stanley-bottles/03.jpg', to:'/category/mugs/stanley', button:'اكتشفوا قناني ستانلي', color:'#FAEBD4' }
];
function Promotions() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const touchStart = useRef(0);
  const [reduced] = useState(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const slide = slides[index];
  const advance = (amount: number) => setIndex(i => (i + amount + slides.length) % slides.length);
  useEffect(() => {
    if (paused || hover || reduced) return;
    const timer = setInterval(() => setIndex(i => (i + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [paused, hover, reduced]);
  return <section className="promo-section container" aria-roledescription={t("קרוסלה")} aria-label={t("רעיונות למתנות")} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocusCapture={() => setHover(true)} onBlurCapture={e => {
    if (!e.currentTarget.contains(e.relatedTarget)) setHover(false);
  }} onPointerDown={e => touchStart.current = e.clientX} onPointerUp={e => {
    const dx = e.clientX - touchStart.current;
    if (Math.abs(dx) > 50) advance(dx > 0 ? 1 : -1);
  }}><div className="promo" style={{
      background: slide.color
    }}><div className="promo-copy" key={index}><span className="eyebrow" dir="auto">{t(slide.label)}</span><h2>{t(slide.title)}</h2><p>{t(slide.text)}</p><Link className="button dark" to={slide.to}>{t(slide.button)}<ArrowLeft size={18} /></Link></div><Link draggable={false} onDragStart={e => e.preventDefault()} className="promo-image" to={slide.to} aria-label={t(slide.button)}><img draggable={false} src={imagePath(slide.image)} alt={t(slide.title)} loading="lazy" /><span className="round-sticker">{t("packed")}<br /><i>{t("with love")}</i><Heart size={18} /></span></Link><div className="carousel-controls"><button className="icon-button" aria-label={t("המבצע הקודם")} onClick={() => advance(-1)}><ChevronRight size={17} /></button>{slides.map((s, i) => <button className={`dot ${i === index ? 'active' : ''}`} key={s.to} aria-label={t("שקופית {0}: {1}", [i + 1, t(s.button)])} aria-current={i === index ? 'true' : undefined} onClick={() => setIndex(i)} />)}<button className="icon-button" aria-label={t("המבצע הבא")} onClick={() => advance(1)}><ChevronLeft size={17} /></button><button className="icon-button" aria-label={paused ? t('הפעלת סבב שקופיות') : t('עצירת סבב שקופיות')} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button></div></div></section>;
}
export default function Home() {
  return <>
  <section className="hero container"><div className="hero-copy"><div className="hero-kicker"><span />{t("דברים יפים. אנשים אהובים.")}</div><h1>{t("הופכים רעיונות")}<br />{t("למתנות ")}<span className="highlight">{t("מיוחדות")}<svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path d="M4 11 Q 145 -2 294 10 M30 17 Q150 5 275 15" /></svg></span><span className="heading-spark">✳</span></h1><p>{t("עיצובים אישיים, מתנות מרגשות והדפסות יצירתיות.")}<br />{t("קצת דמיון, הרבה אהבה — ובדיוק אתם.")}</p><div className="hero-actions"><Link className="button berry" to="/catalog">{t("לגלות את הקולקציה")}<ArrowLeft size={18} /></Link><Link className="button outline" to="/gift-builder"><Gift size={18} />{t("בונים מתנה אישית")}</Link></div><div className="hero-footnote"><span className="tiny-star">✦</span>{t(" נוצר עם מחשבה. ניתן מכל הלב.")}</div></div><div className="hero-art"><img src={imagePath('ready-mugs/03.jpg')} alt={t("كوب قلوب وردي Beautiful")} loading="eager" width="1536" height="1024" /><div className="hero-badge" dir="ltr"><span>{t("MADE JUST")}</span><b>{t("for you")}</b><span>{t("WITH LOVE ♡")}</span></div><div className="hero-note"><span className="note-icon"><PenLine size={21} /></span><div><strong>{t("השם שלכם. הסיפור שלכם.")}</strong><span>{t("אנחנו נוסיף את הטאץ׳ האישי.")}</span></div><Sparkles size={21} /></div><span className="floating-spark">✧</span></div></section>
  <div className="brand-ribbon"><span>{t("מתנות עם משמעות ")}<Heart size={17} /></span><i>✳</i><span>{t("עיצוב שהוא רק שלכם ")}<Palette size={17} /></span><i>✳</i><span>{t("לכל רגע ששווה לחגוג ")}<Gift size={17} /></span><i>✳</i><span>{t("פרטים קטנים, אהבה גדולה ")}<Sparkles size={17} /></span></div>
  <section className="section container categories-section"><SectionHeading eyebrow={t("FIND YOUR LITTLE SOMETHING")} title={t("מה ישמח אתכם היום?")} description={t("רעיונות קטנים למתנות עם הרבה אישיות.")} link="/catalog" label={t("לכל הקטגוריות")} /><div className="category-grid">{catalogRoots.map(c => {
          const cover = products.find(p => inCatalogCategory(p,c.id));
          return <Link key={c.id} to={catalogPath(c.id)} className="category-card" style={{
            '--category-color': c.color
          } as CSSProperties}><div className="category-image">{cover ? <img src={imagePath(cover.image)} alt={t(c.short)} loading="lazy" width="400" height="400" /> : <Gift className="category-placeholder" size={68} strokeWidth={1} aria-hidden="true" />}<span><ArrowLeft size={18} /></span></div><h3>{t(c.short)}</h3></Link>;
        })}</div></section>
  <section className="section featured-section"><div className="container"><SectionHeading eyebrow={t("THE STUDIO EDIT")} title={t("המוצרים האהובים שלנו")} description={t("קצת השראה, לפני שמוסיפים את הנגיעה שלכם.")} link="/catalog" /><div className="product-grid">{featuredIds.map(id => <ProductCard key={id} product={products.find(p => p.id === id)!} />)}</div></div></section>
  <Promotions />
  <section className="section container how-section"><div className="how-intro"><span className="eyebrow" dir="auto">{t("FROM AN IDEA TO A LITTLE JOY")}</span><h2>{t("שלכם, בכל פרט.")}</h2><p>{t("אנחנו כאן כדי להפוך רעיון קטן")}<br />{t("למתנה שמרגישים.")}</p><span className="handdrawn-arrow">⤵</span></div><div className="how-grid">{[{
          icon: Gift,
          title: 'בוחרים משהו יפה',
          text: 'מוצר אהוב או מארז שאתם בונים.'
        }, {
          icon: PenLine,
          title: 'מוסיפים את עצמכם',
          text: 'שם, תמונה, הקדשה או רעיון.'
        }, {
          icon: Palette,
          title: 'מדייקים יחד',
          text: 'מתאמים עיצוב, מחיר ופרטים עם הסטודיו.'
        }, {
          icon: Heart,
          title: 'משמחים מישהו',
          text: 'מאשרים את ההזמנה ואת מועד האספקה.'
        }].map((step, i) => <div className="how-step" key={step.title}><div className={`step-icon tone-${i}`}><step.icon size={25} /><span>0{i + 1}</span></div><h3>{t(step.title)}</h3><p>{t(step.text)}</p></div>)}</div></section>
  <section className="section container"><SectionHeading eyebrow={t("FRESH FROM THE STUDIO")} title={t("חדש בסטודיו")} description={t("עוד רעיונות, עוד דרכים להעניק.")} link="/catalog?new=1" label={t("לכל הרעיונות החדשים")} /><div className="product-grid">{['country-candle-03', 'country-candle-09', 'ready-mug-06', 'stanley-bottle-04'].map(id => <ProductCard key={id} product={products.find(p => p.id === id)!} />)}</div></section>
  <section className="studio-section container"><div className="studio-art" aria-hidden="true"><div className="art-card art-card-1"><span>{t("your brand,")}</span><strong>{t("but make")}<br />{t("it ")}<i>{t("you.")}</i></strong><span className="art-star">✳</span></div><div className="art-card art-card-2"><span>BRAA<br />GRAPHIX</span><div className="palette-dots"><i /><i /><i /><i /></div><small>INSPIRE AND CAPTIVATE</small></div><span className="art-caption">{t("קומפוזיציית סטודיו להשראה")}</span></div><div className="studio-copy"><span className="eyebrow" dir="auto">{t("GOOD DESIGN. GREAT FEELING.")}</span><h2>{t("יש לכם רעיון?")}<br />{t("ניתן לו צורה.")}</h2><p>{t("ממיתוג עסק ועד להזמנה לחגיגה — עיצוב גרפי שמתחיל בסיפור שלכם ומגיע עד לפרט הקטן.")}</p><Link className="text-link" to="/services">{t("מגלים את שירותי העיצוב")}<ArrowLeft size={18} /></Link></div></section>
  <section className="section container instagram-section"><SectionHeading eyebrow={t("A LITTLE MORE OF OUR WORLD")} title={t("קצת צבע בפיד שלכם")} description={t("صور من مجموعتنا")} /><a className="instagram-handle" href={studio.instagram} target="_blank" rel="noreferrer"><Instagram size={19} /><span dir="ltr">@braagraphix</span><ArrowLeft size={17} /></a><div className="instagram-grid">{['ready-mug-01','stanley-bottle-01','country-candle-09','quote-mug-10'].map(id => {
    const product = products.find(p => p.id === id)!;
    return <a href={studio.instagram} target="_blank" rel="noreferrer" key={id} aria-label={t("לביקור ב־Instagram של BRAA GRAPHIX")}><img src={imagePath(product.image)} alt={t(product.title)} loading="lazy" /><Instagram size={24} /></a>;
  })}</div></section>
  <section className="closing-note"><Sparkles size={23} /><p>{t("המתנות הכי יפות מתחילות ב")}<span>{t("מחשבה על מישהו.")}</span></p><Link to="/gift-builder">{t("על מי אתם חושבים היום?")}<ArrowLeft size={17} /></Link></section>
  </>;
}
