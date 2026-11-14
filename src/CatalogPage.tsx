import { t, useLocale } from './i18n';
import { useMemo, useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { allProducts, matchesRequestedOptions, occasions, productFields, products, type Field } from './catalog';
import { catalogCategories, catalogCategoryById, catalogChildren, catalogPath, catalogRoots, catalogTrail, inCatalogCategory, legacyCategoryIds, resolveCatalogPath } from './catalog-taxonomy';
import { filterProducts } from './order';
import { Breadcrumbs, EmptyState, PageHeading, ProductCard } from './components';
import { useStore } from './state';

export default function Catalog({ favoritesOnly = false }: { favoritesOnly?: boolean }) {
  const locale = useLocale();
  const categoryPath = useParams()['*'];
  const [params, setParams] = useSearchParams();
  const { favorites } = useStore();
  const category = categoryPath ? resolveCatalogPath(categoryPath) : undefined;
  const filterCategory = params.get('category') || '';
  const selectedCategory = category?.id || legacyCategoryIds[filterCategory] || filterCategory;
  const selectedNode = catalogCategoryById(selectedCategory);
  const trail = catalogTrail(selectedCategory);
  const query = params.get('q') || '';
  const occasion = params.get('occasion') || '';
  const newOnly = params.get('new') === '1';
  const sort = params.get('sort') || 'recommended';
  const [showFilters, setShowFilters] = useState(false);
  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };
  const source = favoritesOnly ? allProducts.filter(p => favorites.includes(p.id)) : products;
  const categoryProducts = source.filter(p => inCatalogCategory(p, selectedCategory));
  const optionFilters = selectedNode ? Array.from(categoryProducts.reduce((fields, product) => {
    for (const field of productFields(product)) {
      if (field.type !== 'select' || ['brand', 'model', 'scent'].includes(field.key)) continue;
      const previous = fields.get(field.key);
      fields.set(field.key, { ...field, options: Array.from(new Set([...(previous?.options || []), ...(field.options || [])])) });
    }
    return fields;
  }, new Map<string, Field>()).values()) : [];
  const requestedOptions = Object.fromEntries(Array.from(params.entries()).filter(([key]) => key.startsWith('option.')).map(([key, value]) => [key.slice(7), value]));
  const visible = useMemo(() => {
    let list = filterProducts(source, query, selectedCategory, occasion, newOnly);
    if (params.get('kind')) list = list.filter(p => p.id === params.get('kind'));
    list = list.filter(p => matchesRequestedOptions(p, requestedOptions));
    if (sort === 'name') list = [...list].sort((a, b) => t(a.title).localeCompare(t(b.title), locale));
    if (sort === 'new') list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return list;
  }, [favoritesOnly, favorites, query, selectedCategory, occasion, newOnly, sort, params, locale]);

  if (categoryPath && !category) return <div className="container"><EmptyState title={t('הקטגוריה לא נמצאה')} description={t('בואו נמצא משהו יפה בקטלוג.')} /></div>;
  if (categoryPath && legacyCategoryIds[categoryPath] && category) return <Navigate replace to={catalogPath(category.id) + (params.size ? '?' + params.toString() : '')} />;
  const breadcrumbs = favoritesOnly ? [{ label: 'המועדפים שלי' }] : [
    { label: 'הקטלוג', to: category ? '/catalog' : undefined },
    ...trail.map((node, index) => ({ label: node.title, to: index < trail.length - 1 ? catalogPath(node.id) : undefined })),
  ];
  return <div className="container catalog-page">
    <Breadcrumbs items={breadcrumbs} />
    <PageHeading eyebrow={favoritesOnly ? 'SAVED WITH LOVE' : 'A WORLD OF LITTLE JOYS'} title={favoritesOnly ? 'דברים ששמרתם בלב' : selectedNode?.title || 'כל מה שיפה לתת'} description={favoritesOnly ? 'הרעיונות האהובים שלכם, במקום אחד.' : selectedNode?.description || 'מוצאים את המתנה, מוסיפים את הסיפור שלכם.'} />
    {!favoritesOnly && <>
      <nav className="category-tabs root-category-tabs" aria-label={t('تصفّح الأقسام')}>
        <Link className={!selectedCategory ? 'active' : ''} aria-current={!selectedCategory ? 'page' : undefined} to="/catalog">{t('كل المنتجات')}</Link>
        {catalogRoots.map(node => <Link className={trail[0]?.id === node.id ? 'active' : ''} aria-current={selectedCategory === node.id ? 'page' : undefined} key={node.id} to={catalogPath(node.id)}>{t(node.short)}</Link>)}
      </nav>
      {trail.filter(node => catalogChildren(node.id).length > 0).map(parent => <section className="subcategory-group" key={parent.id}>
        <h2>{t(parent.title)}</h2>
        <nav className="subcategory-tabs" aria-label={`${t('الأقسام الفرعية')}: ${t(parent.title)}`}>
          <Link to={catalogPath(parent.id)} className={selectedCategory === parent.id ? 'active' : ''} aria-current={selectedCategory === parent.id ? 'page' : undefined}>{t('الكل')}<span>{products.filter(p => inCatalogCategory(p,parent.id)).length}</span></Link>
          {catalogChildren(parent.id).map(child => <Link key={child.id} to={catalogPath(child.id)} className={trail.some(node => node.id === child.id) ? 'active' : ''} aria-current={selectedCategory === child.id ? 'page' : undefined}>{t(child.short)}<span>{products.filter(p => inCatalogCategory(p,child.id)).length}</span></Link>)}
        </nav>
      </section>)}
    </>}
    <div className="catalog-toolbar">
      <label className="catalog-search"><Search size={19} /><input type="search" aria-label={t('חיפוש בקטלוג')} placeholder={t('איזו מתנה מחפשים?')} value={query} onChange={e => setParam('q', e.target.value)} /></label>
      <button className={`button filter-toggle ${showFilters ? 'active' : ''}`} aria-expanded={showFilters} aria-controls="catalog-filters" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={17} />{t('סינון')}</button>
      <label className="sort-label">{t('מיון')}<select aria-label={t('מיון מוצרים')} value={sort} onChange={e => setParam('sort', e.target.value)}><option value="recommended">{t('בחירת הסטודיו')}</option><option value="name">{t('לפי שם')}</option><option value="new">{t('חדש קודם')}</option></select></label>
    </div>
    {showFilters && <div className="filter-panel" id="catalog-filters">
      {!categoryPath && <label>{t('קטגוריה')}<select value={selectedCategory} onChange={e => {
        const next = new URLSearchParams(params);
        if (e.target.value) next.set('category', e.target.value); else next.delete('category');
        next.delete('kind');
        Array.from(next.keys()).filter(key => key.startsWith('option.')).forEach(key => next.delete(key));
        setParams(next);
      }}><option value="">{t('כל הקטגוריות')}</option>{catalogCategories.map(node => <option key={node.id} value={node.id}>{catalogTrail(node.id).map(item => t(item.short)).join(' / ')}</option>)}</select></label>}
      <label>{t('לכבוד מה?')}<select value={occasion} onChange={e => setParam('occasion', e.target.value)}><option value="">{t('כל האירועים')}</option>{occasions.map(item => <option key={item} value={item}>{t(item)}</option>)}</select></label>
      {selectedNode && <label>{t('סוג מוצר')}<select value={params.get('kind') || ''} onChange={e => setParam('kind', e.target.value)}><option value="">{t('כל הסוגים')}</option>{categoryProducts.map(product => <option key={product.id} value={product.id}>{t(product.title)}</option>)}</select></label>}
      {optionFilters.map(field => <label key={field.key}>{t(field.label)}<select value={params.get(`option.${field.key}`) || ''} onChange={e => setParam(`option.${field.key}`, e.target.value)}><option value="">{t('כל האפשרויות')}</option>{field.options?.map(value => <option key={value} value={value}>{t(value)}</option>)}</select></label>)}
      <label className="check-label"><input type="checkbox" checked={newOnly} onChange={e => setParam('new', e.target.checked ? '1' : '')} />{t('רעיונות חדשים')}</label>
      <button className="text-link" onClick={() => setParams(categoryPath ? {} : selectedCategory ? {category:selectedCategory} : {})}><X size={15} />{t('איפוס סינון')}</button>
    </div>}
    <div className="catalog-count" aria-live="polite"><span>{t('{0} منتجات', [visible.length])}</span><span>{t('התאמה אישית · מחיר וזמינות בתיאום')}</span></div>
    {visible.length ? <div className="product-grid catalog-grid">{visible.map(product => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState title={favoritesOnly && !query ? t('עוד לא שמרתם משהו אהוב') : t('לא מצאנו בדיוק את זה')} description={favoritesOnly ? t('לחיצה על הלב ליד מוצר תשמור אותו כאן.') : t('נסו מילה אחרת או אפסו את המסננים.')} />}
    <p className="catalog-disclaimer">{t('تعرّفوا على المنتجات والتصاميم من خلال الصور. الصور التوضيحية مميّزة بوضوح، ويؤكّد الاستوديو التفاصيل والأسعار والتوفّر قبل الطلب.')}</p>
  </div>;
}
