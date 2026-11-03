import { describe, expect, it } from 'vitest';
import { categories, matchesRequestedOptions, productById, productFields, products, supportsPhoto } from './catalog';
import { blankGift, blankPersonalization, filterProducts, giftErrors, inquiryMessage, validateCustomization, whatsappUrl } from './order';

describe('catalog and product rules',()=>{
  it('covers all twelve categories with unique routable products and optional prices',()=>{
    expect(categories).toHaveLength(12);expect(new Set(products.map(p=>p.id)).size).toBe(products.length);
    for(const category of categories)expect(products.some(p=>p.category===category.id)).toBe(true);
    expect(products.every(p=>p.price===null)).toBe(true);
  });
  it('filters Hebrew search, category, occasion and new arrivals together',()=>{
    const matching=filterProducts(products,'ספל','mugs','יום האהבה',true);
    expect(matching.map(p=>p.id)).toEqual(['mugs-3']);
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
  it('requires phone brand and model, and an exact name for other models',()=>{
    const value=blankPersonalization();expect(validateCustomization('cases-1',value)).toHaveLength(2);
    value.options={brand:'Apple',model:'דגם אחר'};expect(validateCustomization('cases-1',value)[0]).toContain('המדויק');
    value.options.modelOther='My exact phone model';expect(validateCustomization('cases-1',value)).toEqual([]);
  });
  it('rejects invalid quantities and requires a clothing size',()=>{
    for(const quantity of [0,-1,1000,1.5,NaN])expect(validateCustomization('mugs-1',{...blankPersonalization(),quantity}).length).toBeGreaterThan(0);
    expect(validateCustomization('clothing-1',blankPersonalization())[0]).toContain('מידה');
  });
  it('blocks advancing an incomplete gift and validates each personalized item',()=>{
    const gift=blankGift();expect(giftErrors(gift,0)).toHaveLength(1);expect(giftErrors(gift,1)).toHaveLength(1);expect(giftErrors(gift,2)).toHaveLength(1);
    gift.items=[{productId:'cases-1',custom:blankPersonalization()}];expect(giftErrors(gift,3)).toHaveLength(2);
  });
  it('preserves options, custom text, files, quantity, gift contents, greeting, notes and reference',()=>{
    const custom={...blankPersonalization(),name:'נועה & דנה',text:'אהבה + זיכרונות',quantity:2,options:{finish:'לבן קלאסי'},attachments:[{id:'private-id',name:'family-photo.jpg'}],notes:'ליום שישי'};
    const gift={...blankGift(),occasion:'יום הולדת',box:'מארז עם סרט',recipient:'נועה',greeting:'מזל טוב!',items:[{productId:'mugs-1',custom}]};
    const message=inquiryMessage([{id:'test',gift}],'BG-TEST','איסוף אישי','he');
    for(const value of ['BG-TEST','נועה & דנה','אהבה + זיכרונות','כמות: 2','לבן קלאסי','family-photo.jpg','ליום שישי','מארז עם סרט','מזל טוב!','איסוף אישי','אצרף את התמונות ידנית'])expect(message).toContain(value);
    expect(message).not.toContain('private-id');
    expect(new URL(whatsappUrl(message)).searchParams.get('text')).toBe(message);
    expect(new URL(whatsappUrl(message)).pathname).toBe('/972545503130');
  });
});
