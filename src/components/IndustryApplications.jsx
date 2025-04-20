"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PharmaIcon from "../../public/assets/pharmaIcon.svg";
import VectorIcon from "../../public/assets/vector.svg";
import FoodIndustryIcon from "../../public/assets/foodIndustry.svg";
import IndustryIcon from "../../public/assets/industryIcon.svg";
import FurnitureIcon from "../../public/assets/furniture.svg";
import AlmeskahLogo from "../../public/images/almeskahLogo.png";
import AlbatolLogo from "../../public/images/albatolLogo.png";
import MilliaLogo from "../../public/images/milliaLogo.png";
import NouraLogo from "../../public/images/nouraLogo.png";
import WinnerLogo from "../../public/images/winnerLogo.png";
import HafhafeLogo from "../../public/images/hafhafeLogo.png";
import MilliaLogo1 from "../../public/images/milliaLogo-1.png";
import HamolLogo from "../../public/images/hamolLogo.png";
import NewGinoLogo from "../../public/images/newginoLogo.png";
import PoztronLogo from "../../public/images/poztronLogo.png";
import RootsLogo from "../../public/images/roots.jpeg";
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";

const IndustryApplications = () => {
  const { locale } = useLocale();
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const industries = [
    {
      icon: PharmaIcon,
      name: t("landing.applications.list.one", locale),
      color: "from-blue-500/20 to-cyan-400/10",
    },
    {
      icon: VectorIcon,
      name: t("landing.applications.list.two", locale),
      color: "from-purple-500/20 to-pink-400/10",
    },
    {
      icon: FoodIndustryIcon,
      name: t("landing.applications.list.three", locale),
      color: "from-green-500/20 to-emerald-400/10",
    },
    {
      icon: IndustryIcon,
      name: t("landing.applications.list.four", locale),
      color: "from-amber-500/20 to-yellow-400/10",
    },
    {
      icon: FurnitureIcon,
      name: t("landing.applications.list.five", locale),
      color: "from-red-500/20 to-orange-400/10",
    },
  ];

  const handleIndustryChange = (index) => {
    if (index === activeIndustry) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndustry(index);
      setIsAnimating(false);
    }, 300);
  };

  const clientLogos = [
    { logo: AlmeskahLogo, alt: "almeskha" },
    { logo: AlbatolLogo, alt: "albatol" },
    { logo: MilliaLogo, alt: "Millia" },
    { logo: NouraLogo, alt: "noura" },
    { logo: WinnerLogo, alt: "Winner" },
    { logo: HafhafeLogo, alt: "hafhafe" },
    { logo: MilliaLogo1, alt: "Milliac" },
    { logo: HamolLogo, alt: "hamol" },
    { logo: NewGinoLogo, alt: "new gino" },
    { logo: PoztronLogo, alt: "poztron" },
    { logo: RootsLogo, alt: "roots" },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* SplashCursor with customized properties */}

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Main Content */}
        <div className="flex flex-col items-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            {t("landing.applications.title", locale)}
          </h1>
          <p className="text-lg text-center max-w-3xl mb-12 text-gray-300">
            {t("landing.applications.description", locale)}
          </p>
          <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center">
            {t("landing.applications.subtitle", locale)}
          </h2>
        </div>

        {/* Industry Selection */}
        <div className="flex flex-col lg:flex-row gap-12 mb-24">
          {/* Left: Industry Icons */}
          <div className="lg:w-1/3">
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 mb-2 rounded-xl transition-all duration-300 cursor-pointer
                                        ${
                                          activeIndustry === index
                                            ? `bg-gradient-to-r ${industry.color} border border-gray-700`
                                            : "hover:bg-gray-800/50"
                                        }`}
                  onClick={() => handleIndustryChange(index)}
                >
                  <div
                    className={`p-3 rounded-lg bg-gray-800 ${
                      activeIndustry === index
                        ? "bg-opacity-70"
                        : "bg-opacity-30"
                    }`}
                  >
                    <Image
                      src={industry.icon}
                      width={24}
                      height={24}
                      alt={industry.name}
                      className="w-6 h-6"
                    />
                  </div>
                  <span
                    className={`font-medium ${
                      activeIndustry === index ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {industry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Industry Details */}
          <div className="lg:w-2/3">
            <div
              className={`h-full bg-gradient-to-br ${
                industries[activeIndustry].color
              } p-8 rounded-2xl border border-gray-800 transition-opacity duration-300 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-white/10 backdrop-blur-md">
                  <Image
                    src={industries[activeIndustry].icon}
                    width={32}
                    height={32}
                    alt={industries[activeIndustry].name}
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="text-2xl font-bold">
                  {industries[activeIndustry].name}
                </h3>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-200">
                  {t("landing.applications.industryDescription", locale, {
                    industry: industries[activeIndustry].name.toLowerCase(),
                  })}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                    <h4 className="font-semibold mb-2">
                      {t("landing.applications.keyBenefits.title", locale)}
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>
                        • {t("landing.applications.keyBenefits.item1", locale)}
                      </li>
                      <li>
                        • {t("landing.applications.keyBenefits.item2", locale)}
                      </li>
                      <li>
                        • {t("landing.applications.keyBenefits.item3", locale)}
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                    <h4 className="font-semibold mb-2">
                      {t(
                        "landing.applications.industryApplications.title",
                        locale
                      )}
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>
                        •{" "}
                        {t(
                          "landing.applications.industryApplications.item1",
                          locale
                        )}
                      </li>
                      <li>
                        •{" "}
                        {t(
                          "landing.applications.industryApplications.item2",
                          locale
                        )}
                      </li>
                      <li>
                        •{" "}
                        {t(
                          "landing.applications.industryApplications.item3",
                          locale
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            {t("landing.clients.title", locale)}
          </h2>

          <div className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {clientLogos.map((client, index) => (
                <div
                  key={index}
                  className="aspect-square flex items-center justify-center p-4 bg-black/20 rounded-xl backdrop-blur-md border border-gray-800 transition-all duration-300 hover:scale-105 hover:border-gray-700 hover:bg-black/30"
                >
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={100}
                    height={80}
                    className="w-full h-auto object-contain max-h-16"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background gradients */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-purple-500/10 blur-[100px] rounded-full"></div>
    </div>
  );
};

export default IndustryApplications;
