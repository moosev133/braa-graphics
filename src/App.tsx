import LanguageSwitcher from './LanguageSwitcher';
import { t, useLocale } from "./i18n";
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Instagram, Menu, MessageCircle, Search, ShoppingBag, Sparkles, X } from 'lucide-react';
import Home from './Home';
import Catalog from './CatalogPage';
import Product from './Product';
import GiftBuilder from './GiftBuilder';
import Basket from './Basket';
import { About, Contact, Portfolio, Privacy, Services } from './Studio';
import { EmptyState, Wordmark } from './components';
import { studio } from './catalog';
import { whatsappUrl } from './order';
import { clearPrivateData } from './storage';
import { useStore } from './state';
const nav = [{
  to: '/',
  label: "בית"
}, {
  to: '/catalog',
  label: "הקולקציה"
}, {
  to: '/gift-builder',
  label: "בונים מתנה"
}, {
  to: '/services',
  label: "עיצוב גרפי"
}, {
  to: '/category/events',
  label: "חוגגים רגעים"
}, {
  to: '/about',
  label: "הסטודיו"
}];
function Entrance() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem('braa-entered') && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  });
  useEffect(() => {
    if (!show) return;
    sessionStorage.setItem('braa-entered', 'yes');
    const timer = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(timer);
  }, [show]);
  return show ? <div className="entrance"><span className="entrance-flower">✳</span><Wordmark /><span className="entrance-subtitle">{t("דברים יפים מתחילים כאן.")}</span><button onClick={() => setShow(false)}>{t("דלגו פנימה")}<ArrowLeft size={15} /></button><i className="confetti confetti-a" /><i className="confetti confetti-b" /><i className="confetti confetti-c" /></div> : null;
}
function Header() {
  const {
    basket,
    favorites
  } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dialog = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    if (!menu) return;
    const previous = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLElement>('button')?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenu(false);
      if (e.key === 'Tab') {
        const items = dialog.current?.querySelectorAll<HTMLElement>('a,button,select');
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', key);
      previous?.focus();
    };
  }, [menu]);
  return <><div className="announcement"><Sparkles size={13} /><span>{t("מתנה קטנה. מחשבה גדולה. נגיעה שהיא רק שלכם.")}</span><Sparkles size={13} /><div className="announcement-language"><LanguageSwitcher /></div></div><header className="site-header"><div className="header-inner container"><Link to="/" className="brand-link" aria-label={t("BRAA GRAPHIX — לדף הבית")}><Wordmark /></Link><nav className="desktop-nav" aria-label={t("ניווט ראשי")}>{nav.map(link => <NavLink key={link.to} to={link.to} end={link.to === '/'}>{t(link.label)}</NavLink>)}</nav><div className="header-actions"><LanguageSwitcher /><button className="icon-button" aria-label={t("חיפוש מוצרים")} aria-expanded={search} onClick={() => setSearch(!search)}><Search size={20} /></button><Link className="icon-button" to="/favorites" aria-label={t("מועדפים, {0} פריטים", [favorites.length])}><Heart size={20} />{favorites.length > 0 && <span className="count-badge">{favorites.length}</span>}</Link><Link className="icon-button" to="/basket" aria-label={t("סל פניות, {0} פריטים", [basket.length])}><ShoppingBag size={20} />{basket.length > 0 && <span className="count-badge">{basket.length}</span>}</Link><a className="header-instagram icon-button" href={studio.instagram} target="_blank" rel="noreferrer" aria-label={t("BRAA GRAPHIX ב־Instagram")}><Instagram size={19} /></a><Link className="header-contact" to="/contact">{t("דברו איתנו")}<ArrowLeft size={14} /></Link><button ref={menuButton} className="icon-button menu-button" aria-label={t("פתיחת תפריט")} aria-expanded={menu} onClick={() => setMenu(true)}><Menu size={23} /></button></div></div>{search && <form className="header-search container" onSubmit={e => {
        e.preventDefault();
        navigate(`/catalog?q=${encodeURIComponent(query)}`);
        setSearch(false);
      }}><Search size={20} /><input type="search" autoFocus aria-label={t("מה מחפשים?")} placeholder={t("ספל, מחברת, מארז…")} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => {
          if (e.key === 'Escape') setSearch(false);
        }} /><button type="submit" className="button dark">{t("לחפש")}<ArrowLeft size={16} /></button><button className="icon-button" type="button" aria-label={t("סגירת חיפוש")} onClick={() => setSearch(false)}><X size={19} /></button></form>}</header>{menu && <div className="menu-backdrop" onClick={() => setMenu(false)}><div ref={dialog} className="mobile-menu" role="dialog" aria-modal="true" aria-label={t("תפריט ניווט")} onClick={e => e.stopPropagation()}><div className="mobile-menu-top"><Wordmark /><button className="icon-button" aria-label={t("סגירת תפריט")} onClick={() => setMenu(false)}><X size={24} /></button></div><LanguageSwitcher mobile /><nav>{[...nav, {
            to: '/favorites',
            label: 'המועדפים שלי'
          }, {
            to: '/basket',
            label: 'סל הפניות'
          }, {
            to: '/contact',
            label: 'בואו נדבר'
          }].map(link => <NavLink key={link.to} to={link.to} end={link.to === '/'}>{t(link.label)}<ArrowLeft size={19} /></NavLink>)}</nav><span className="mobile-menu-note">{t("a little gift, a lot of love.")}</span></div></div>}</>;
}
function Footer() {
  const {
    toast
  } = useStore();
  return <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><Link to="/"><Wordmark footer /></Link><p>{t("עיצובים אישיים, מתנות מרגשות")}<br />{t("ודברים קטנים שעושים טוב בלב.")}</p><div className="footer-social"><a href={studio.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={21} /></a><a href={whatsappUrl(t('היי BRAA GRAPHIX, אשמח להתייעץ.'))} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={21} /></a></div></div><div><h3>{t("משהו יפה לתת")}</h3><Link to="/catalog">{t("הקולקציה המלאה")}</Link><Link to="/gift-builder">{t("בונים מתנה אישית")}</Link><Link to="/category/events">{t("הדפסות לאירועים")}</Link><Link to="/favorites">{t("הרעיונות ששמרתם")}</Link></div><div><h3>{t("קצת עלינו")}</h3><Link to="/about">{t("על הסטודיו")}</Link><Link to="/services">{t("שירותי עיצוב גרפי")}</Link><Link to="/portfolio">{t("תיק עבודות")}</Link><Link to="/contact">{t("דברו איתנו")}</Link></div><div className="footer-contact"><h3>{t("בואו ניצור משהו ביחד")}</h3><a href={`tel:${studio.phone}`} dir="ltr">{studio.phone}</a><a href={studio.instagram} target="_blank" rel="noreferrer" dir="ltr">@braagraphix <Instagram size={15} /></a><p>{t("מתנה עם מחשבה מתחילה בשיחה.")}</p></div></div><div className="container footer-bottom"><span dir="ltr">© {new Date().getFullYear()}{t(" BRAA GRAPHIX. Made with love.")}</span><Link to="/privacy">{t("פרטיות ומידע")}</Link><button onClick={async () => {
        if (confirm(t('למחוק מהמכשיר את כל התמונות, המועדפים, סל הפניות והטיוטות של האתר?'))) {
          try {
            await clearPrivateData();
            window.location.reload();
          } catch {
            toast('לא ניתן להשלים את המחיקה. אפשר לנקות את נתוני האתר דרך הגדרות הדפדפן.');
          }
        }
      }}>{t("מחיקת הנתונים מהמכשיר")}</button></div></footer>;
}
function RouteEffects() {
  const locale = useLocale();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);
  useEffect(() => {
    const pageNames: Record<string, string> = {
      '/': 'מתנות עם מחשבה',
      '/catalog': 'הקולקציה',
      '/gift-builder': 'בונים מתנה אישית',
      '/services': 'עיצוב גרפי',
      '/basket': 'סל הפניות',
      '/favorites': 'המועדפים שלי',
      '/about': 'הסטודיו',
      '/contact': 'דברו איתנו'
    };
    const canonicalUrl = new URL(location.pathname, 'https://braa-graphics.meliodasin14.chatgpt.site').href;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.title = `${t(pageNames[location.pathname] || 'עיצוב ומתנות אישיות')} · BRAA GRAPHIX`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('תיאור האתר'));
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('תיאור האתר'));
  }, [location.pathname, locale]);
  return null;
}
export default function App() {
  useLocale();
  return <><a className="skip-link" href="#main">{t("דילוג לתוכן")}</a><Entrance /><RouteEffects /><Header /><main id="main" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/catalog" element={<Catalog />} /><Route path="/category/:categoryId" element={<Catalog />} /><Route path="/favorites" element={<Catalog favoritesOnly />} /><Route path="/product/:productId" element={<Product />} /><Route path="/gift-builder" element={<GiftBuilder />} /><Route path="/services" element={<Services />} /><Route path="/portfolio" element={<Portfolio />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/basket" element={<Basket />} /><Route path="/privacy" element={<Privacy />} /><Route path="*" element={<div className="container"><EmptyState title={t("נראה שהלכנו קצת לאיבוד")} description={t("בואו נחזור לדברים היפים.")} to="/" label={t("בחזרה לבית")} /></div>} /></Routes></main><Footer /><a className="floating-whatsapp" href={whatsappUrl(t('היי BRAA GRAPHIX, אשמח לעזרה בבחירת מתנה.'))} target="_blank" rel="noreferrer" aria-label={t("בואו נדבר ב־WhatsApp")}><MessageCircle size={25} /><span>{t("אפשר לעזור?")}</span></a></>;
}
