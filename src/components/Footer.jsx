"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Clock,
  Mail,
  Phone,
} from "lucide-react";
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";
import { useState } from "react";

const footerLinks = [
  {
    link: "/",
    label: "Home",
    translatekey: "footer.company",
  },
  {
    link: "/about",
    label: "About",
    translatekey: "footer.about",
  },
  {
    link: "/products",
    label: "Product",
    translatekey: "footer.product",
  },
  {
    link: "/contact",
    label: "Contact",
    translatekey: "footer.contact",
  },
];

const Footer = () => {
  const { locale } = useLocale();
  const [activeLocation, setActiveLocation] = useState(0);

  const locations = [
    {
      name: t("footer.fac", locale),
      mapUrl:
        "https://www.google.com/maps/place/ميليا%E2%80%AD/@33.6193749,36.588975,17z/data=!3m1!4b1!4m6!3m5!1s0x1518f50022b84077:0x327d7d6076913f88!8m2!3d33.6193749!4d36.588975!16s%2Fg%2F11vyysbfmy?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
      address: "Factory Location, Damascus, Syria",
    },
    {
      name: t("footer.store", locale),
      mapUrl:
        "https://www.google.com/maps/place/33°30'18.2"N+36°18'45.2"E/@33.5050447,36.3125334,20.5z/data=!4m4!3m3!8m2!3d33.505061!4d36.312553?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D8",
      address: "Store Location, Damascus, Syria",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-200 pb-10 px-5 md:px-10 lg:px-20 pt-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600"></div>
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-900/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-blue-800/10 blur-3xl"></div>

      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
          {/* Logo & Social Media */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/hamza-logo.png"
                className="max-w-40 h-auto"
                alt="Hamza Group Logo"
              />
            </div>
            <p className="text-base leading-relaxed text-gray-300">
              {t("footer.slogan", locale)}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 bg-blue-900/30 hover:bg-blue-800 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Facebook className="text-blue-400 h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-blue-900/30 hover:bg-blue-800 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Twitter className="text-blue-400 h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-blue-900/30 hover:bg-blue-800 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Instagram className="text-blue-400 h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:pl-8">
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-blue-500/30 inline-block">
              {t("footer.quicklinks", locale) || "Quick Links"}
            </h3>
            <ul className="space-y-4">
              {footerLinks.map((link, index) => (
                <li
                  key={index}
                  className="transition-all duration-300 hover:translate-x-2"
                >
                  <a
                    href={link.link}
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 group"
                  >
                    <span className="text-blue-400 transition-all duration-300 group-hover:pl-1">
                      &raquo;
                    </span>
                    <span>{t(link.translatekey, locale)}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-blue-500/30 inline-block">
                {t("footer.contactus", locale) || "Contact Us"}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="text-blue-400 mt-1 h-5 w-5" />
                  <p className="text-sm">{t("footer.activehour", locale)}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-blue-400 mt-1 h-5 w-5" />
                  <p className="text-sm">hamzagroup145@gmail.com</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-blue-400 mt-1 h-5 w-5" />
                  <p className="text-sm">+963 998 768 696</p>
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-blue-500/30 inline-block">
              {t("footer.ourlocations", locale) || "Our Locations"}
            </h3>

            {/* Location Tabs */}
            <div className="flex gap-2 mb-4">
              {locations.map((location, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLocation(index)}
                  className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all ${
                    activeLocation === index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>

            {/* Map Container */}
            <div className="rounded-lg overflow-hidden border-2 border-gray-800 shadow-lg">
              <iframe
                src={locations[activeLocation].mapUrl}
                width={600}
                height={225}
                style={{ border: 0, width: "100%" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
            <div className="flex items-start gap-3 mt-2">
              <MapPin className="text-blue-400 mt-1 h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{locations[activeLocation].address}</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <div className="text-blue-400 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; {new Date().getFullYear()} Hamza Group. All rights
              reserved.
            </p>
            <p className="mt-2 md:mt-0">Designed by Mohammad Abo Zamel</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
