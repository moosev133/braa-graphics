import { t } from "./i18n";
import { useState } from 'react';
import { Check, Copy, Download, MessageCircle } from 'lucide-react';
import { inquiryMessage, newReference, whatsappUrl, type BasketItem } from './order';
import { useStore } from './state';
export default function Inquiry({
  items,
  notes = ''
}: {
  items: BasketItem[];
  notes?: string;
}) {
  const [reference] = useState(newReference);
  const [copied, setCopied] = useState(false);
  const {
    toast
  } = useStore();
  const message = inquiryMessage(items, reference, notes);
  const longMessage = message.length > 6000;
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      toast('פרטי הבקשה הועתקו. אפשר להדביק בשיחת WhatsApp.');
    } catch {
      toast('העתקה אוטומטית אינה זמינה. סמנו את הטקסט בתיבה והעתיקו.');
    }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([message], {
      type: 'text/plain;charset=utf-8'
    }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reference}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <section className="inquiry-panel"><span className="eyebrow">{t("כמעט שם")}</span><h3>{t("בודקים רגע, ושולחים לסטודיו.")}</h3><p>{t("זו בקשת הצעת מחיר. הזמנה תתואם ותאושר בשיחה אישית.")}</p><details><summary>{t("לצפייה בכל פרטי ההודעה ")}<span dir="ltr">{reference}</span></summary><textarea className="message-preview" rows={12} value={message} readOnly aria-label={t("פרטי הפנייה ל־WhatsApp")} /></details><div className="inquiry-tools"><button className="text-link" onClick={() => void copy()}>{copied ? <Check size={16} /> : <Copy size={16} />}{t("העתקת הבקשה")}</button><button className="text-link" onClick={download}><Download size={16} />{t("שמירת הבקשה")}</button></div>{longMessage && <p className="notice">{t("זו בקשה ארוכה. העתיקו או שמרו אותה, ואז הדביקו או צרפו את הקובץ בשיחת WhatsApp.")}</p>}<a className="button whatsapp full" href={whatsappUrl(longMessage ? t("היי BRAA GRAPHIX, אשמח להצעת מחיר. מספר פנייה: {0}. אצרף מיד את פרטי הבקשה המלאים.", [reference]) : message)} target="_blank" rel="noreferrer"><MessageCircle size={19} />{t("פתיחת הבקשה ב־WhatsApp")}</a><p className="fine-print">{t("פתיחת WhatsApp אינה אישור הזמנה. תמונות שהעליתם אינן נשלחות — יש לצרף אותן ידנית בשיחה.")}</p></section>;
}
