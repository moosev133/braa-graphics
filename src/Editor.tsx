import { t, localizeError } from "./i18n";
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ImagePlus, Move, RotateCcw, Trash2, ChevronDown, Plus, Minus } from 'lucide-react';
import { categoryById, imagePath, phoneModels, productFields, supportsPhoto, type Product } from './catalog';
import { attachmentBlob, saveAttachment } from './storage';
import { blankPersonalization, type Personalization } from './order';
import { useStore } from './state';
const colors = [{
  value: '#FFF7EF',
  name: 'קרם'
}, {
  value: '#F8C4D0',
  name: 'ורוד'
}, {
  value: '#D4C9E7',
  name: 'לבנדר'
}, {
  value: '#B9D9ED',
  name: 'תכלת'
}, {
  value: '#E3C986',
  name: 'חול'
}];
function useImage(id?: string) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    let active = true;
    let objectUrl = '';
    setUrl('');
    if (id) attachmentBlob(id).then(blob => {
      if (blob && active) {
        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      }
    }).catch(() => {});
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [id]);
  return url;
}
export function Preview({
  product,
  value,
  onChange,
  compact = false
}: {
  product: Product;
  value: Personalization;
  onChange?: (value: Personalization) => void;
  compact?: boolean;
}) {
  const image = useImage(value.attachments[0]?.id);
  const bounds = useRef<HTMLDivElement>(null);
  const [layer, setLayer] = useState<'text' | 'image'>('text');
  const [drag, setDrag] = useState(false);
  const category = categoryById(product.category)!;
  const isPackaging = ['beauty', 'jewelry'].includes(product.category);
  const updatePosition = (event: PointerEvent) => {
    if (!bounds.current || !onChange) return;
    const rect = bounds.current.getBoundingClientRect();
    const x = Math.max(8, Math.min(92, Math.round((event.clientX - rect.left) / rect.width * 100)));
    const y = Math.max(8, Math.min(92, Math.round((event.clientY - rect.top) / rect.height * 100)));
    onChange({
      ...value,
      ...(layer === 'text' ? {
        x,
        y
      } : {
        imageX: x,
        imageY: y
      })
    });
  };
  return <div className={`preview-wrap ${compact ? 'compact' : ''}`}><div className={`design-preview template-${value.template === 'פרחוני' ? 'floral' : value.template === 'חגיגי' ? 'party' : 'minimal'}`} ref={bounds} style={{
      backgroundColor: value.productColor
    }} onPointerMove={e => {
      if (drag) updatePosition(e);
    }} onPointerUp={() => setDrag(false)} onPointerCancel={() => setDrag(false)}>
    <img className="preview-product" src={imagePath(product.image)} alt={t("הדמיית {0}", [t(product.title)])} />
    <div className={`print-surface surface-${product.category} ${isPackaging ? 'packaging-surface' : ''}`} aria-hidden="true" />
    {image && <img className={`uploaded-art ${onChange ? 'draggable' : ''}`} src={image} alt={t("התמונה שהוספתם להדמיה")} style={{
        left: `${value.imageX}%`,
        top: `${value.imageY}%`,
        width: `${value.imageScale * 0.24}%`
      }} onPointerDown={e => {
        if (!onChange) return;
        e.preventDefault();
        setLayer('image');
        setDrag(true);
        e.currentTarget.setPointerCapture(e.pointerId);
      }} />}
    <div className={`preview-text ${onChange ? 'draggable' : ''}`} style={{
        left: `${value.x}%`,
        top: `${value.y}%`,
        color: value.color,
        fontFamily: value.font === 'Heebo' ? 'Heebo, Tajawal, Arial, sans-serif' : value.font,
        fontSize: `${value.scale * 0.27}px`
      }} onPointerDown={e => {
        if (!onChange) return;
        e.preventDefault();
        setLayer('text');
        setDrag(true);
        e.currentTarget.setPointerCapture(e.pointerId);
      }}>
      <span className="preview-flourish">{value.template === 'פרחוני' ? '❋' : value.template === 'חגיגי' ? '✦' : ''}</span><b>{value.name || t('בדיוק בשבילך')}</b><small>{value.text || t('a little gift, a lot of love')}</small>
    </div><span className="preview-corner">{t("YOUR PERSONAL TOUCH")}</span>
  </div>{!compact && <><div className="preview-caption"><Move size={15} /><span>{onChange ? t('אפשר לגרור את הטקסט והתמונה, או להשתמש בבקרי המיקום') : t('תצוגת הבקשה האישית שלכם')}</span></div><p className="fine-print">{t("הדמיה רעיונית בלבד")}{isPackaging ? t(' של האריזה או כרטיס המתנה') : ''}{t(". מיקום ההדפסה, צבעים, אפשרויות ")}{t(category.short)}{t(" והעיצוב הסופי יאושרו עם הסטודיו.")}</p></>}</div>;
}
export function CustomizationForm({
  product,
  value,
  onChange,
  advanced = true
}: {
  product: Product;
  value: Personalization;
  onChange: (value: Personalization) => void;
  advanced?: boolean;
}) {
  const {
    toast
  } = useStore();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const category = categoryById(product.category)!;
  const set = (key: keyof Personalization, v: unknown) => onChange({
    ...value,
    [key]: v
  });
  const updateOption = (key: string, v: string) => onChange({
    ...value,
    options: {
      ...value.options,
      [key]: v,
      ...(key === 'brand' ? {
        model: '',
        modelOther: ''
      } : {})
    }
  });
  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploadError('');
    if (value.attachments.length + files.length > 10) {
      setUploadError('אפשר לצרף עד 10 תמונות לכל מוצר.');
      return;
    }
    setUploading(true);
    const added = [];
    try {
      for (const file of Array.from(files)) added.push(await saveAttachment(file));
      onChange({
        ...value,
        attachments: [...value.attachments, ...added]
      });
      toast('התמונות נשמרו בדפדפן בלבד. יש לצרף אותן ידנית ב־WhatsApp.');
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'לא ניתן להעלות את התמונה');
      if (added.length) onChange({
        ...value,
        attachments: [...value.attachments, ...added]
      });
    } finally {
      setUploading(false);
    }
  }
  return <div className="customization-form"><div className="form-row"><label>{t(category.nameLabel)}<input value={value.name} maxLength={70} placeholder={t("למשל, נועה")} onChange={e => set('name', e.target.value)} /></label><label>{t("סגנון עיצוב")}<select value={value.template} onChange={e => set('template', e.target.value)}><option value={"מינימליסטי"}>{t("מינימליסטי")}</option><option value={"פרחוני"}>{t("פרחוני")}</option><option value={"חגיגי"}>{t("חגיגי")}</option></select></label></div>
    <label>{t("מילים מהלב ")}<span className="optional">{t("(לא חובה)")}</span><textarea rows={2} value={value.text} maxLength={300} placeholder={t("משהו קטן שיגרום לחיוך…")} onChange={e => set('text', e.target.value)} /></label>
    <div className="form-row">{productFields(product).map(field => <label key={field.key}>{t(field.label)}{field.required && <span aria-hidden="true"> *</span>}{field.type === 'select' ? <select required={field.required} value={value.options[field.key] || ''} onChange={e => updateOption(field.key, e.target.value)}><option value="">{t("בחרו אפשרות")}</option>{(field.key === 'model' ? phoneModels[value.options.brand] || [] : field.options || []).map(option => <option key={option} value={option}>{t(option)}</option>)}</select> : <input type={field.type} value={value.options[field.key] || ''} onChange={e => updateOption(field.key, e.target.value)} />}</label>)}{value.options.model === 'דגם אחר' && <label>{t("דגם הטלפון המדויק *")}<input required value={value.options.modelOther || ''} onChange={e => updateOption('modelOther', e.target.value)} placeholder={t("לדוגמה: שם הדגם המלא")} /></label>}</div>
    <fieldset className="color-field"><legend>{t("גוון מבוקש ")}{['beauty', 'jewelry'].includes(product.category) ? t('לאריזה') : t('למוצר')}</legend><div className="color-options">{colors.map(color => <button type="button" key={color.value} className={value.productColor === color.value ? 'active' : ''} style={{
          backgroundColor: color.value
        }} aria-label={t(color.name)} aria-pressed={value.productColor === color.value} onClick={() => set('productColor', color.value)} title={t(color.name)} />)}<span>{t(colors.find(c => c.value === value.productColor)?.name)}</span></div></fieldset>
    {supportsPhoto(product) && <><label className={`upload-area ${uploading ? 'disabled' : ''}`}><ImagePlus size={24} /><strong>{uploading ? t('שומרים את התמונה…') : t('הוסיפו תמונה או עיצוב משלכם')}</strong><span>{t("JPG, PNG, WebP · עד 10MB לתמונה · עד 10 תמונות")}</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={uploading} onChange={e => {
          void upload(e.target.files);
          e.target.value = '';
        }} aria-label={t("העלאת תמונה לעיצוב")} /></label>{uploadError && <p role="alert" className="form-error">{localizeError(uploadError)}</p>}{value.attachments.length > 0 && <ul className="attachment-list">{value.attachments.map(a => <li key={a.id}><span>{a.name}</span><button type="button" className="icon-button" aria-label={t("הסרת {0} מהבקשה", [a.name])} onClick={() => set('attachments', value.attachments.filter(x => x.id !== a.id))}><Trash2 size={16} /></button></li>)}</ul>}<p className="fine-print">{t("התמונות נשארות במכשיר הזה. יש לצרף אותן ידנית בשיחת WhatsApp; הן אינן נשלחות אוטומטית. בהדמיה מוצגת התמונה הראשונה.")}</p></>}
    {advanced && <details className="editor-details"><summary><Move size={16} />{t("לשחק עם העיצוב")}<ChevronDown size={16} /></summary><div className="form-row"><label>{t("גופן")}<select value={value.font} onChange={e => set('font', e.target.value)}><option value="Heebo">{t("מודרני")}</option><option value="Arial">{t("קלאסי")}</option><option value="Georgia">{t("סריף (אנגלית)")}</option></select></label><label>{t("צבע טקסט")}<input type="color" value={value.color} onChange={e => set('color', e.target.value)} /></label></div>{[{
        key: 'x',
        label: 'מיקום טקסט אופקי',
        min: 8,
        max: 92
      }, {
        key: 'y',
        label: 'מיקום טקסט אנכי',
        min: 8,
        max: 92
      }, {
        key: 'scale',
        label: 'גודל הטקסט',
        min: 50,
        max: 160
      }, ...(value.attachments.length ? [{
        key: 'imageX',
        label: 'מיקום תמונה אופקי',
        min: 8,
        max: 92
      }, {
        key: 'imageY',
        label: 'מיקום תמונה אנכי',
        min: 8,
        max: 92
      }, {
        key: 'imageScale',
        label: 'גודל התמונה',
        min: 30,
        max: 200
      }] : [])].map(control => <label className="range-label" key={control.key}>{t(control.label)}<output>{value[control.key as keyof Personalization] as number}%</output><input type="range" min={control.min} max={control.max} value={value[control.key as keyof Personalization] as number} onChange={e => set(control.key as keyof Personalization, Number(e.target.value))} /></label>)}<button type="button" className="text-link" onClick={() => onChange({
        ...value,
        x: 50,
        y: 56,
        scale: 100,
        imageX: 50,
        imageY: 40,
        imageScale: 100
      })}><RotateCcw size={14} />{t("איפוס מיקומים")}</button></details>}
    <div className="quantity-row"><span>{t("כמות")}</span><div className="quantity"><button type="button" aria-label={t("הפחתת כמות")} disabled={value.quantity <= 1} onClick={() => set('quantity', Math.max(1, value.quantity - 1))}><Minus size={15} /></button><input type="number" min={1} max={999} aria-label={t("כמות")} value={value.quantity} onChange={e => set('quantity', Number(e.target.value))} /><button type="button" aria-label={t("הגדלת כמות")} disabled={value.quantity >= 999} onClick={() => set('quantity', value.quantity + 1)}><Plus size={15} /></button></div><small>{t("המחיר והזמינות יאושרו בשיחה")}</small></div>
    <label>{t("הערות לסטודיו")}<textarea maxLength={1000} rows={2} value={value.notes} placeholder={t("משהו נוסף שחשוב לנו לדעת?")} onChange={e => set('notes', e.target.value)} /></label>
    <p className="fine-print">{t("המידות, הגוונים והאפשרויות מציינים העדפה לבדיקת הסטודיו, ואינם אישור זמינות.")}{product.category === 'jewelry' ? t(' ההתאמה האישית היא לאריזה ולכרטיס; חריטה אינה כלולה.') : ''}{product.category === 'beauty' ? t(' ההתאמה היא לאריזה בלבד; אין שינוי או ייצור של הבושם.') : ''}{product.category === 'cases' ? t(' התאמה לדגם הטלפון מחייבת אישור לפני הזמנה.') : ''}</p>
  </div>;
}
export { blankPersonalization };
