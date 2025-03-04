"use client";

import React, { useState, useEffect, Key } from "react";
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";
import "./landing.css";

const Landing = () => {
  const [wallpaperNumber, setWallpaperNumber] = useState(1);
  const [backgroundImage, setBackgroundImage] = useState(
    `url('/images/${wallpaperNumber}.jpg')`
  );

  const { locale } = useLocale();

  useEffect(() => {
    const interval = setInterval(() => {
      setWallpaperNumber((prevNumber) => (prevNumber === 8 ? 1 : prevNumber + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBackgroundImage(`url('/images/${wallpaperNumber}.jpg')`);
    }, 500);
    return () => clearTimeout(timeout);
  }, [wallpaperNumber]);

  return (
    <div
      key={locale} // This key will force re-render when locale changes
      className="landing"
      style={{
        backgroundImage: backgroundImage,
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div
        className="overlay"
        style={{ backgroundImage: "url('/assets/bottleShape.png')" }}
      ></div>
      <div className="text">
        <div className="content">
          <h1 className="first text-2xl font-black text-white">
            {t("landing.headline", locale)}
          </h1>
          <p className="text-white">{t("landing.subheadline", locale)}</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;