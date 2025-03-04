"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useLocale() {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const router = useRouter();

  useEffect(() => {
    // Get saved locale or default to 'en'
    const savedLocale = localStorage.getItem("locale") as "en" | "ar" || "en";
    setLocale(savedLocale);
  }, []);

  function changeLocale(newLocale: "en" | "ar") {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    
    // Force a page reload to apply the locale change
    window.location.reload();
  }

  return { locale, changeLocale };
}
