import { localizeError, useLocale } from "./i18n";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { readLocal, writeLocal } from './storage';
import type { BasketItem } from './order';
interface State {
  basket: BasketItem[];
  setBasket: (next: BasketItem[]) => void;
  addItem: (item: Omit<BasketItem, 'id'>) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  toast: (message: string) => void;
}
const Context = createContext<State>(null!);
export function useStore() {
  return useContext(Context);
}
export function useSaved<T>(key: string, initial: T): [T, (next: T | ((previous: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => readLocal(key, initial));
  useEffect(() => {
    writeLocal(key, value);
  }, [key, value]);
  return [value, setValue];
}
export function StoreProvider({
  children
}: {
  children: ReactNode;
}) {
  useLocale();
  const [basket, setBasketState] = useSaved<BasketItem[]>('basket', []);
  const [favorites, setFavorites] = useSaved<string[]>('favorites', []);
  const [message, setMessage] = useState('');
  const toast = useCallback((value: string) => {
    setMessage(value);
  }, []);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), 4500);
    return () => clearTimeout(timer);
  }, [message]);
  const setBasket = (next: BasketItem[]) => {
    setBasketState(next);
    if (!writeLocal('basket', next)) toast('הבקשה זמינה כרגע, אך לא ניתן לשמור אותה בדפדפן.');
  };
  const addItem = (item: Omit<BasketItem, 'id'>) => {
    setBasket([...basket, {
      ...structuredClone(item),
      id: crypto.randomUUID()
    }]);
    toast('נוסף לסל הפניות שלכם ♡');
  };
  const toggleFavorite = (id: string) => setFavorites(favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id]);
  return <Context.Provider value={{
    basket,
    setBasket,
    addItem,
    favorites,
    toggleFavorite,
    toast
  }}>{children}<div className={`toast ${message ? 'visible' : ''}`} role="status">{localizeError(message)}</div></Context.Provider>;
}
