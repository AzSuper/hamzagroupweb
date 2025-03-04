"use client";
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";
import ActionButton from "../components/ActionButton"

const Bref = () => {
    const { locale } = useLocale();

  return (
    <section className="flex items-center justify-center bg-gray-100 py-16 px-8">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12">
        {/* Image with colored borders */}
        <div className="relative w-full lg:w-1/2">
          <div className="absolute bg-[#283B79] hidden xl:w-full xl:block !h-[600px] md:w-2/3 md:h-2/3 top-1/2 transform -translate-y-1/2 -left-10 z-0" />
          <div className="absolute bg-[#DAB946] hidden xl:w-full xl:block !h-[600px] md:w-2/3 md:h-2/3 top-1/2 transform -translate-y-1/2 -right-10 z-0" />
          <img
            src="/images/walking.png"
            alt="Shipping Containers"
            className="hidden xl:w-full xl:block h-auto shadow-lg z-40 relative"
          />
        </div>
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-left pl-7">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
             {t("aboutus.bottomtitle", locale)}
          </h2>
          <p className="text-gray-700 text-lg mb-4">
          {t("aboutus.p1", locale)}
          </p>
          <p className="text-gray-700 text-lg mb-4">
          {t("aboutus.p2", locale)}
          </p>
          {/* Button */}
          <ActionButton title={t("aboutus.button", locale)} link={"http://10.2.0.2:3000/contact"}/>
        </div>
      </div>
    </section>
  );
};

export default Bref;
