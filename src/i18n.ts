import { useSyncExternalStore } from 'react';
import dictionary from './locales/translations.json';
export type Locale = 'ar' | 'he' | 'en';
export const localeConfig: Record<Locale, { dir: 'rtl' | 'ltr'; label: string }> = {
  ar: { dir: 'rtl', label: 'العربية' }, he: { dir: 'rtl', label: 'עברית' }, en: { dir: 'ltr', label: 'English' },
};
export const DEFAULT_LOCALE: Locale = 'ar';
const STORAGE_KEY = 'braa-graphix:v1:locale';
export const isLocale = (value: unknown): value is Locale => value === 'ar' || value === 'he' || value === 'en';
export function initialLocale(): Locale {
  try { const saved = localStorage.getItem(STORAGE_KEY); return isLocale(saved) ? saved : DEFAULT_LOCALE; }
  catch { return DEFAULT_LOCALE; }
}
let currentLocale: Locale = initialLocale();
const listeners = new Set<() => void>();
export const getLocale = () => currentLocale;
const translations = dictionary as Record<string, { ar: string; en: string; he?: string }>;
/** Translate application-owned strings only. Customer content is never used as a key. */
export function translate(source: string | null | undefined, locale: Locale, values: readonly unknown[] = []): string {
  if (!source) return '';
  const key = source.trim(); const entry = translations[key];
  const translated = locale === 'he' ? (entry?.he ?? key) : (entry?.[locale] ?? key);
  const formatted = translated.replace(/\{(\d+)\}/g, (placeholder, index) => index < values.length ? String(values[Number(index)] ?? '') : placeholder);
  return source.slice(0, source.length - source.trimStart().length) + formatted + source.slice(source.trimEnd().length);
}
export const t = (source: string | null | undefined, values: readonly unknown[] = []) => translate(source, currentLocale, values);
export function applyDocumentLocale(locale: Locale) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = locale; document.documentElement.dir = localeConfig[locale].dir;
}
export function setLocale(locale: Locale) {
  if (!isLocale(locale)) return;
  currentLocale = locale;
  try { localStorage.setItem(STORAGE_KEY, locale); } catch { /* Still works for this session. */ }
  applyDocumentLocale(locale); listeners.forEach(listener => listener());
}
export function useLocale() {
  return useSyncExternalStore(listener => { listeners.add(listener); return () => listeners.delete(listener); }, getLocale, () => DEFAULT_LOCALE);
}
export function localizeError(message: string): string {
  if (translations[message.trim()]) return t(message);
  const required = message.match(/^יש לבחור (.+)$/);
  if (required) return t('יש לבחור {0}', [t(required[1])]);
  const separator = message.indexOf(': ');
  if (separator > 0) return `${t(message.slice(0, separator))}: ${localizeError(message.slice(separator + 2))}`;
  return message;
}
applyDocumentLocale(currentLocale);
