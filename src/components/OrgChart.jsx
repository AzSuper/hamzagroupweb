"use client"
import React, { useState, useEffect } from 'react';
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";

const OrgChart = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const employees = {
    founders: [
      { name: "Mahmoud Hamzeh", title: "Founder" },
      { name: "Mustafa Hamzeh", title: "CEO" }
    ],
    management: [
      { name: "Mohammad Alsaeedi", title: "Sales Manager" }
    ],
    departments: [
      {
        name: "Warehouse",
        employees: [
          { name: "Belal Bdair", title: "Warehouse Staff" ,pos:"Warehouse Staff1" },
          { name: "Wesam Abozahra", title: "Warehouse Staff",pos:"Warehouse Staff2" }
        ]
      },
      {
        name: "Accounting",
        employees: [
          { name: "Ghassam Odeh", title: "Accountant" , pos:"Accountant" }
        ]
      },
      {
        name: "Sales",
        employees: [
          { name: "Qamar Almogharbi", title: "Sales Staff",pos:"Sales Staff1" },
          { name: "Shahira Alsaeedi", title: "Sales Staff",pos:"Sales Staff2" },
          { name: "Wesam Abozahra", title: "Sales Staff (Dual Role)",pos:"Sales Staff3" }
        ]
      }
    ]
  };

  // Abstract animation circles
  const circleCount = 12;
  const circles = Array.from({ length: circleCount }, (_, i) => i);
  const { locale } = useLocale();
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-xl max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">{t("organazation.title", locale)}</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Organizational Tree */}
        <div className="w-full lg:w-1/2 p-4">
          {/* Leadership Level */}
          <div className={`flex flex-wrap justify-center mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 transform translate-y-10'}`}>
            {employees.founders.map((founder, index) => (
              <div key={index} className="mx-3 mb-4">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-3 rounded-lg shadow-lg text-center w-48 transition-all hover:shadow-2xl hover:scale-105 duration-300">
                  <h3 className="font-bold text-lg">{t(`organazation.member.${founder.title}.name`, locale)}</h3>
                  <p className="text-blue-100">{t(`organazation.member.${founder.title}.position`, locale)}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Connector Line */}
          
          {/* Middle Management */}
          <div className={`flex justify-center mb-10 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0 transform translate-y-10'}`}>
            {employees.management.map((manager, index) => (
              <div key={index} className="mx-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-3 rounded-lg shadow-lg text-center w-48 transition-all hover:shadow-2xl hover:scale-105 duration-300">
                <h3 className="font-bold text-lg">{t(`organazation.member.${manager.title}.name`, locale)}</h3>
                <p className="text-blue-100">{t(`organazation.member.${manager.title}.position`, locale)}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Connector Lines to Departments */}
          
          
          {/* Departments Level */}
          <div className="flex flex-wrap justify-center gap-4">
            {employees.departments.map((departmen, deptIndex) => (
              <div key={deptIndex} className={`transition-all duration-1000 delay-${1000 + (deptIndex * 200)} ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                <div className="text-center mb-3">
                  <h3 className="font-semibold text-indigo-700 bg-indigo-100 rounded-full px-4 py-1 inline-block">{t(`organazation.department${deptIndex + 1}`, locale)}</h3>
                </div>
                {departmen.employees.map((employee, empIndex) => (
                  <div key={empIndex} className={`mb-3 transition-all delay-${1200 + (empIndex * 100)} duration-500 ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-5'}`}>
                    <div className="bg-white border border-indigo-200 p-2 rounded-lg shadow text-center hover:bg-indigo-50 transition-all duration-300 hover:shadow-md">
                      <h4 className="font-medium text-indigo-800">{t(`organazation.member.${employee.pos}.name`, locale)}</h4>
                      <p className="text-sm text-gray-600">{t(`organazation.member.${employee.pos}.position`, locale)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Side - Abstract Animation */}
        <div className="w-full lg:w-1/2 p-4 flex items-center justify-center relative overflow-hidden rounded-xl h-96 lg:h-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 opacity-90"></div>
          
          {/* Abstract geometric elements */}
          <div className="relative w-full h-full">
            {/* Network of lines to represent connections */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="20" y1="20" x2="80" y2="40" strokeWidth="0.2" stroke="rgba(255,255,255,0.3)" className={`transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
              <line x1="80" y1="20" x2="20" y2="40" strokeWidth="0.2" stroke="rgba(255,255,255,0.3)" className={`transition-all duration-1500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
              <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.2" stroke="rgba(255,255,255,0.3)" className={`transition-all duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
              <line x1="20" y1="60" x2="80" y2="80" strokeWidth="0.2" stroke="rgba(255,255,255,0.3)" className={`transition-all duration-2500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
              <line x1="80" y1="60" x2="20" y2="80" strokeWidth="0.2" stroke="rgba(255,255,255,0.3)" className={`transition-all duration-3000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
            </svg>
            
            {/* Moving circles to represent team members */}
            {circles.map((circle, index) => {
              // Calculate dynamic positions based on index for variety
              const size = 6 + (index % 4) * 3;
              const delay = index * 200;
              const duration = 20 + (index % 10) * 5;
              const opacity = 0.5 + (index % 5) * 0.1;
              
              return (
                <div 
                  key={index} 
                  className={`absolute rounded-full bg-white shadow-lg transition-all duration-1000 animate-pulse`}
                  style={{
                    width: `${size}px`, 
                    height: `${size}px`,
                    left: `${15 + (index % 7) * 12}%`,
                    top: `${10 + (index % 5) * 18}%`,
                    opacity: opacity,
                    animation: `float-${index} ${duration}s infinite alternate ease-in-out`,
                    animationDelay: `${delay}ms`,
                    boxShadow: `0 0 ${size * 2}px rgba(255,255,255,${opacity})`,
                  }}
                />
              );
            })}
            
            {/* Central element representing team unity */}
            <div className={`absolute left-1/2 top-1/2 w-32 h-32 -ml-16 -mt-16 transition-all duration-2000 ${isLoaded ? 'opacity-90 scale-100' : 'opacity-0 scale-50'}`}>
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-2 bg-indigo-300 rounded-full opacity-40 animate-pulse"></div>
              <div className="absolute inset-4 bg-blue-400 rounded-full opacity-60"></div>
              <div className="absolute inset-6 bg-indigo-500 rounded-full opacity-80"></div>
              <div className="absolute inset-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                <span className="text-xs">{t("organazation.sloganMid", locale)}</span>
              </div>
            </div>
            
            {/* Text overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white text-opacity-90 transition-all duration-3000 delay-1000 text-center">
              <p className={`text-lg font-light ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>{t("organazation.sloganBottom", locale)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgChart;
