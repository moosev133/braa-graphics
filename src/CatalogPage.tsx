import { t, useLocale } from "./i18n";
import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, categoryById, matchesRequestedOptions, occasions, productFields, products, type Product } from './catalog';
import { filterProducts } from './order';
import { Breadcrumbs, EmptyState, PageHeading, ProductCard } from './components';
import { useStore } from './state';
export default function Catalog({
  favoritesOnly = false
}: {
  favoritesOnly?: boolean;
}) {
  const locale = useLocale();
  const {
    categoryId
  } = useParams();
  const [params, setParams] = useSearchParams();
  const {
    favorites
  } = useStore();
  const category = categoryById(categoryId || '');
  const query = params.get('q') || '';
  const selectedCategory = categoryId || params.get('category') || '';
  const occasion = params.get('occasion') || '';
  const newOnly = params.get('new') === '1';
  const sort = params.get('sort') || 'recommended';
  const [showFilters, setShowFilters] = useState(false);
  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);else next.delete(key);
    setParams(next, {
      replace: true
    });
  };
  const relevantCategory = categoryById(selectedCategory);
  const optionFilters = relevantCategory ? relevantCategory.fields.filter(f => f.type === 'select' && !['brand', 'model', 'scent'].includes(f.key)) : [];
  const requestedOptions = Object.fromEntries(Array.from(params.entries()).filter(([key]) => key.startsWith('option.')).map(([key, value]) => [key.slice(7), value]));
  const visible = useMemo(() => {
    let list = filterProducts(products.filter(p => !favoritesOnly || favorites.includes(p.id)), query, selectedCategory, occasion, newOnly);
    if (params.get('kind')) list = list.filter(p => p.id === params.get('kind'));
    list = list.filter(p => matchesRequestedOptions(p, requestedOptions));
    if (sort === 'name') list = [...list].sort((a, b) => t(a.title).localeCompare(t(b.title), locale));
    if (sort === 'new') list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return list;
  }, [favoritesOnly, favorites, query, selectedCategory, occasion, newOnly, sort, params, locale]);
  if (categoryId && !category) return <div className="container"><EmptyState title={t("הקטגוריה לא נמצאה")} description={t("בואו נמצא משהו יפה בקטלוג.")} /></div>;
  return <div className="container catalog-page"><Breadcrumbs items={[{
      label: favoritesOnly ? 'המועדפים שלי' : category?.title || 'כל המוצרים'
    }]} /><PageHeading eyebrow={favoritesOnly ? t('SAVED WITH LOVE') : t('A WORLD OF LITTLE JOYS')} title={favoritesOnly ? t('דברים ששמרתם בלב') : t(category?.title) || t('כל מה שיפה לתת')} description={favoritesOnly ? t('הרעיונות האהובים שלכם, במקום אחד.') : t(category?.description) || t('מוצאים את המתנה, מוסיפים את הסיפור שלכם.')} />
    {!favoritesOnly && <div className="category-tabs"><Link className={!selectedCategory ? 'active' : ''} to="/catalog">{t("הכול")}</Link>{categories.map(c => <Link className={selectedCategory === c.id ? 'active' : ''} key={c.id} to={`/category/${c.id}`}>{t(c.short)}</Link>)}</div>}
    <div className="catalog-toolbar"><label className="catalog-search"><Search size={19} /><input type="search" aria-label={t("חיפוש בקטלוג")} placeholder={t("איזו מתנה מחפשים?")} value={query} onChange={e => setParam('q', e.target.value)} /></label><button className={`button filter-toggle ${showFilters ? 'active' : ''}`} aria-expanded={showFilters} onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={17} />{t("סינון")}</button><label className="sort-label">{t("מיון")}<select aria-label={t("מיון מוצרים")} value={sort} onChange={e => setParam('sort', e.target.value)}><option value="recommended">{t("בחירת הסטודיו")}</option><option value="name">{t("לפי שם")}</option><option value="new">{t("חדש קודם")}</option></select></label></div>
    {showFilters && <div className="filter-panel">{!categoryId && <label>{t("קטגוריה")}<select value={selectedCategory} onChange={e => {
          const next = new URLSearchParams(params);
          next.set('category', e.target.value);
          next.delete('kind');
          setParams(next);
        }}><option value="">{t("כל הקטגוריות")}</option>{categories.map(c => <option key={c.id} value={c.id}>{t(c.short)}</option>)}</select></label>}<label>{t("לכבוד מה?")}<select value={occasion} onChange={e => setParam('occasion', e.target.value)}><option value="">{t("כל האירועים")}</option>{occasions.map(o => <option key={o} value={o}>{t(o)}</option>)}</select></label>{relevantCategory && <label>{t("סוג מוצר")}<select value={params.get('kind') || ''} onChange={e => setParam('kind', e.target.value)}><option value="">{t("כל הסוגים")}</option>{products.filter(p => p.category === selectedCategory).map(p => <option key={p.id} value={p.id}>{t(p.title)}</option>)}</select></label>}{optionFilters.map(field => <label key={field.key}>{t(field.label)}<select value={params.get(`option.${field.key}`) || ''} onChange={e => setParam(`option.${field.key}`, e.target.value)}><option value="">{t("כל האפשרויות")}</option>{Array.from(new Set(products.filter(p => p.category === selectedCategory).flatMap(p => productFields(p).find(f => f.key === field.key)?.options || []))).map(value => <option key={value} value={value}>{t(value)}</option>)}</select></label>)}<label className="check-label"><input type="checkbox" checked={newOnly} onChange={e => setParam('new', e.target.checked ? '1' : '')} />{t("רעיונות חדשים")}</label><button className="text-link" onClick={() => setParams({})}><X size={15} />{t("איפוס סינון")}</button></div>}
    <div className="catalog-count"><span>{visible.length}{t(" רעיונות למתנה")}</span><span>{t("התאמה אישית · מחיר וזמינות בתיאום")}</span></div>
    {visible.length ? <div className="product-grid catalog-grid">{visible.map((p: Product) => <ProductCard key={p.id} product={p} />)}</div> : <EmptyState title={favoritesOnly && !query ? t('עוד לא שמרתם משהו אהוב') : t('לא מצאנו בדיוק את זה')} description={favoritesOnly ? t('לחיצה על הלב ליד מוצר תשמור אותו כאן.') : t('נסו מילה אחרת או אפסו את המסננים.')} />}
    <p className="catalog-disclaimer">{t("הקטלוג מציג רעיונות להמחשה והתאמה אישית. התמונות הן הדמיות, והאפשרויות, המחיר והזמינות יאושרו עם הסטודיו.")}</p>
  </div>;
}
