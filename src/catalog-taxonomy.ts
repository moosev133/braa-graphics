export interface CatalogCategory {
  id: string; slug: string; title: string; short: string; image: string; color: string; description: string; parentId?: string;
}
export const catalogCategories: CatalogCategory[] = [
  {
    "id": "mugs",
    "slug": "mugs",
    "title": "أكواب",
    "short": "أكواب",
    "image": "mug",
    "color": "#F5DEE4",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة."
  },
  {
    "id": "albums",
    "slug": "albums",
    "title": "ألبومات الصور",
    "short": "ألبومات الصور",
    "image": "album",
    "color": "#F4E8DC",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة."
  },
  {
    "id": "notebooks",
    "slug": "notebooks",
    "title": "دفاتر Notebooks",
    "short": "دفاتر Notebooks",
    "image": "notebook",
    "color": "#E7E1F1",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة."
  },
  {
    "id": "frames",
    "slug": "frames",
    "title": "براويز",
    "short": "براويز",
    "image": "framed-art",
    "color": "#E8E4D9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة."
  },
  {
    "id": "bottles",
    "slug": "bottles",
    "title": "قناني",
    "short": "قناني",
    "image": "bottle",
    "color": "#DDEAE9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة."
  },
  {
    "id": "cards",
    "slug": "cards",
    "title": "بطاقات تحفيزية",
    "short": "بطاقات تحفيزية",
    "image": "motivational-cards",
    "color": "#E7E1F1",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة."
  },
  {
    "id": "candles",
    "slug": "candles",
    "title": "شموع وروائح",
    "short": "شموع وروائح",
    "image": "candle",
    "color": "#FAE8CA",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة."
  },
  {
    "id": "handmade",
    "slug": "handmade",
    "title": "إكسسوارات هاند ميد",
    "short": "إكسسوارات هاند ميد",
    "image": "jewelry",
    "color": "#F2E5D8",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة."
  },
  {
    "id": "incense",
    "slug": "incense",
    "title": "مباخر",
    "short": "مباخر",
    "image": "incense-burner",
    "color": "#FAE8CA",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة."
  },
  {
    "id": "keychains",
    "slug": "keychains",
    "title": "ميداليات",
    "short": "ميداليات",
    "image": "keychains",
    "color": "#F2E5D8",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة."
  },
  {
    "id": "printing",
    "slug": "printing",
    "title": "طباعات",
    "short": "طباعات",
    "image": "print-boards",
    "color": "#F3DCD9",
    "description": "على الألواح، على الورق أو على منتج تحبّونه. اختاروا نوع الطباعة لتكتشفوا التفاصيل."
  },
  {
    "id": "mugs-ready",
    "slug": "ready",
    "title": "أكواب جاهزة",
    "short": "أكواب جاهزة",
    "image": "mug",
    "color": "#F5DEE4",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "mugs"
  },
  {
    "id": "mugs-printing",
    "slug": "printing",
    "title": "أكواب للطباعة",
    "short": "أكواب للطباعة",
    "image": "mug",
    "color": "#F5DEE4",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "mugs"
  },
  {
    "id": "mugs-quotes",
    "slug": "quotes",
    "title": "أكواب جمل",
    "short": "أكواب جمل",
    "image": "quote-mugs/01.jpg",
    "color": "#F5DEE4",
    "description": "كلمة تضحككم، عبارة تلهمكم، وكوب يرافق يومكم. اختاروا من 13 تصميمًا.",
    "parentId": "mugs"
  },
  {
    "id": "notebooks-ready",
    "slug": "ready",
    "title": "دفاتر جاهزة",
    "short": "دفاتر جاهزة",
    "image": "notebook",
    "color": "#E7E1F1",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "notebooks"
  },
  {
    "id": "notebooks-custom",
    "slug": "custom",
    "title": "دفاتر بتصميم خاص",
    "short": "دفاتر بتصميم خاص",
    "image": "notebook",
    "color": "#E7E1F1",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "notebooks"
  },
  {
    "id": "handmade-rings",
    "slug": "rings",
    "title": "خواتم",
    "short": "خواتم",
    "image": "jewelry",
    "color": "#F2E5D8",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "handmade"
  },
  {
    "id": "handmade-earrings",
    "slug": "earrings",
    "title": "حلق",
    "short": "حلق",
    "image": "jewelry",
    "color": "#F2E5D8",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "handmade"
  },
  {
    "id": "handmade-bracelets",
    "slug": "bracelets",
    "title": "أساور",
    "short": "أساور",
    "image": "jewelry",
    "color": "#F2E5D8",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "handmade"
  },
  {
    "id": "handmade-necklaces",
    "slug": "necklaces",
    "title": "عقود",
    "short": "عقود",
    "image": "jewelry",
    "color": "#F2E5D8",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "handmade"
  },
  {
    "id": "printing-boards",
    "slug": "boards",
    "title": "طباعات على ألواح",
    "short": "طباعات على ألواح",
    "image": "print-boards",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing"
  },
  {
    "id": "printing-paper",
    "slug": "paper",
    "title": "طباعات ورقية",
    "short": "طباعات ورقية",
    "image": "event-printing",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing"
  },
  {
    "id": "printing-products",
    "slug": "products",
    "title": "طباعة على منتجات",
    "short": "طباعة على منتجات",
    "image": "printed-accessories",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing"
  },
  {
    "id": "board-wood",
    "slug": "wood",
    "title": "طباعة على خشب",
    "short": "طباعة على خشب",
    "image": "print-boards",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-boards"
  },
  {
    "id": "board-canvas",
    "slug": "canvas",
    "title": "كانفاس",
    "short": "كانفاس",
    "image": "framed-art",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-boards"
  },
  {
    "id": "board-roll-up",
    "slug": "roll-up",
    "title": "رول أب",
    "short": "رول أب",
    "image": "print-boards",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-boards"
  },
  {
    "id": "board-kapa",
    "slug": "kapa",
    "title": "كابا",
    "short": "كابا",
    "image": "print-boards",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-boards"
  },
  {
    "id": "paper-notebooks",
    "slug": "notebooks",
    "title": "دفاتر",
    "short": "دفاتر",
    "image": "notebook",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-paper"
  },
  {
    "id": "paper-business-cards",
    "slug": "business-cards",
    "title": "بطاقات عمل",
    "short": "بطاقات عمل",
    "image": "event-printing",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-paper"
  },
  {
    "id": "paper-pens",
    "slug": "pens",
    "title": "أقلام",
    "short": "أقلام",
    "image": "notebook",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-paper"
  },
  {
    "id": "paper-stickers",
    "slug": "stickers",
    "title": "لاصقات",
    "short": "لاصقات",
    "image": "event-printing",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-paper"
  },
  {
    "id": "paper-favors",
    "slug": "favors",
    "title": "توزيعات",
    "short": "توزيعات",
    "image": "event-printing",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-paper"
  },
  {
    "id": "paper-gift-boxes",
    "slug": "gift-boxes",
    "title": "صناديق هدايا",
    "short": "صناديق هدايا",
    "image": "gift-box",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-paper"
  },
  {
    "id": "product-glass-cups",
    "slug": "glass-cups",
    "title": "أكواب زجاج",
    "short": "أكواب زجاج",
    "image": "drinkware",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-stanley-cups",
    "slug": "stanley-cups",
    "title": "أكواب ستانلي",
    "short": "أكواب ستانلي",
    "image": "drinkware",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-phone-cases",
    "slug": "phone-cases",
    "title": "أغطية هواتف",
    "short": "أغطية هواتف",
    "image": "phone-case",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-notebooks",
    "slug": "notebooks",
    "title": "دفاتر للطباعة",
    "short": "دفاتر للطباعة",
    "image": "notebook",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-magnets",
    "slug": "magnets",
    "title": "مغناطيس",
    "short": "مغناطيس",
    "image": "printed-accessories",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-bookmarks",
    "slug": "bookmarks",
    "title": "فواصل قراءة",
    "short": "فواصل قراءة",
    "image": "printed-accessories",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-bags",
    "slug": "bags",
    "title": "حقائب",
    "short": "حقائب",
    "image": "printed-accessories",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-color-boxes",
    "slug": "color-boxes",
    "title": "علب ألوان",
    "short": "علب ألوان",
    "image": "printed-accessories",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-phone-stands",
    "slug": "phone-stands",
    "title": "ستاند للهاتف",
    "short": "ستاند للهاتف",
    "image": "printed-accessories",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-awards",
    "slug": "awards",
    "title": "دروع",
    "short": "دروع",
    "image": "printed-accessories",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-keychains",
    "slug": "keychains",
    "title": "ميداليات للطباعة",
    "short": "ميداليات للطباعة",
    "image": "keychains",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-pencil-cases",
    "slug": "pencil-cases",
    "title": "مقالم",
    "short": "مقالم",
    "image": "printed-accessories",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-lunch-boxes",
    "slug": "lunch-boxes",
    "title": "علب Lunch box",
    "short": "علب Lunch box",
    "image": "printed-accessories",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  },
  {
    "id": "product-clothing",
    "slug": "clothing",
    "title": "طباعة على ملابس",
    "short": "طباعة على ملابس",
    "image": "tshirt",
    "color": "#F3DCD9",
    "description": "اختاروا ما يناسبكم وأضيفوا لمستكم الخاصة.",
    "parentId": "printing-products"
  }
];
export const catalogRoots = catalogCategories.filter(category => !category.parentId);
export const catalogCategoryById = (id: string) => catalogCategories.find(category => category.id === id);
export const catalogChildren = (id: string) => catalogCategories.filter(category => category.parentId === id);
export function catalogTrail(id: string): CatalogCategory[] {
  const category = catalogCategoryById(id);
  return category ? [...(category.parentId ? catalogTrail(category.parentId) : []), category] : [];
}
export const catalogPath = (id: string) => '/category/' + catalogTrail(id).map(category => category.slug).join('/');
export const legacyCategoryIds: Record<string,string> = {
  stationery:'notebooks', prints:'frames', jewelry:'handmade', beauty:'candles',
  cases:'product-phone-cases', clothing:'product-clothing', events:'paper-favors', boxes:'paper-gift-boxes',
};
export function resolveCatalogPath(path: string) {
  if (legacyCategoryIds[path]) return catalogCategoryById(legacyCategoryIds[path]);
  const parts = path.split('/').filter(Boolean);
  let category: CatalogCategory | undefined;
  for (let index = 0; index < parts.length; index++) {
    category = catalogCategories.find(item => item.slug === parts[index] && item.parentId === category?.id);
    if (!category) return undefined;
  }
  return category;
}
export function inCatalogCategory(product: { category: string; catalogCategoryIds?: string[] }, selected: string): boolean {
  if (!selected) return true;
  const id = legacyCategoryIds[selected] || selected;
  if (!product.catalogCategoryIds) return product.category === selected;
  return product.catalogCategoryIds.some(leaf => catalogTrail(leaf).some(category => category.id === id));
}
export function primaryCatalogCategory(product: { catalogCategoryIds: string[] }) {
  return catalogCategoryById(product.catalogCategoryIds[0]);
}
