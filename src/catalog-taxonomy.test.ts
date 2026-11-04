import { describe, expect, it } from 'vitest';
import { allProducts, isPackagingProduct, personalizationNameLabel, productById, productFields, products, supportsPhoto } from './catalog';
import { catalogCategories, catalogChildren, catalogPath, catalogRoots, catalogTrail, inCatalogCategory, resolveCatalogPath } from './catalog-taxonomy';
import { blankPersonalization, customizationLines, filterProducts } from './order';
import { translate } from './i18n';

describe('nested catalog browsing', () => {
  it('shows all printing descendants, then only the requested branch or product type', () => {
    const browse = (category: string) => filterProducts(products,'',category,'',false).map(p => p.id);
    expect(catalogChildren('printing').map(node => node.id)).toEqual(['printing-boards','printing-paper','printing-products']);
    for (const branch of catalogChildren('printing')) {
      expect(browse(branch.id).length).toBeGreaterThan(0);
      expect(browse('printing')).toEqual(expect.arrayContaining(browse(branch.id)));
    }
    expect(browse('board-wood')).toEqual(['boards-wood-1']);
    expect(browse('printing-boards')).toContain('prints-2');
    expect(browse('printing-paper')).not.toContain('prints-2');
    expect(browse('product-phone-cases')).toEqual(['cases-1','cases-2','cases-3','cases-4','cases-5']);
    expect(browse('printing')).toContain('stationery-1');
    expect(browse('printing').filter(id => id === 'stationery-1')).toHaveLength(1);
  });
  it('keeps ready-made mugs and notebooks separate from customizable products', () => {
    expect(inCatalogCategory(productById('mugs-1')!, 'mugs-ready')).toBe(false);
    expect(inCatalogCategory(productById('mugs-6')!, 'mugs-ready')).toBe(true);
    expect(inCatalogCategory(productById('notebooks-ready-1')!, 'notebooks-ready')).toBe(true);
    expect(inCatalogCategory(productById('stationery-1')!, 'notebooks-custom')).toBe(true);
    expect(inCatalogCategory(productById('stationery-1')!, 'notebooks-ready')).toBe(false);
  });
  it('supports direct links, ancestor breadcrumbs, and old category links', () => {
    expect(catalogPath('board-wood')).toBe('/category/printing/boards/wood');
    expect(catalogTrail('board-wood').map(node => node.id)).toEqual(['printing','printing-boards','board-wood']);
    for (const node of catalogCategories) expect(resolveCatalogPath(catalogPath(node.id).replace('/category/',''))?.id).toBe(node.id);
    expect(resolveCatalogPath('stationery')?.id).toBe('notebooks');
    expect(resolveCatalogPath('cases')?.id).toBe('product-phone-cases');
    for (const invalid of ['printing/wood','mugs/boards','printing/boards/nope','unknown']) expect(resolveCatalogPath(invalid)).toBeUndefined();
    expect(new Set(catalogCategories.map(node => catalogPath(node.id))).size).toBe(catalogCategories.length);
  });
  it('populates every category in the supplied list with no orphaned assignments', () => {
    expect(catalogRoots).toHaveLength(11);
    expect(catalogChildren('printing-products')).toHaveLength(14);
    for (const category of catalogCategories) expect(products.some(p => inCatalogCategory(p,category.id)), category.id).toBe(true);
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
    for (const locale of ['ar','he','en'] as const) expect(filterProducts(products,translate('طباعات على ألواح',locale),'','',false)).toContain(productById('boards-wood-1'));
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
