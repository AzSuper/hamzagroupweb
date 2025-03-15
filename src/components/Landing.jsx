"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";
import "./landing.css";

const Landing = () => {
  const [wallpaperNumber, setWallpaperNumber] = useState(1);
  const [nextWallpaperNumber, setNextWallpaperNumber] = useState(2);
  const [transitioning, setTransitioning] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setWallpaperNumber((prevNumber) => (prevNumber === 8 ? 1 : prevNumber + 1));
        setNextWallpaperNumber((prevNumber) => (prevNumber === 8 ? 1 : prevNumber + 1));
        setTransitioning(false);
      }, 1000);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setNextWallpaperNumber((prevNumber) => (wallpaperNumber === 8 ? 1 : wallpaperNumber + 1));
  }, [wallpaperNumber]);

  return (
    <div
      key={locale} // This key will force re-render when locale changes
      className="landing"
    >
      {/* Active wallpaper */}
      <div className={`wallpaper-container ${transitioning ? "fade-out" : ""}`}>
        <Image
          src={`/images/${wallpaperNumber}.jpg`}
          alt="Wallpaper"
          fill
          priority
          quality={85}
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      {/* Preload next wallpaper */}
      <div className={`wallpaper-container ${transitioning ? "fade-in" : "hidden"}`}>
        <Image
          src={`/images/${nextWallpaperNumber}.jpg`}
          alt="Next Wallpaper"
          fill
          quality={85}
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
      </div>

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
