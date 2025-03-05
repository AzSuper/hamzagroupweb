"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { featuresData, Feature } from "../constant/featuresData";
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";

const Counter = ({ value, className }: { value: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px", // Adjusted margin for better visibility on small devices
    amount: 0.1 // Trigger when even a small part of the element is in view
  });
  
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const startValue = 0;
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds duration
    
    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        // Use easeOutQuad for a smoother animation
        const easeOutQuad = progress * (2 - progress);
        const currentValue = Math.floor(startValue + easeOutQuad * (value - startValue));
        setDisplayValue(currentValue);
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };
    
    // Only start animation when in view
    if (isInView) {
      animationFrameId = requestAnimationFrame(updateCounter);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, value]);
  
  return (
    <span ref={ref} className={className}>
      +{displayValue}
    </span>
  );
};

const LowBanner = () => {
  const { locale } = useLocale();
  const [features] = useState<Feature[]>(featuresData);
  
  return (
    <div className="w-full xl:h-[100px] md:h-[100px] sm:h-fit bg-[#0e0e0e] flex md:flex-row flex-col xl:flex-row gap-[28px] xl:items-center md:items-center md:pl-[75px] md:pr-[75px] xl:pl-[75px] xl:pr-[75px] justify-center py-7 px-4">
      {features.map((feature) => (
        <div key={feature.id} className="flex flex-row items-center">
          <div className="flex xl:items-center md:items-center items-end gap-2 flex-row">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-2 xl:w-[52px] md:w-[48px] w-[32px] mr-2"
            >
              <img src={feature.icon} alt="" className="w-full" />
            </motion.div>
            <div className="flex flex-col">
              <div className="text-xl xl:text-3xl md:text-2xl font-bold text-white">
                <Counter 
                  value={feature.count} 
                  className="block" 
                />
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="xl:text-sm md:text-[10px] text-white"
              >
                {t(feature.translationKey, locale)}
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LowBanner;
