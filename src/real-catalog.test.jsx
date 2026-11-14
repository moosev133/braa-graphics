import { afterEach, describe, expect, it, vi } from 'vitest';
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Catalog from './CatalogPage';
import Product from './Product';
import GiftBuilder from './GiftBuilder';
import Basket from './Basket';
import { Preview } from './Editor';
import { StoreProvider } from './state';
import { products, productById } from './catalog';
import { blankGift, blankPersonalization, customizationLines } from './order';
import { setLocale, translate } from './i18n';

afterEach(() => { vi.unstubAllGlobals(); setLocale('ar'); });
function renderPage(path, saved={}) {
  vi.stubGlobal('localStorage', {getItem:key => {
    const name=key.replace('braa-graphix:v1:','');
    return name in saved ? JSON.stringify(saved[name]) : null;
  }});
  return renderToStaticMarkup(<StaticRouter location={path}><StoreProvider><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/catalog" element={<Catalog />} />
    <Route path="/favorites" element={<Catalog favoritesOnly />} />
    <Route path="/category/*" element={<Catalog />} />
    <Route path="/product/:productId" element={<Product />} />
    <Route path="/gift-builder" element={<GiftBuilder />} />
    <Route path="/basket" element={<Basket />} />
  </Routes></StoreProvider></StaticRouter>);
}
function imageSources(html) {
  return [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]);
}
const allowedImages = new Set(products.map(p => '/images/'+p.image));

describe('real product catalog and simplified card fields', () => {
  it('ships only the 44 supplied photos and renders no demo images across public pages', () => {
    const files = readdirSync('public/images',{recursive:true}).filter(file => /\.(jpg|webp|png)$/i.test(file));
    expect(files).toHaveLength(44);
    const metadata=readFileSync('index.html','utf8');
    expect(metadata).toContain('/images/ready-mugs/03.jpg');
    expect(metadata).not.toContain('.webp');
    expect(files.every(file => allowedImages.has('/images/'+file))).toBe(true);
    for (const path of ['/', '/catalog', '/category/mugs', '/category/candles', '/category/candles/crossroads-candles', '/category/stanley', '/category/printing', '/gift-builder', ...products.map(p => '/product/'+p.id)]) {
      const html = renderPage(path);
      for (const src of imageSources(html)) {
        expect(allowedImages.has(src),path+': '+src).toBe(true);
        expect(existsSync('public'+src)).toBe(true);
      }
      expect(html).not.toContain('class="demo-label"');
    }
  });
  it('hides demo product pages and favorites while keeping real favorites', () => {
    const html=renderPage('/favorites',{favorites:['mugs-1','ready-mug-01']});
    expect(html).toContain('/product/ready-mug-01');
    expect(html).not.toContain('/product/mugs-1');
    expect(imageSources(renderPage('/product/mugs-1'))).toEqual([]);
  });
  it('presents Stanley as a main category across browsing, breadcrumbs and gift selection', () => {
    setLocale('ar');
    expect(renderPage('/')).toContain('href="/category/stanley"');
    const cups=renderPage('/category/mugs');
    expect(cups).not.toContain('/product/stanley-bottle-');
    const stanley=renderPage('/category/stanley');
    expect((stanley.match(/class="product-card"/g) || []).length).toBe(5);
    const page=renderPage('/product/stanley-bottle-01');
    expect(page).toContain('href="/category/stanley"');
    expect(page).not.toContain('href="/category/mugs"');
    const gift=renderPage('/gift-builder',{'gift-builder':{...blankGift(),step:2}});
    expect(gift).toContain('value="mugs-stanley">قناني ستانلي</option>');
    const favorites=renderPage('/favorites',{favorites:['stanley-bottle-01']});
    expect(favorites).toContain('/product/stanley-bottle-01');
  });
  it('renders saved demo items without their images and blocks old gift requests', () => {
    const custom={...blankPersonalization(),name:'نور & Alex',text:'Saved message'};
    const gift={...blankGift(),step:6,items:[{productId:'mugs-1',custom}]};
    const saved={basket:[{id:'old',productId:'mugs-1',custom},{id:'gift',gift}], 'gift-builder':gift};
    for(const path of ['/basket','/gift-builder']) {
      const html=renderPage(path,saved);
      expect(html).toContain('نور &amp; Alex');
      expect(html).toContain('هذا المنتج لم يعد معروضًا');
      expect(html).not.toContain('https://wa.me/');
      for(const src of imageSources(html)) expect(allowedImages.has(src)).toBe(true);
    }
  });
  it('labels the sender and removes design style and wrapping color from forms and inquiries in every language', () => {
    const stale={...blankPersonalization(),name:'نور & Alex',template:'פרחוני',productColor:'#123456'};
    for(const locale of ['ar','he','en']) {
      setLocale(locale);
      const html=renderPage('/product/country-candle-01',{'draft:country-candle-01':stale});
      expect(html).toContain(translate('שם על כרטיס המתנה',locale));
      expect(html).not.toContain(translate('סגנון עיצוב',locale));
      expect(html).not.toContain('class="color-field"');
      const message=customizationLines('country-candle-01',stale,locale).join('\n');
      expect(message).toContain('نور & Alex');
      expect(message).toContain(translate('שם על כרטיס המתנה',locale));
      expect(message).not.toContain(translate('סגנון: {0}',locale,[translate(stale.template,locale)]));
      expect(message).not.toContain('#123456');
    }
    const preview=renderToStaticMarkup(<Preview product={productById('country-candle-01')} value={stale} />);
    expect(preview).toContain('template-minimal');
    expect(preview).not.toContain('#123456');
  });
});
