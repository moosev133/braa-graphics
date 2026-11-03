import { t } from "./i18n";
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Plus, MessageCircle, Sparkles } from 'lucide-react';
import { categoryById, imagePath, studio, type Product } from './catalog';
import { useStore } from './state';
import { whatsappUrl } from './order';
import type { CSSProperties, ReactNode } from 'react';
export function Wordmark({
  footer = false
}: {
  footer?: boolean;
}) {
  return <span className={`wordmark ${footer ? 'footer-wordmark' : ''}`} dir="ltr">{studio.logo ? <img src={studio.logo} alt="BRAA GRAPHIX" /> : <><b>BRAA<span>GRAPHIX</span><i>✳</i></b><small>INSPIRE AND CAPTIVATE</small></>}</span>;
}
export function WhatsAppLink({
  message,
  children,
  className = 'button dark'
}: {
  message: string;
  children?: ReactNode;
  className?: string;
}) {
  return <a className={className} href={whatsappUrl(message)} target="_blank" rel="noreferrer"><MessageCircle size={18} />{children || t('בואו נדבר ב־WhatsApp')}</a>;
}
export function ProductCard({
  product
}: {
  product: Product;
}) {
  const {
    favorites,
    toggleFavorite
  } = useStore();
  const category = categoryById(product.category)!;
  return <article className="product-card"><div className="product-image" style={{
      '--card-bg': category.color
    } as CSSProperties}>
    <Link to={`/product/${product.id}`} tabIndex={-1} aria-hidden="true"><img src={imagePath(product.image)} alt="" loading="lazy" width="600" height="600" /></Link>
    <button className={`favorite-button ${favorites.includes(product.id) ? 'selected' : ''}`} aria-label={`${favorites.includes(product.id) ? t('הסרת') : t('שמירת')} ${t(product.title)} ${favorites.includes(product.id) ? t('מהמועדפים') : t('למועדפים')}`} aria-pressed={favorites.includes(product.id)} onClick={() => toggleFavorite(product.id)}><Heart size={18} /></button>
    {product.isNew && <span className="product-badge">{t("נגיעה אישית ")}<Sparkles size={12} /></span>}
    <span className="demo-label">{t("הדמיה להשראה")}</span>
    <Link className="product-quick" to={`/product/${product.id}`} aria-label={t("לעיצוב {0}", [t(product.title)])}><Plus size={20} /></Link>
  </div><div className="product-meta"><span>{t(category.short)}</span><span>{product.price === null ? t('מחיר לפי התאמה') : `₪${product.price}`}</span></div><Link className="product-title" to={`/product/${product.id}`}>{t(product.title)}</Link></article>;
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  label
}: {
  eyebrow: string;
  title: string;
  description?: string;
  link?: string;
  label?: string;
}) {
  return <div className="section-heading"><div><span className="eyebrow" dir="auto">{t(eyebrow)}</span><h2>{t(title)}</h2>{description && <p>{t(description)}</p>}</div>{link && <Link className="text-link" to={link}>{t(label) || t('לכל המוצרים')}<ArrowLeft size={18} /></Link>}</div>;
}
export function EmptyState({
  title,
  description,
  to = '/catalog',
  label = 'לגלות את הקטלוג'
}: {
  title: string;
  description: string;
  to?: string;
  label?: string;
}) {
  return <div className="empty-state"><Sparkles size={42} /><h2>{t(title)}</h2><p>{t(description)}</p><Link to={to} className="button dark">{t(label)}<ArrowLeft size={18} /></Link></div>;
}
export function Breadcrumbs({
  items
}: {
  items: {
    label: string;
    to?: string;
  }[];
}) {
  return <nav className="breadcrumbs" aria-label={t("פירורי לחם")}><Link to="/">{t("בית")}</Link>{items.map((item, i) => <span key={i}><span className="crumb-divider">/</span>{item.to ? <Link to={item.to}>{t(item.label)}</Link> : t(item.label)}</span>)}</nav>;
}
export function PageHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return <div className="page-heading"><span className="eyebrow" dir="auto">{t(eyebrow)}</span><h1>{t(title)}</h1>{description && <p>{t(description)}</p>}</div>;
}
