import en from "../../messages/en.json";
import ar from "../../messages/ar.json";

const translations = { en, ar };

export function t(key: string, locale: "en" | "ar" = "en") {
  // Split the key and navigate through nested objects
  const keys = key.split('.');
  return keys.reduce((obj: any, k) => obj?.[k], translations[locale]) || key;
}