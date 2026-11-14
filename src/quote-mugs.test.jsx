import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter, Route, Routes } from 'react-router-dom';
import Catalog from './CatalogPage';
import ProductPage from './Product';
import { StoreProvider } from './state';
import { imagePath, products, supportsPhoto } from './catalog';
import { filterProducts, blankPersonalization, inquiryMessage } from './order';
import { quoteMugs } from './quote-mugs';
import { setLocale } from './i18n';
import manifest from '../docs/quote-mugs-images.json';

function renderPage(path) {
  return renderToStaticMarkup(<StaticRouter location={path}><StoreProvider><Routes><Route path="/category/*" element={<Catalog />} /><Route path="/product/:productId" element={<ProductPage />} /></Routes></StoreProvider></StaticRouter>);
}

describe('user-supplied quote mugs', () => {
  it('includes all 13 original JPEGs in Cups and Quote mugs, without changing their bytes', () => {
    const collection = filterProducts(products,'','mugs-quotes','',false);
    expect(collection).toHaveLength(13);
    expect(new Set(collection.map(p => p.image)).size).toBe(13);
    const cups = filterProducts(products,'','mugs','',false);
    for (const product of collection) {
      expect(cups).toContain(product);
      const file = manifest.find(item => item.file === 'public'+imagePath(product.image));
      expect(file).toBeDefined();
      const bytes = readFileSync(file.file);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256);
      expect(bytes.subarray(0,2).toString('hex')).toBe('ffd8');
      expect(supportsPhoto(product)).toBe(false);
    }
  });
  it('renders the complete collection and shows the supplied photo first on product pages', () => {
    setLocale('ar');
    const html = renderPage('/category/mugs/quotes');
    expect((html.match(/class="product-card"/g) || []).length).toBe(13);
    expect(html).toContain('أكواب جمل');
    expect(html).not.toContain('class="demo-label"');
    for (const product of quoteMugs) expect(html).toContain(imagePath(product.image));
    const page = renderPage('/product/quote-mug-01');
    expect(page).toContain('class="product-photo"');
    expect(page).toContain('class="active"><svg');
    expect(page).toContain('/images/quote-mugs/01.jpg');
    expect(page).toContain('صورة المنتج');
    expect(page).not.toContain('class="design-preview');
    expect(page).not.toContain('type="file"');
  });
  it('keeps the chosen design identifiable in Arabic, Hebrew, and English inquiries', () => {
    for (const locale of ['ar','he','en']) {
      const message = inquiryMessage([{id:'test',productId:'quote-mug-13',custom:{...blankPersonalization(),name:'نور & Alex'}}],'BG-QUOTE','',locale);
      expect(message).toContain('نور & Alex');
      expect(message).toContain('BG-QUOTE');
      expect(message).not.toContain('undefined');
    }
  });
});
