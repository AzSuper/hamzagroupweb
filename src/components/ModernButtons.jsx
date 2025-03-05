"use client"
import React from 'react';
import { Grid3x3, BrickWall, SprayCan, SwatchBook } from 'lucide-react';
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";

const ModernButtons = ({ setActiveFilter }) => {
  const { locale } = useLocale();

  return (
    <div className="flex flex-wrap gap-4 p-6 mb-4 bg-gray-100 rounded-lg">
      <button 
        onClick={() => setActiveFilter('all')}
        className="group flex flex-col items-center justify-center w-32 h-32 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-500 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex flex-col items-center relative z-10 transition-all duration-300 group-hover:transform group-hover:translate-y-2">
          <Grid3x3 className="w-8 h-8 mb-2 text-gray-700 group-hover:text-white transition-colors duration-300" />
          <p className="font-medium text-gray-800 group-hover:text-white transition-colors duration-300">{t("product.actbtn1", locale)}</p>
        </div>
      </button>
      <button 
        onClick={() => setActiveFilter('raw-material')}
        className="group flex flex-col items-center justify-center w-32 h-32 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-amber-500 hover:to-red-500 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex flex-col items-center relative z-10 transition-all duration-300 group-hover:transform group-hover:translate-y-2">
          <BrickWall className="w-8 h-8 mb-2 text-gray-700 group-hover:text-white transition-colors duration-300" />
          <p className="font-medium text-gray-800 group-hover:text-white transition-colors duration-300">{t("product.actbtn2", locale)}</p>
        </div>
      </button>
      <button 
        onClick={() => setActiveFilter('fragrance')}
        className="group flex flex-col items-center justify-center w-32 h-32 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-teal-500 hover:to-emerald-500 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex flex-col items-center relative z-10 transition-all duration-300 group-hover:transform group-hover:translate-y-2">
          <SprayCan className="w-8 h-8 mb-2 text-gray-700 group-hover:text-white transition-colors duration-300" />
          <p className="font-medium text-gray-800 group-hover:text-white transition-colors duration-300">{t("product.actbtn3", locale)}</p>
        </div>
      </button>
      <button 
        onClick={() => setActiveFilter('colors')}
        className="group flex flex-col items-center justify-center w-32 h-32 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-pink-500 hover:to-indigo-500 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex flex-col items-center relative z-10 transition-all duration-300 group-hover:transform group-hover:translate-y-2">
          <SwatchBook className="w-8 h-8 mb-2 text-gray-700 group-hover:text-white transition-colors duration-300" />
          <p className="font-medium text-gray-800 group-hover:text-white transition-colors duration-300">{t("product.actbtn4", locale)}</p>
        </div>
      </button>
    </div>
  );
};

export default ModernButtons;
