import { describe, expect, it } from 'vitest';
import { allProducts, isPackagingProduct, personalizationNameLabel, productById, productFields, products, supportsPhoto } from './catalog';
import { catalogCategories, catalogChildren, catalogPath, catalogRoots, catalogTrail, inCatalogCategory, resolveCatalogPath } from './catalog-taxonomy';
import { blankPersonalization, customizationLines, filterProducts } from './order';
import { translate } from './i18n';

describe('nested catalog browsing', () => {
  it('shows all supplied cups and candles, then only the chosen subcategory', () => {
    const browse = (category: string) => filterProducts(products,'',category,'',false);
    expect(browse('mugs')).toHaveLength(30);
    expect(browse('mugs-quotes')).toHaveLength(13);
    expect(browse('mugs-ready')).toHaveLength(17);
    expect(browse('mugs-stanley')).toHaveLength(5);
    expect(browse('candles')).toHaveLength(18);
    expect(browse('candles')).toEqual([...browse('candles-country'),...browse('candles-crossroads')]);
    expect(browse('candles-crossroads')).toHaveLength(9);
    expect(browse('candles-country')).toHaveLength(9);
    expect(browse('printing')).toEqual([]);
    expect(browse('mugs-printing')).toEqual([]);
    expect(catalogChildren('printing').map(node => node.id)).toEqual(['printing-boards','printing-paper','printing-products']);
  });
  it('keeps Stanley independent from cups and preserves cup subcategories', () => {
    expect(inCatalogCategory(productById('quote-mug-01')!, 'mugs-ready')).toBe(false);
    expect(inCatalogCategory(productById('ready-mug-01')!, 'mugs-ready')).toBe(true);
    expect(inCatalogCategory(productById('stanley-bottle-01')!, 'mugs-stanley')).toBe(true);
    expect(inCatalogCategory(productById('stanley-bottle-01')!, 'mugs-quotes')).toBe(false);
    expect(inCatalogCategory(productById('stanley-bottle-01')!, 'mugs')).toBe(false);
    expect(catalogRoots.some(node=>node.id==='mugs-stanley')).toBe(true);
    expect(catalogChildren('mugs').map(node=>node.id)).not.toContain('mugs-stanley');
    expect(catalogTrail('mugs-stanley').map(node=>node.id)).toEqual(['mugs-stanley']);
  });
  it('supports direct links, ancestor breadcrumbs, and old category links', () => {
    expect(catalogPath('mugs-stanley')).toBe('/category/stanley');
    expect(resolveCatalogPath('mugs/stanley')?.id).toBe('mugs-stanley');
    expect(catalogPath('candles-crossroads')).toBe('/category/candles/crossroads-candles');
    expect(catalogPath('board-wood')).toBe('/category/printing/boards/wood');
    expect(catalogTrail('board-wood').map(node => node.id)).toEqual(['printing','printing-boards','board-wood']);
    for (const node of catalogCategories) expect(resolveCatalogPath(catalogPath(node.id).replace('/category/',''))?.id).toBe(node.id);
    expect(resolveCatalogPath('stationery')?.id).toBe('notebooks');
    expect(resolveCatalogPath('cases')?.id).toBe('product-phone-cases');
    for (const invalid of ['printing/wood','mugs/boards','printing/boards/nope','unknown']) expect(resolveCatalogPath(invalid)).toBeUndefined();
    expect(new Set(catalogCategories.map(node => catalogPath(node.id))).size).toBe(catalogCategories.length);
  });
  it('retains the requested category hierarchy without orphaned product assignments', () => {
    expect(catalogRoots).toHaveLength(12);
    expect(catalogChildren('printing-products')).toHaveLength(14);
    expect(catalogCategories).toHaveLength(50);
    expect(products.every(p => p.imageKind === 'provided')).toBe(true);
    for (const p of products) for (const id of p.catalogCategoryIds) expect(catalogCategories.some(node => node.id === id), id).toBe(true);
  });
  it('translates and searches new categories and products in all three languages', () => {
    const strings = [...catalogCategories.flatMap(node => [node.title,node.description]), ...products.flatMap(p => [p.title,p.description,...productFields(p).flatMap(f => [f.label,...(f.options || [])])])];
    for (const source of strings) for (const locale of ['ar','he','en'] as const) {
      const text = translate(source,locale);
      expect(text).not.toBe('');
      if (locale === 'en') expect(text,source).not.toMatch(/[\u0590-\u06ff]/);
      if (locale === 'ar') expect(text,source).not.toMatch(/[\u0590-\u05ff]/);
      if (locale === 'he') expect(text,source).not.toMatch(/[\u0600-\u06ff]/);
    }
    for (const locale of ['ar','he','en'] as const) expect(filterProducts(products,translate('قناني ستانلي',locale),'','',false)).toContain(productById('stanley-bottle-01'));
  });
});
describe('saved products and ready-made personalization', () => {
  it('keeps all 75 old product IDs available for stored drafts and baskets', () => {
    const oldIds: Record<string,number> = {mugs:6,stationery:6,albums:6,prints:6,candles:6,clothing:6,beauty:5,jewelry:6,cases:5,bottles:6,events:10,boxes:7};
    for (const [prefix,count] of Object.entries(oldIds)) for (let i=1;i<=count;i++) expect(productById(`${prefix}-${i}`)).toBeDefined();
    expect(new Set(allProducts.map(p=>p.id)).size).toBe(allProducts.length);
    expect(customizationLines('beauty-1',{...blankPersonalization(),name:'Owner text {0}'},'en').join('\n')).toContain('Owner text {0}');
  });
  it('places ready-made personalization on the card or wrapping without offering product photo printing', () => {
    for (const id of ['mugs-6','mugs-ready-1','notebooks-ready-1','incense-1','fragrances-1']) {
      const product=productById(id)!;
      expect(isPackagingProduct(product)).toBe(true);
      expect(supportsPhoto(product)).toBe(false);
      expect(productFields(product)).toEqual([]);
      expect(translate(personalizationNameLabel(product),'en')).toContain('gift card');
    }
    expect(supportsPhoto(productById('glass-cups-1')!)).toBe(true);
  });
});
