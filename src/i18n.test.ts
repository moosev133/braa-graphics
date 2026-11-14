import { afterEach, describe, expect, it, vi } from 'vitest';
import { categories, productFields, products } from './catalog';
import { DEFAULT_LOCALE, initialLocale, localeConfig, localizeError, setLocale, translate } from './i18n';
import dictionary from './locales/translations.json';
import { blankGift, blankPersonalization, filterProducts, inquiryMessage, validateCustomization } from './order';

afterEach(() => { vi.unstubAllGlobals(); setLocale('ar'); });
describe('language selection and content', () => {
  it('defaults to Arabic, restores valid choices, and tolerates unavailable storage', () => {
    expect(DEFAULT_LOCALE).toBe('ar');
    for (const [saved, expected] of [[null, 'ar'], ['bad', 'ar'], ['ar', 'ar'], ['he', 'he'], ['en', 'en']]) {
      vi.stubGlobal('localStorage', { getItem: () => saved });
      expect(initialLocale()).toBe(expected);
    }
    vi.stubGlobal('localStorage', { getItem: () => { throw new Error('blocked'); } });
    expect(initialLocale()).toBe('ar');
    expect([localeConfig.ar.dir, localeConfig.he.dir, localeConfig.en.dir]).toEqual(['rtl','rtl','ltr']);
  });
  it('translates the complete catalog and available personalization choices', () => {
    const source = [...categories.flatMap(c => [c.title, c.short, c.description, c.nameLabel]), ...products.flatMap(p => [p.title, p.description, ...productFields(p).flatMap(f => [f.label, ...(f.options || [])])])];
    const entries = dictionary as Record<string,{ ar:string; en:string }>;
    for (const key of source) if (key && /[\u0590-\u05ff]/.test(key)) {
      expect(entries[key], key).toBeDefined();
      for (const locale of ['ar','en'] as const) {
        expect(translate(key, locale), key).not.toMatch(/[\u0590-\u05ff]/);
        expect(translate(key, locale), key).not.toBe('');
      }
    }
  });
  it('searches product names in all languages regardless of current language', () => {
    for (const locale of ['ar','he','en'] as const) {
      const product = products[0];
      expect(filterProducts(products, translate(product.title,locale),'','',false)).toContain(product);
    }
  });
  it('localizes validation without changing saved option values', () => {
    const custom = {...blankPersonalization(),quantity:0}; custom.options = {brand:'Apple',model:'דגם אחר'};
    for (const locale of ['ar','he','en'] as const) {
      setLocale(locale);
      const error = validateCustomization('ready-mug-01', custom)[0];
      expect(localizeError(error)).toBe(translate(error,locale));
      expect(custom.options.model).toBe('דגם אחר');
    }
    custom.quantity = 1;
    expect(validateCustomization('ready-mug-01', custom)).toEqual([]);
  });
});
describe('localized inquiries preserve customer content', () => {
  it('does not recursively translate or interpolate customer-written content', () => {
    const raw = 'מינימליסטי {1} نور & Alex';
    expect(translate('הערות: {0}', 'en', [raw])).toBe('Notes: '+raw);
  });
  it('translates generated messages but retains names, greeting, files, options, and references', () => {
    const raw = 'מינימליסטי {0} نور & Alex';
    const custom = {...blankPersonalization(),name:raw,text:raw,notes:raw,options:{finish:'לבן קלאסי'},attachments:[{id:'private',name:'תמונה.png'}]};
    const gift = {...blankGift(),occasion:'יום הולדת',box:'מארז עם סרט',recipient:raw,greeting:raw,notes:raw,items:[{productId:'ready-mug-01',custom}]};
    for (const locale of ['ar','he','en'] as const) {
      const message = inquiryMessage([{id:'test',gift}],'BG-TEST',raw,locale);
      expect(message).toContain(raw); expect(message).toContain('תמונה.png'); expect(message).toContain('BG-TEST');
      expect(message).toContain(translate('לבן קלאסי',locale));
      expect(message).not.toContain('private');
      if (locale !== 'he') expect(message.replaceAll(raw,'').replaceAll('תמונה.png','')).not.toMatch(/[\u0590-\u05ff]/);
    }
  });
});
