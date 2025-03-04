"use client";

import Link from "next/link";
import { Globe, Search, Loader2, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";
import SearchPopup from "./SearchPopup";

// Product interface
interface Product {
  id: number;
  name: string;
  desc: string;
  category: string;
  pdf_path: string;
  image_path: string;
  pdf_link: string;
  image_link: string;
}

const Navbar = () => {
  const { locale, changeLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isChangingLang, setIsChangingLang] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const pathname = usePathname();

  // Menu items
  const menuItems = [
    { label: "COMPANY", href: "/", translationKey: "navbar.company" },
    { label: "ABOUT", href: "/about", translationKey: "navbar.about" },
    { label: "PRODUCT", href: "/products", translationKey: "navbar.product" },
    { label: "CONTACT", href: "/contact", translationKey: "navbar.contact" },
  ];

  // Languages
  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ar", label: "العربية", flag: "\uD83C\uDDF8\uD83C\uDDE6" },
  ];

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
  };

  // Download PDF function
  const downloadPDF = (pdfUrl: string, productName: string) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute(
      "download",
      `${productName.replace(/\s+/g, "_")}_description.pdf`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Scroll and mount effects
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Language change handler
  const handleLanguageChange = (langCode: string) => {
    setIsChangingLang(true);
    try {
      changeLocale(langCode);
      setIsLangOpen(false);
      toast.success(
        `Language changed to ${langCode === "en" ? "English" : "Arabic"}`,
        {
          position: "top-right",
        }
      );
    } catch (error) {
      console.error("Failed to change language", error);
      toast.error("Failed to change language", {
        position: "top-right",
      });
    } finally {
      setIsChangingLang(false);
    }
  };

  // Loading state
  if (!mounted) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0e0e0e]/80 backdrop-blur-[20px] flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-[#efefef] animate-spin" />
      </div>
    );
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? pathname === "/"
              ? "bg-[#0e0e0e]/80 backdrop-blur-[20px]"
              : "bg-[#ffffff]/80 backdrop-blur-[20px]"
            : pathname === "/"
            ? ""
            : "bg-[#ffffff]/80 backdrop-blur-[20px]"
        }`}
        dir={"ltr"}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  className="w-28 md:w-32 xl:w-36"
                  src={`${
                    pathname == "/"
                      ? "/assets/hamza-logo.png"
                      : "/assets/hamza-logo-black.png"
                  } `}
                  alt="logo"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium ${
                    scrolled
                      ? pathname === "/"
                        ? "text-[#ffffff]"
                        : "text-[#0e0e0e]"
                      : pathname === "/"
                      ? "text-[#ffffff]"
                      : "text-[#0e0e0e]"
                  } hover:font-bold transition-[font-weight]`}
                >
                  {t(item.translationKey, locale)}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Dropdown */}
              <div className="relative lang-dropdown">
                <button
                  className={`p-2 rounded-full ${
                    pathname == "/"
                      ? "hover:bg-[#0e0e0e]"
                      : "hover:bg-slate-100"
                  } transition-colors relative`}
                  aria-label="Language"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLangOpen(!isLangOpen);
                  }}
                  disabled={isChangingLang}
                >
                  <Globe
                    className={`h-5 w-5 ${
                      pathname == "/" ? "text-[#efefef]" : "text-gray-950"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            className={`block w-full text-left px-4 py-2 text-sm text-gray-700 ${
                              pathname == "/"
                                ? "hover:bg-[#0e0e0e]"
                                : "hover:bg-slate-100"
                            } flex items-center space-x-2 ${
                              locale === lang.code ? "bg-gray-50" : ""
                            }`}
                            onClick={() => handleLanguageChange(lang.code)}
                            disabled={isChangingLang}
                          >
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                            {locale === lang.code && (
                              <span className="ml-auto text-blue-600">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Button */}
              <button
                className={`p-2 rounded-full ${
                  pathname == "/" ? "hover:bg-[#0e0e0e]" : "hover:bg-slate-100"
                } transition-colors`}
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search
                  className={`h-5 w-5 ${
                    pathname == "/" ? "text-[#efefef]" : "text-gray-950"
                  }`}
                />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full"
                aria-label="Search"
              >
                <Search
                  className={`h-5 w-5 ${
                    pathname == "/" ? "text-[#efefef]" : "text-gray-950"
                  }`}
                />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  pathname == "/" ? "text-[#efefef]" : "text-gray-950"
                } hover:bg-gray-100`}
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
              >
                                 {t(item.translationKey, locale)}

              </Link>
            ))}
            <div className="flex flex-col space-y-2 px-3 py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded-md ${
                    locale === lang.code ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleLanguageChange(lang.code)}
                  disabled={isChangingLang}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Popup */}
      <SearchPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductSelect={(product) => setSelectedProduct(product)}
      />

      {/* Product Modal */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <>
            <DialogTitle className="sr-only">
              Product Details: {selectedProduct.name}
            </DialogTitle>
            <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
              <div className="grid md:grid-cols-2 grid-cols-1">
                {/* Product image container */}
                <div className="aspect-square w-full h-full relative overflow-hidden">
                  {/* QR Code Container */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-40 pointer-events-none">
                    <div className="bg-white/30 backdrop-blur-md p-4 rounded-lg pointer-events-auto">
                      <div className="text-center flex flex-col items-center">
                        <QRCodeSVG
                          value={selectedProduct.pdf_link}
                          size={128}
                        />
                        <button
                          onClick={() =>
                            downloadPDF(
                              selectedProduct.pdf_link,
                              selectedProduct.name
                            )
                          }
                          className="text-sm mt-2 text-gray-600 hover:text-blue-500 flex items-center justify-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          Download Description
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${selectedProduct.image_link})`,
                    }}
                  />
                </div>

                {/* Product details container */}
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    {selectedProduct.desc}
                  </p>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                          Full Name:
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedProduct.name}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                          ID:
                        </h3>
                        <p className="text-sm text-gray-600">
                          #{selectedProduct.id}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                          Category:
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedProduct.category}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                          Source:
                        </h3>
                        <p className="text-sm text-gray-600">Eco-friendly</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Sample:
                      </h3>
                      <p className="text-sm text-gray-600">
                        Available upon request
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Applicant:
                      </h3>
                      <p className="text-sm text-gray-600">
                        Material Research Team
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default Navbar;
