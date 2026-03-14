"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Search,
  Moon,
  Droplet,
  Wind,
  Eye,
  Sun,
  Cloud,
  CloudRain
} from 'lucide-react';
import Image from 'next/image';
import logoSrc from '@/assets/logo.png';

const forecastData = [
  {
    day: 'Mon',
    icon: 'Sun',
    high: '22°',
    low: '15°',
    condition: 'Sunny',
    precipitationChance: null
  },
  {
    day: 'Tue',
    icon: 'Cloud',
    high: '19°',
    low: '14°',
    condition: 'Cloudy',
    precipitationChance: null
  },
  {
    day: 'Wed',
    icon: 'CloudRain',
    high: '17°',
    low: '12°',
    condition: 'Rain',
    precipitationChance: 80
  },
  {
    day: 'Thu',
    icon: 'Sun',
    high: '24°',
    low: '16°',
    condition: 'Sunny',
    precipitationChance: null
  },
  {
    day: 'Fri',
    icon: 'Cloud',
    high: '21°',
    low: '15°',
    condition: 'Partly Cloudy',
    precipitationChance: 10
  }
];

export default function WeatherDashboard() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const renderIcon = (iconName: string, className?: string) => {
    const iconProps = { className, size: 52, strokeWidth: 2 };
    switch (iconName) {
      case 'Sun':
        return <Sun {...iconProps} color="#F59E0B" />;
      case 'Cloud':
        return <Cloud {...iconProps} color="#94A3B8" />;
      case 'CloudRain':
        return <CloudRain {...iconProps} color="#3B82F6" />;
      default:
        return <Sun {...iconProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B0F19] text-[#1A1A1A] dark:text-[#F8F9FA] font-sans transition-colors duration-300">
      <div className="max-w-[1120px] mx-auto px-6 py-8">
        
        {/* Header / Command Bar */}
        <header className="flex justify-between items-center mb-10">
          {/* Left: Brand */}
          <div className="flex items-center gap-3.5">
            <Image 
              src={logoSrc} 
              alt="MyBagyo Logo" 
              width={44} 
              height={44} 
              className="object-contain drop-shadow-sm" 
            />
            <span className="text-[22px] font-bold tracking-tight">MyBagyo</span>
          </div>

          {/* Center: Search */}
          <div className="hidden md:block w-full max-w-[460px] relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for cities..."
              className="w-full rounded-full h-12 bg-white dark:bg-[#151B2B] border border-gray-200/80 dark:border-white/10 text-[15px] font-medium pl-11 pr-4 focus:outline-none focus:border-[#4A90E2] focus:ring-4 focus:ring-[#4A90E2]/15 transition-all"
            />
          </div>

          {/* Right: Dark Mode Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#151B2B] border border-gray-200/80 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="text-gray-500" size={20} />
            ) : (
              <Moon className="text-gray-500" size={20} />
            )}
          </button>
        </header>

        {/* Hero Section / Current Conditions */}
        <section className="bg-gradient-to-r from-[#EEF3FF] via-[#F8F5FF] to-[#FFF0E8] dark:from-[#1E293B]/40 dark:via-[#1E293B]/30 dark:to-[#1E293B]/40 rounded-[2.5rem] px-12 py-14 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] border border-transparent dark:border-white/5 flex flex-col lg:flex-row gap-8 justify-between items-center mb-14 transition-colors duration-300">
          
          {/* Left Col (Location) */}
          <div className="text-center lg:text-left">
            <h1 className="text-[56px] font-bold tracking-[-0.04em] leading-[1.1] mb-2">
              San Francisco
            </h1>
            <p className="text-[19px] text-[#64748B] font-medium">
              United States
            </p>
          </div>

          {/* Center Col (Temperature) */}
          <div className="flex flex-col items-center">
            <div className="flex items-start">
              <div className="flex items-start shrink-0">
                <span className="text-[10rem] font-bold text-[#121826] dark:text-white tracking-tighter leading-none">
                  18
                </span>
                <span className="text-[5rem] font-semibold mt-6 dark:text-gray-300">°</span>
              </div>
              <Cloud className="w-[130px] h-[130px] text-[#2D3748] dark:text-[#CBD5E1] stroke-[1.5] -ml-2 shrink-0 transition-colors" />
            </div>
            <p className="text-[19px] font-medium text-[#64748B] mt-2">
              Feels like 16°
            </p>
          </div>

          {/* Right Col (Telemetry) */}
          <div className="flex flex-col items-center lg:items-end w-full lg:w-auto">
            <h2 className="text-[26px] font-bold mb-8">Partly Cloudy</h2>
            <div className="flex flex-col gap-5 w-full lg:w-auto">
              
              {/* Humidity */}
              <div className="flex items-center justify-between lg:justify-end gap-5 w-full">
                <div className="text-left lg:text-right">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.15em] mb-0.5">Humidity</p>
                  <p className="text-[18px] font-bold leading-none">64%</p>
                </div>
                <div className="w-[46px] h-[46px] rounded-[14px] bg-white/70 dark:bg-white/5 flex items-center justify-center text-[#4A90E2] dark:text-[#60A5FA] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none shrink-0 transition-colors">
                  <Droplet size={22} strokeWidth={2.5} />
                </div>
              </div>

              {/* Wind */}
              <div className="flex items-center justify-between lg:justify-end gap-5 w-full">
                <div className="text-left lg:text-right">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.15em] mb-0.5">Wind</p>
                  <p className="text-[18px] font-bold leading-none">12 km/h</p>
                </div>
                <div className="w-[46px] h-[46px] rounded-[14px] bg-white/70 dark:bg-white/5 flex items-center justify-center text-[#4A90E2] dark:text-[#60A5FA] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none shrink-0 transition-colors">
                  <Wind size={22} strokeWidth={2.5} />
                </div>
              </div>

              {/* Visibility */}
              <div className="flex items-center justify-between lg:justify-end gap-5 w-full">
                <div className="text-left lg:text-right">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.15em] mb-0.5">Visibility</p>
                  <p className="text-[18px] font-bold leading-none">10 km</p>
                </div>
                <div className="w-[46px] h-[46px] rounded-[14px] bg-white/70 dark:bg-white/5 flex items-center justify-center text-[#4A90E2] dark:text-[#60A5FA] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none shrink-0 transition-colors">
                  <Eye size={22} strokeWidth={2.5} />
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* 5-Day Forecast Grid */}
        <section>
          <h2 className="text-[26px] font-bold mb-1.5">5-Day Forecast</h2>
          <p className="text-[15px] font-medium text-[#64748B] mb-7">
            Weather forecast for the next 5 days
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {forecastData.map((forecast, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-[#151B2B] rounded-[2rem] pt-8 pb-7 px-4 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-transparent dark:border-white/5 flex flex-col items-center hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-300 ease-out"
              >
                <div className="text-[18px] font-bold mb-8 text-[#1A1A1A] dark:text-[#F8F9FA]">{forecast.day}</div>
                
                {renderIcon(forecast.icon, "mb-9")}
                
                <span className="text-[28px] font-bold leading-none tracking-tight text-[#1A1A1A] dark:text-white">
                  {forecast.high}
                </span>
                <span className="text-[17px] font-semibold text-[#94A3B8] dark:text-[#64748B] mt-1.5 mb-8">
                  {forecast.low}
                </span>

                <div className="text-[14px] font-semibold text-[#64748B] dark:text-[#94A3B8] mb-3">
                  {forecast.condition}
                </div>

                <div className="h-6 flex items-center justify-center">
                  {forecast.precipitationChance && (
                    <div className="flex items-center gap-1 text-[#4A90E2]">
                      <Droplet size={14} strokeWidth={3} />
                      <span className="text-[13px] font-semibold">
                        {forecast.precipitationChance}% chance
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
