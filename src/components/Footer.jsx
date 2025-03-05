"use client"

import { Facebook,Twitter, Instagram } from 'lucide-react';
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";

const footerLink = [{
  link:"/",
  label:"Home",
  translatekey:"footer.company"
},
{
  link:"/about",
  label:"About",
   translatekey:"footer.about"
},
{
  link:"/products",
  label:"Product",
   translatekey:"footer.product"
},
{
  link:"/contact",
  label:"Contact",
  translatekey:"footer.contact"
}]


const Footer = () => {

  const {locale} = useLocale();
  return (
    <footer className="bg-black text-gray-300 pb-10 px-5 md:px-20 pt-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Social Media */}
        <div>
          <img
            src="/assets/hamza-logo.png"
            className="max-w-48 h-auto"
            alt=""
          />
          <p className="text-sm mt-3">{t("footer.slogan", locale)}</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="p-2 bg-gray-800 rounded">
              <i className="fab fa-facebook text-blue-400"><Facebook /></i>
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded">
              <i className="fab fa-twitter text-blue-400"><Twitter /></i>
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded">
             <i className="fab fa-instagram text-blue-400"><Instagram /></i>
            </a> 
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <ul className="space-y-3">
            {footerLink.map((ink, index) => (
              <li
                key={index}
                className="flex items-center gap-2 transform transition-all duration-300 hover:pl-3 cursor-pointer !w-fit"
              >
                <a href={ink.link}><span className="text-blue-400">&raquo;</span> {t(ink.translatekey, locale)}{" "}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <div className="flex items-center gap-2">
            <div className="overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d359.7967887570887!2d36.19220627943085!3d33.53941452017542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518dea3fde8e6b5%3A0x9637356d7ad174c2!2z2KfZhNin2LPZiNin2YIg2Ygg2KfZhNmF2K7Yp9iy2YYg2KfZhNmF2LHZg9iy2YrYqQ!5e0!3m2!1sen!2snl!4v1740731611988!5m2!1sen!2snl"
                width={600}
                height={450}
                style={{ border: 0, width: "100%", height: "auto" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-green-400">&#x23F0;</span>
            <p>{t("footer.activehour",locale)}</p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-green-400">&#128231;</span>
            <p>hamzagroup145@gmail.com</p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-blue-400">&#x260E;</span>
            <div>
              <p>+963 998 768 696</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-blue-400 mt-10 border-t border-gray-700 pt-5">
       By Mohammad Abo Zamel
      </div>
    </footer>
  );
};

export default Footer;
