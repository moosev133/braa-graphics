import { Globe2 } from 'lucide-react';
import { isLocale, localeConfig, setLocale, t, useLocale, type Locale } from './i18n';
export default function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const locale = useLocale();
  return <label className={`language-switcher ${mobile ? 'mobile-language-switcher' : ''}`}>
    <Globe2 size={16} aria-hidden="true" /><span className="sr-only">{t('שפת האתר')}</span>
    <select aria-label={t('שפת האתר')} value={locale} onChange={event => { if (isLocale(event.target.value)) setLocale(event.target.value); }}>
      {(Object.keys(localeConfig) as Locale[]).map(code => <option key={code} value={code} lang={code}>{localeConfig[code].label}</option>)}
    </select>
  </label>;
}
