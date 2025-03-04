"use client"

import React from 'react'
import Image from 'next/image';
import ActionButton from "../components/ActionButton"
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";

const AboutIntro = () => {
    const { locale } = useLocale();
  
  return (
    <div className="relative flex flex-row justify-between h-screen w-full overflow-x-hidden items-center xl:mt-16 bg-slate-100">
    <div className="flex flex-col md:w-full xl:w-[45%] w-full h-fit pr-4 pl-4 xl:pl-[108px]">
      <h1 className="text-[48px] font-bold pb-2 text-[#0e0e0e]">
        {t("aboutus.toptitle", locale)}
      </h1>
      <h3 className="text-[18px] font-medium pb-4 text-[#0e0e0e]">
      {t("aboutus.topsubtitle", locale)}

      </h3>
      <ActionButton title={t("aboutus.button", locale)} link="http://10.2.0.2:3000/contact"/>
    </div>
    <div className="relative pl-3 flex-1">
      {/* Make sure the parent div has no overflow:hidden */}
      <div className="absolute hidden xl:block md:hidden bg-yellow-500 w-full !h-[500px] md:w-2/3 md:h-2/3 top-1/2 transform -translate-y-1/2 left-0 z-0" />
      <Image
        width={739}
        height={553}
        src="/images/imagepromo.png"
        alt="container photo"
        className="relative z-10 hidden xl:block md:hidden"
      />
    </div>
  </div>
  )
}

export default AboutIntro