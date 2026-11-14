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
import { stanleyBottles } from './stanley-bottles';
import { readyMugs } from './ready-mugs';
import { countryCandles } from './country-candles';
import { setLocale } from './i18n';
import quoteManifest from '../docs/quote-mugs-images.json';
import stanleyManifest from '../docs/stanley-bottles-images.json';
import readyManifest from '../docs/ready-mugs-images.json';
import candleManifest from '../docs/country-candles-images.json';

function renderPage(path) {
  return renderToStaticMarkup(<StaticRouter location={path}><StoreProvider><Routes><Route path="/category/*" element={<Catalog />} /><Route path="/product/:productId" element={<ProductPage />} /></Routes></StoreProvider></StaticRouter>);
}

describe.each([
  {name:'quote mugs', category:'mugs-quotes', slug:'quotes', title:'أكواب جمل', items:quoteMugs, manifest:quoteManifest},
  {name:'Stanley tumblers', category:'mugs-stanley', slug:'stanley', title:'قناني ستانلي', items:stanleyBottles, manifest:stanleyManifest},
  {name:'ready-made cups', category:'mugs-ready', slug:'ready', title:'أكواب جاهزة', items:readyMugs, manifest:readyManifest},
  {name:'Country Candles', category:'candles-country', parent:'candles', slug:'country-candles', title:'Country Candles', items:countryCandles, manifest:candleManifest},
])('user-supplied $name', ({category,slug,title,items,manifest,parent='mugs'}) => {
  it('includes every original JPEG in its parent and own subcategory without changing their bytes', () => {
    const collection = filterProducts(products,'',category,'',false);
    expect(collection.map(p => p.id)).toEqual(items.map(p => p.id));
    const suppliedPhotos = collection.filter(p => p.imageKind === 'provided');
    expect(suppliedPhotos).toHaveLength(manifest.length);
    expect(new Set(suppliedPhotos.map(p => p.image)).size).toBe(manifest.length);
    const cups = filterProducts(products,'',parent,'',false);
    for (const product of suppliedPhotos) {
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
    const html = renderPage('/category/'+parent+'/'+slug);
    expect((html.match(/class="product-card"/g) || []).length).toBe(items.length);
    expect(html).toContain(title);
    expect((html.match(/class="demo-label"/g) || []).length).toBe(0);
    for (const product of items) expect(html).toContain(imagePath(product.image));
    const cups = renderPage('/category/'+parent);
    expect(cups).toContain('href="/category/'+parent+'/'+slug+'"');
    const page = renderPage('/product/'+items[0].id);
    expect(page).toContain('class="product-photo"');
    expect(page).toContain('class="active"><svg');
    expect(page).toContain(imagePath(items[0].image));
    expect(page).toContain('صورة المنتج');
    expect(page).not.toContain('class="design-preview');
    expect(page).not.toContain('type="file"');
  });
  it('keeps the chosen design identifiable in Arabic, Hebrew, and English inquiries', () => {
    for (const locale of ['ar','he','en']) {
      const message = inquiryMessage([{id:'test',productId:items.at(-1).id,custom:{...blankPersonalization(),name:'نور & Alex'}}],'BG-PHOTO','',locale);
      expect(message).toContain('نور & Alex');
      expect(message).toContain('BG-PHOTO');
      expect(message).not.toContain('undefined');
    }
  });
});
