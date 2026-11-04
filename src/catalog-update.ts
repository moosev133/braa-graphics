import type { Category, Product } from './catalog';
export const additionalCategories: Category[] = [
  {
    "id": "cards",
    "title": "بطاقات تحفيزية",
    "short": "بطاقات تحفيزية",
    "image": "motivational-cards",
    "color": "#E5ECE7",
    "description": "تفاصيل جميلة تختارونها بطريقتكم.",
    "photo": true,
    "nameLabel": "الاسم أو العنوان المطلوب",
    "fields": []
  },
  {
    "id": "incense",
    "title": "مباخر",
    "short": "مباخر",
    "image": "incense-burner",
    "color": "#E5ECE7",
    "description": "تفاصيل جميلة تختارونها بطريقتكم.",
    "photo": false,
    "nameLabel": "الاسم على بطاقة الهدية",
    "fields": []
  },
  {
    "id": "keychains",
    "title": "ميداليات",
    "short": "ميداليات",
    "image": "keychains",
    "color": "#E5ECE7",
    "description": "تفاصيل جميلة تختارونها بطريقتكم.",
    "photo": true,
    "nameLabel": "الاسم أو العنوان المطلوب",
    "fields": []
  },
  {
    "id": "boards",
    "title": "طباعات على ألواح",
    "short": "طباعات على ألواح",
    "image": "print-boards",
    "color": "#E5ECE7",
    "description": "تفاصيل جميلة تختارونها بطريقتكم.",
    "photo": true,
    "nameLabel": "الاسم أو العنوان المطلوب",
    "fields": [
      {
        "key": "size",
        "label": "المقاس المطلوب",
        "type": "select",
        "options": [
          "حسب التصميم",
          "مقاس خاص — اكتبوه في الملاحظات"
        ]
      }
    ]
  },
  {
    "id": "paper",
    "title": "طباعات ورقية",
    "short": "طباعات ورقية",
    "image": "event-printing",
    "color": "#E5ECE7",
    "description": "تفاصيل جميلة تختارونها بطريقتكم.",
    "photo": true,
    "nameLabel": "الاسم أو العنوان المطلوب",
    "fields": []
  },
  {
    "id": "merch",
    "title": "طباعة على منتجات",
    "short": "طباعة على منتجات",
    "image": "printed-accessories",
    "color": "#E5ECE7",
    "description": "تفاصيل جميلة تختارونها بطريقتكم.",
    "photo": true,
    "nameLabel": "الاسم أو العنوان المطلوب",
    "fields": []
  }
];
export const productAssignments: Record<string,string[]> = {
  "mugs-1": [
    "mugs-printing"
  ],
  "mugs-2": [
    "mugs-printing"
  ],
  "mugs-3": [
    "mugs-printing"
  ],
  "mugs-4": [
    "mugs-printing"
  ],
  "mugs-5": [
    "mugs-printing"
  ],
  "mugs-6": [
    "mugs-ready"
  ],
  "albums-1": [
    "albums"
  ],
  "albums-2": [
    "albums"
  ],
  "albums-3": [
    "albums"
  ],
  "albums-4": [
    "albums"
  ],
  "albums-5": [
    "albums"
  ],
  "albums-6": [
    "albums"
  ],
  "bottles-1": [
    "bottles"
  ],
  "bottles-2": [
    "bottles"
  ],
  "bottles-3": [
    "bottles"
  ],
  "bottles-4": [
    "bottles"
  ],
  "bottles-5": [
    "bottles"
  ],
  "bottles-6": [
    "bottles"
  ],
  "candles-1": [
    "candles"
  ],
  "candles-2": [
    "candles"
  ],
  "candles-3": [
    "candles"
  ],
  "candles-4": [
    "candles"
  ],
  "candles-5": [
    "candles"
  ],
  "candles-6": [
    "candles"
  ],
  "stationery-1": [
    "notebooks-custom",
    "paper-notebooks",
    "product-notebooks"
  ],
  "stationery-2": [
    "notebooks-custom",
    "paper-notebooks",
    "product-notebooks"
  ],
  "stationery-3": [
    "notebooks-custom",
    "paper-notebooks",
    "product-notebooks"
  ],
  "stationery-4": [
    "notebooks-custom",
    "paper-notebooks",
    "product-notebooks"
  ],
  "stationery-5": [
    "paper-pens"
  ],
  "stationery-6": [
    "paper-pens"
  ],
  "prints-1": [
    "frames"
  ],
  "prints-3": [
    "frames"
  ],
  "prints-4": [
    "frames"
  ],
  "prints-5": [
    "frames"
  ],
  "prints-6": [
    "frames"
  ],
  "prints-2": [
    "board-canvas"
  ],
  "jewelry-1": [
    "handmade-earrings"
  ],
  "jewelry-2": [
    "handmade-necklaces"
  ],
  "jewelry-3": [
    "handmade-bracelets"
  ],
  "jewelry-4": [
    "keychains",
    "product-keychains"
  ],
  "cases-1": [
    "product-phone-cases"
  ],
  "cases-2": [
    "product-phone-cases"
  ],
  "cases-3": [
    "product-phone-cases"
  ],
  "cases-4": [
    "product-phone-cases"
  ],
  "cases-5": [
    "product-phone-cases"
  ],
  "clothing-1": [
    "product-clothing"
  ],
  "clothing-2": [
    "product-clothing"
  ],
  "clothing-3": [
    "product-clothing"
  ],
  "clothing-4": [
    "product-clothing"
  ],
  "clothing-5": [
    "product-clothing"
  ],
  "clothing-6": [
    "product-clothing"
  ],
  "events-6": [
    "paper-stickers"
  ],
  "events-9": [
    "paper-stickers"
  ],
  "events-1": [
    "paper-favors"
  ],
  "events-2": [
    "paper-favors"
  ],
  "events-3": [
    "paper-favors"
  ],
  "events-4": [
    "paper-favors"
  ],
  "events-5": [
    "paper-favors"
  ],
  "events-7": [
    "paper-favors"
  ],
  "events-8": [
    "paper-favors"
  ],
  "events-10": [
    "paper-favors"
  ],
  "boxes-1": [
    "paper-gift-boxes"
  ],
  "boxes-2": [
    "paper-gift-boxes"
  ],
  "boxes-3": [
    "paper-gift-boxes"
  ],
  "boxes-4": [
    "paper-gift-boxes"
  ],
  "boxes-5": [
    "paper-gift-boxes"
  ],
  "boxes-6": [
    "paper-gift-boxes"
  ],
  "boxes-7": [
    "paper-gift-boxes"
  ]
};
export const additionalProducts: Product[] = [
  {
    "id": "mugs-ready-1",
    "title": "كوب جاهز بتصميم زهري",
    "category": "mugs",
    "catalogCategoryIds": [
      "mugs-ready"
    ],
    "index": 0,
    "image": "mug",
    "description": "منتج جاهز للاختيار. يمكن تخصيص بطاقة الهدية أو التغليف، وتُؤكّد التفاصيل مع الاستوديو.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים",
    "personalizationTarget": "packaging"
  },
  {
    "id": "notebooks-ready-1",
    "title": "دفتر جاهز بغلاف مزخرف",
    "category": "stationery",
    "catalogCategoryIds": [
      "notebooks-ready"
    ],
    "index": 1,
    "image": "notebook",
    "description": "منتج جاهز للاختيار. يمكن تخصيص بطاقة الهدية أو التغليف، وتُؤكّد التفاصيل مع الاستوديو.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים",
    "personalizationTarget": "packaging"
  },
  {
    "id": "notebooks-ready-2",
    "title": "دفتر ملاحظات جاهز",
    "category": "stationery",
    "catalogCategoryIds": [
      "notebooks-ready"
    ],
    "index": 2,
    "image": "notebook",
    "description": "منتج جاهز للاختيار. يمكن تخصيص بطاقة الهدية أو التغليف، وتُؤكّد التفاصيل مع الاستوديو.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים",
    "personalizationTarget": "packaging"
  },
  {
    "id": "cards-1",
    "title": "بطاقات تحفيزية يومية",
    "category": "cards",
    "catalogCategoryIds": [
      "cards"
    ],
    "index": 3,
    "image": "motivational-cards",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "cards-2",
    "title": "بطاقات بكلماتكم",
    "category": "cards",
    "catalogCategoryIds": [
      "cards"
    ],
    "index": 4,
    "image": "motivational-cards",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "handmade-rings-1",
    "title": "خاتم هاند ميد",
    "category": "jewelry",
    "catalogCategoryIds": [
      "handmade-rings"
    ],
    "index": 5,
    "image": "jewelry",
    "description": "منتج جاهز للاختيار. يمكن تخصيص بطاقة الهدية أو التغليف، وتُؤكّد التفاصيل مع الاستوديو.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים",
    "personalizationTarget": "packaging"
  },
  {
    "id": "incense-1",
    "title": "مبخرة سيراميك",
    "category": "incense",
    "catalogCategoryIds": [
      "incense"
    ],
    "index": 6,
    "image": "incense-burner",
    "description": "منتج جاهز للاختيار. يمكن تخصيص بطاقة الهدية أو التغليف، وتُؤكّد التفاصيل مع الاستوديو.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים",
    "personalizationTarget": "packaging"
  },
  {
    "id": "incense-2",
    "title": "مبخرة مع تغليف هدية",
    "category": "incense",
    "catalogCategoryIds": [
      "incense"
    ],
    "index": 7,
    "image": "incense-burner",
    "description": "منتج جاهز للاختيار. يمكن تخصيص بطاقة الهدية أو التغليف، وتُؤكّد التفاصيل مع الاستوديو.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים",
    "personalizationTarget": "packaging"
  },
  {
    "id": "keychains-1",
    "title": "ميدالية بالاسم",
    "category": "keychains",
    "catalogCategoryIds": [
      "keychains",
      "product-keychains"
    ],
    "index": 8,
    "image": "keychains",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "keychains-2",
    "title": "ميدالية بصورة شخصية",
    "category": "keychains",
    "catalogCategoryIds": [
      "keychains",
      "product-keychains"
    ],
    "index": 9,
    "image": "keychains",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "fragrances-1",
    "title": "هدية عطرية بتغليف شخصي",
    "category": "candles",
    "catalogCategoryIds": [
      "candles"
    ],
    "index": 10,
    "image": "perfume",
    "description": "منتج جاهز للاختيار. يمكن تخصيص بطاقة الهدية أو التغليف، وتُؤكّد التفاصيل مع الاستوديو.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים",
    "personalizationTarget": "packaging"
  },
  {
    "id": "boards-wood-1",
    "title": "لوح خشب بطباعة خاصة",
    "category": "boards",
    "catalogCategoryIds": [
      "board-wood"
    ],
    "index": 11,
    "image": "print-boards",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "boards-roll-up-1",
    "title": "رول أب بتصميمكم",
    "category": "boards",
    "catalogCategoryIds": [
      "board-roll-up"
    ],
    "index": 12,
    "image": "print-boards",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "boards-kapa-1",
    "title": "لوح كابا مطبوع",
    "category": "boards",
    "catalogCategoryIds": [
      "board-kapa"
    ],
    "index": 13,
    "image": "print-boards",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "business-cards-1",
    "title": "بطاقات عمل بتصميم خاص",
    "category": "paper",
    "catalogCategoryIds": [
      "paper-business-cards"
    ],
    "index": 14,
    "image": "event-printing",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "business-cards-2",
    "title": "بطاقات عمل بطباعة شعاركم",
    "category": "paper",
    "catalogCategoryIds": [
      "paper-business-cards"
    ],
    "index": 15,
    "image": "event-printing",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "glass-cups-1",
    "title": "طباعة على كوب زجاج",
    "category": "mugs",
    "catalogCategoryIds": [
      "mugs-printing",
      "product-glass-cups"
    ],
    "index": 16,
    "image": "drinkware",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "stanley-cups-1",
    "title": "طباعة على كوب ستانلي",
    "category": "mugs",
    "catalogCategoryIds": [
      "mugs-printing",
      "product-stanley-cups"
    ],
    "index": 17,
    "image": "drinkware",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "magnets-1",
    "title": "مغناطيس بطباعة شخصية",
    "category": "merch",
    "catalogCategoryIds": [
      "product-magnets"
    ],
    "index": 18,
    "image": "printed-accessories",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "bookmarks-1",
    "title": "فاصل قراءة باسمكم",
    "category": "merch",
    "catalogCategoryIds": [
      "product-bookmarks"
    ],
    "index": 19,
    "image": "printed-accessories",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "bags-1",
    "title": "حقيبة بطباعة خاصة",
    "category": "merch",
    "catalogCategoryIds": [
      "product-bags"
    ],
    "index": 20,
    "image": "printed-accessories",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "color-boxes-1",
    "title": "علبة ألوان بالاسم",
    "category": "merch",
    "catalogCategoryIds": [
      "product-color-boxes"
    ],
    "index": 21,
    "image": "printed-accessories",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "phone-stands-1",
    "title": "ستاند هاتف بتصميمكم",
    "category": "merch",
    "catalogCategoryIds": [
      "product-phone-stands"
    ],
    "index": 22,
    "image": "printed-accessories",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "awards-1",
    "title": "درع تكريم مطبوع",
    "category": "merch",
    "catalogCategoryIds": [
      "product-awards"
    ],
    "index": 23,
    "image": "printed-accessories",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "pencil-cases-1",
    "title": "مقلمة بالاسم",
    "category": "merch",
    "catalogCategoryIds": [
      "product-pencil-cases"
    ],
    "index": 24,
    "image": "printed-accessories",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  },
  {
    "id": "lunch-boxes-1",
    "title": "علبة غداء بالاسم",
    "category": "merch",
    "catalogCategoryIds": [
      "product-lunch-boxes"
    ],
    "index": 25,
    "image": "printed-accessories",
    "description": "اختاروا التصميم وأضيفوا الاسم أو الإهداء. يراجع الاستوديو المقاس والخامة والخيارات معكم قبل تأكيد الطلب.",
    "price": null,
    "isNew": true,
    "occasion": "סתם כי אוהבים"
  }
];
export const readyProductIds = new Set(['mugs-6']);
