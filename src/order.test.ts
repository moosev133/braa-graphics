import { catalogRoots, inCatalogCategory } from './catalog-taxonomy';
import { describe, expect, it } from 'vitest';
import { allProducts, matchesRequestedOptions, productById, productFields, products, supportsPhoto } from './catalog';
import { blankGift, blankPersonalization, filterProducts, giftErrors, inquiryMessage, validateCustomization, whatsappUrl } from './order';

describe('catalog and product rules',()=>{
  it('covers the updated catalog with unique routable products and optional prices',()=>{
    expect(catalogRoots).toHaveLength(11);expect(new Set(products.map(p=>p.id)).size).toBe(products.length);
    expect(products).toHaveLength(35);
    expect(catalogRoots.filter(category=>products.some(p=>inCatalogCategory(p,category.id))).map(c=>c.id)).toEqual(['mugs','candles']);
    expect(allProducts.length).toBeGreaterThan(products.length);
    expect(products.every(p=>p.price===null)).toBe(true);
  });
  it('filters Hebrew search, category, occasion and new arrivals together',()=>{
    const matching=filterProducts(products,'כוס לבבות','mugs','סתם כי אוהבים',true);
    expect(matching.map(p=>p.id)).toEqual(['ready-mug-03']);
    expect(filterProducts(products,'אין מוצר כזה','','',false)).toHaveLength(0);
  });
  it('filters print requests by relevant print type without showing irrelevant framing on canvas',()=>{
    expect(matchesRequestedOptions(productById('prints-2')!,{printType:'קנבס'})).toBe(true);
    expect(matchesRequestedOptions(productById('prints-1')!,{printType:'קנבס'})).toBe(false);
    expect(productFields(productById('prints-2')!).some(f=>f.key==='frame')).toBe(false);
  });
  it('does not offer photo printing on pens, perfume or jewelry',()=>{
    for(const id of ['stationery-6','beauty-1','jewelry-1'])expect(supportsPhoto(productById(id)!)).toBe(false);
    expect(supportsPhoto(productById('mugs-1')!)).toBe(true);
  });
});
describe('validation and handoff',()=>{
  it('blocks archived demo products and unknown product IDs',()=>{
    const value=blankPersonalization();
    for(const id of ['cases-1','mugs-1','candles-1']) expect(validateCustomization(id,value)).toHaveLength(1);
    expect(validateCustomization('missing',value)).toHaveLength(1);
    expect(validateCustomization('country-candle-01',value)).toEqual([]);
  });
  it('rejects invalid quantities and overly long card messages',()=>{
    for(const quantity of [0,-1,1000,1.5,NaN])expect(validateCustomization('ready-mug-01',{...blankPersonalization(),quantity}).length).toBeGreaterThan(0);
    expect(validateCustomization('ready-mug-01',{...blankPersonalization(),text:'x'.repeat(301)})).toHaveLength(1);
  });
  it('blocks advancing an incomplete gift and validates each personalized item',()=>{
    const gift=blankGift();expect(giftErrors(gift,0)).toHaveLength(1);expect(giftErrors(gift,1)).toHaveLength(1);expect(giftErrors(gift,2)).toHaveLength(1);
    gift.items=[{productId:'cases-1',custom:blankPersonalization()}];expect(giftErrors(gift,3)).toHaveLength(1);
  });
  it('preserves options, custom text, files, quantity, gift contents, greeting, notes and reference',()=>{
    const custom={...blankPersonalization(),name:'נועה & דנה',text:'אהבה + זיכרונות',quantity:2,options:{finish:'לבן קלאסי'},attachments:[{id:'private-id',name:'family-photo.jpg'}],notes:'ליום שישי'};
    const gift={...blankGift(),occasion:'יום הולדת',box:'מארז עם סרט',recipient:'נועה',greeting:'מזל טוב!',items:[{productId:'ready-mug-01',custom}]};
    const message=inquiryMessage([{id:'test',gift}],'BG-TEST','איסוף אישי','he');
    for(const value of ['BG-TEST','נועה & דנה','אהבה + זיכרונות','כמות: 2','לבן קלאסי','family-photo.jpg','ליום שישי','מארז עם סרט','מזל טוב!','איסוף אישי','אצרף את התמונות ידנית'])expect(message).toContain(value);
    expect(message).not.toContain('private-id');
    expect(new URL(whatsappUrl(message)).searchParams.get('text')).toBe(message);
    expect(new URL(whatsappUrl(message)).pathname).toBe('/972545503130');
  });
});
