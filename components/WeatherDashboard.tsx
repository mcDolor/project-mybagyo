"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

// Lazy load weather icons to improve initial bundle size
const Search = dynamic(() => import('lucide-react').then((mod) => mod.Search));
const Moon = dynamic(() => import('lucide-react').then((mod) => mod.Moon));
const Droplet = dynamic(() => import('lucide-react').then((mod) => mod.Droplet));
const Wind = dynamic(() => import('lucide-react').then((mod) => mod.Wind));
const Eye = dynamic(() => import('lucide-react').then((mod) => mod.Eye));
const Sun = dynamic(() => import('lucide-react').then((mod) => mod.Sun));
const Cloud = dynamic(() => import('lucide-react').then((mod) => mod.Cloud));
const CloudRain = dynamic(() => import('lucide-react').then((mod) => mod.CloudRain));
const Snowflake = dynamic(() => import('lucide-react').then((mod) => mod.Snowflake));

import Image from 'next/image';
import logoSrc from '@/assets/logo-only.svg';

export default function WeatherDashboard() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  //State variables for API integration
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastList, setForecastList] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    const savedCity = localStorage.getItem('lastSearchedCity') || 'Manila'; // save city to localStorage for persistence
    fetchWeather(savedCity);
  }, []);



  //FETCH FUNTION
  const fetchWeather = async (city: string) => {
    if (!city) return;
    
    setIsLoading(true); 
    setError(null);    

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      
      // 1. Fetch Current Weather
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check your spelling.');
        }
        throw new Error('An error occurred while fetching data.');
      }

      const data = await response.json();
      setWeatherData(data);
      localStorage.setItem('lastSearchedCity', city);
      
      // 2. Fetch 5-Day Forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      
      if (forecastResponse.ok) {
        const forecastJson = await forecastResponse.json();
        // The API returns 40 items (every 3 hours). This filters it to 1 per day (at 12:00 PM)
        const dailyData = forecastJson.list.filter((reading: any) => reading.dt_txt.includes("12:00:00"));
        setForecastList(dailyData);
      }
      
    } catch (err: any) {
      // Handle Network Failure or custom errors [cite: 390]
      setError(err.message || 'Failed to fetch weather data. Check your connection.');
      setWeatherData(null);
    } finally {
      setIsLoading(false); // Stop loading spinner [cite: 391]
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
              width={50} 
              height={50} 
              className="object-contain drop-shadow-sm" 
              priority //optimize image loading for logo
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    fetchWeather(searchQuery);
                  }
                }}
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

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2]"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-[2rem] text-center mb-14 font-medium border border-red-200">
            {error}
          </div>
        )}

        {/* Hero Section / Current Conditions */}
        { !error && weatherData && (
          <section className="bg-gradient-to-r from-[#8EBAD2] to-[#CBD8D9] dark:from-[#1E293B]/40 dark:via-[#1E293B]/30 dark:to-[#1E293B]/40 rounded-[2.5rem] px-12 py-14 border-t-2 border-t-white/60 dark:border-t-white/5 border-l-transparent border-r-transparent border-b-transparent flex flex-col lg:flex-row gap-8 justify-between items-center mb-14 transition-colors duration-300">
          
          {/* Left Col (Location) */}
          <div className="text-center lg:text-left">
            <h1 className="text-[56px] font-bold tracking-[-0.04em] leading-[1.1] mb-2">
              {weatherData.name}
            </h1>
            <p className="text-[19px] text-[#64748B] font-medium">
              {weatherData.sys.country}
            </p>
          </div>

          {/* Center Col (Temperature) */}
          <div className="flex flex-col items-center">
            <div className="flex items-start">
              <div className="flex items-start shrink-0">
                <span className="text-[10rem] font-bold text-[#121826] dark:text-white tracking-tighter leading-none">
                  {Math.round(weatherData.main.temp)}
                </span>
                <span className="text-[5rem] font-semibold mt-6 dark:text-gray-300">°</span>
              </div>
             

              {/* Inline Dynamic Icon */}
              {(() => {
                const condition = weatherData.weather[0].main;
                const iconClasses = "-ml-2 shrink-0 transition-colors";
                
                if (condition === 'Clouds') {
                  return <Cloud className={iconClasses} size={130} strokeWidth={2} color="#94A3B8" />;
                }
                if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') {
                  return <CloudRain className={iconClasses} size={130} strokeWidth={2} color="#3B82F6" />;
                }
                if (condition === 'Snow') { 
                  return <Snowflake className={iconClasses} size={130} strokeWidth={2} color="#93C5FD" />;
                }
                
                // Default to Sun for "Clear"
                return <Sun className={iconClasses} size={130} strokeWidth={2} color="#F59E0B" />;
              })()}
            </div>
            <p className="text-[19px] font-medium text-[#64748B] mt-2">
              Feels like {Math.round(weatherData.main.feels_like)}°
            </p>
          </div>

          {/* Right Col (Telemetry) */}
          <div className="flex flex-col items-center lg:items-end w-full lg:w-auto">
            <h2 className="text-[26px] font-bold mb-8">
              {weatherData.weather[0].description}
            </h2>
            <div className="flex flex-col gap-5 w-full lg:w-auto">
              
              {/* Humidity */}
              <div className="flex items-center justify-between lg:justify-end gap-5 w-full">
                <div className="text-left lg:text-right">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.15em] mb-0.5">Humidity</p>
                  <p className="text-[18px] font-bold leading-none">{weatherData.main.humidity}%</p>
                </div>
                <div className="w-[46px] h-[46px] rounded-[14px] bg-white/70 dark:bg-white/5 flex items-center justify-center text-[#4A90E2] dark:text-[#60A5FA] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none shrink-0 transition-colors">
                  <Droplet size={22} strokeWidth={2.5} />
                </div>
              </div>

              {/* Wind */}
              <div className="flex items-center justify-between lg:justify-end gap-5 w-full">
                <div className="text-left lg:text-right">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.15em] mb-0.5">Wind</p>
                  <p className="text-[18px] font-bold leading-none">{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</p>
                </div>
                <div className="w-[46px] h-[46px] rounded-[14px] bg-white/70 dark:bg-white/5 flex items-center justify-center text-[#4A90E2] dark:text-[#60A5FA] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none shrink-0 transition-colors">
                  <Wind size={22} strokeWidth={2.5} />
                </div>
              </div>

              {/* Visibility */}
              <div className="flex items-center justify-between lg:justify-end gap-5 w-full">
                <div className="text-left lg:text-right">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.15em] mb-0.5">Visibility</p>
                  <p className="text-[18px] font-bold leading-none">{(weatherData.visibility / 1000).toFixed(1)} km</p>
                </div>
                <div className="w-[46px] h-[46px] rounded-[14px] bg-white/70 dark:bg-white/5 flex items-center justify-center text-[#4A90E2] dark:text-[#60A5FA] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none shrink-0 transition-colors">
                  <Eye size={22} strokeWidth={2.5} />
                </div>
              </div>

            </div>
          </div>

        </section>
        )}
        

        {/* 5-Day Forecast Grid */}
        {forecastList.length > 0 && !error && !isLoading && (
        <section>
          <h2 className="text-[26px] font-bold mb-1.5">5-Day Forecast</h2>
          <p className="text-[15px] font-medium text-[#64748B] mb-7">
            Weather forecast for the next 5 days
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {forecastList.map((forecast, index) => {
              const date = new Date(forecast.dt * 1000);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

              const condition = forecast.weather[0].main;
              
              let WeatherIcon = <Sun className="mb-9" size={52} strokeWidth={2} color="#F59E0B" />; // Default
              
              if (condition === 'Clouds') {
                WeatherIcon = <Cloud className="mb-9" size={52} strokeWidth={2} color="#94A3B8" />;
              } else if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') {
                WeatherIcon = <CloudRain className="mb-9" size={52} strokeWidth={2} color="#3B82F6" />;
              } else if (condition === 'Snow') { 
                WeatherIcon = <Snowflake className="mb-9" size={52} strokeWidth={2} color="#93C5FD" />;
              }
              
              const tempHigh = Math.round(forecast.main.temp_max);
              const tempLow = Math.round(forecast.main.temp_min);
              const description = forecast.weather[0].description;
              const precipitationChance = forecast.pop > 0 ? Math.round(forecast.pop * 100) : null;

              return(
                <div 
                  key={index} 
                  className="bg-white dark:bg-[#151B2B] rounded-[2rem] pt-8 pb-7 px-4 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-transparent dark:border-white/5 flex flex-col items-center hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-300 ease-out"
                >

                <div className="text-[18px] font-bold mb-8 text-[#1A1A1A] dark:text-[#F8F9FA]">{dayName}</div>
                {WeatherIcon}
                
                <span className="text-[28px] font-bold leading-none tracking-tight text-[#1A1A1A] dark:text-white">
                  {tempHigh}°
                </span>
                <span className="text-[17px] font-semibold text-[#94A3B8] dark:text-[#64748B] mt-1.5 mb-8">
                  {tempLow}°
                </span>

                <div className="text-[14px] font-semibold text-[#64748B] dark:text-[#94A3B8] mb-3">
                  {description}
                </div>

                 <div className="h-6 flex items-center justify-center">
                  {precipitationChance && (
                    <div className="flex items-center gap-1 text-[#4A90E2]">
                      <Droplet size={14} strokeWidth={3} />
                      <span className="text-[13px] font-semibold">
                        {precipitationChance}% chance
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )})}
          </div>
        </section>
        )}

      </div>
    </div>
  );
}
