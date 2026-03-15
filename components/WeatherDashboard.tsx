"use client";

import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useWeatherStore } from '@/lib/store';

import Header from "./Header";
import HeroCard from "./HeroCard";
import ForecastGrid from "./ForecastGrid";

// Lazy load icons
const Sun = dynamic(() => import('lucide-react').then((mod) => mod.Sun));
const Cloud = dynamic(() => import('lucide-react').then((mod) => mod.Cloud));
const CloudRain = dynamic(() => import('lucide-react').then((mod) => mod.CloudRain));
const Snowflake = dynamic(() => import('lucide-react').then((mod) => mod.Snowflake));

export default function WeatherDashboard() {
  const { weatherData, forecastList, isLoading, error, fetchWeather } = useWeatherStore();

  // On initial load, grab the last searched city from localStorage and fetch it
  useEffect(() => {
    const savedCity = localStorage.getItem('lastSearchedCity') || 'Manila';
    fetchWeather(savedCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to map the Dev's Forecast List to the ForecastGrid Props
  const mappedForecastItems = forecastList.map((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const condition = forecast.weather[0].main;
    
    let WeatherIcon = <Sun size={32} strokeWidth={2} color="#F59E0B" />;
    if (condition === 'Clouds') WeatherIcon = <Cloud size={32} strokeWidth={2} color="#94A3B8" />;
    else if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') WeatherIcon = <CloudRain size={32} strokeWidth={2} color="#3B82F6" />;
    else if (condition === 'Snow') WeatherIcon = <Snowflake size={32} strokeWidth={2} color="#93C5FD" />;

    const precipitationChance = forecast.pop > 0 ? `${Math.round(forecast.pop * 100)}% chance` : undefined;

    return {
      day: dayName,
      icon: WeatherIcon,
      high: `${Math.round(forecast.main.temp_max)}°`,
      low: `${Math.round(forecast.main.temp_min)}°`,
      desc: forecast.weather[0].description,
      rainChance: precipitationChance,
    };
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B0F19] text-[#1A1A1A] dark:text-[#F8F9FA] font-sans transition-colors duration-300">
      <div className="max-w-[1120px] mx-auto px-6 py-8">
        
        {/* Modular Header */}
        <Header />

        <main>
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

          {/* Render Modular HeroCard */}
          {!error && !isLoading && weatherData && (
            <HeroCard
              city={weatherData.name}
              country={weatherData.sys.country}
              temp={`${Math.round(weatherData.main.temp)}`}
              feelsLike={`${Math.round(weatherData.main.feels_like)}`}
              condition={weatherData.weather[0].description}
              humidity={`${weatherData.main.humidity}%`}
              wind={`${(weatherData.wind.speed * 3.6).toFixed(1)} km/h`}
              visibility={`${(weatherData.visibility / 1000).toFixed(1)} km`}
            />
          )}

          {/* Render Modular Forecast Grid */}
          {!error && !isLoading && forecastList.length > 0 && (
            <section>
              <h2 className="text-[26px] font-bold mb-1.5">5-Day Forecast</h2>
              <p className="text-[15px] font-medium text-[#64748B] mb-7">
                Weather forecast for the next 5 days
              </p>
              
              <ForecastGrid items={mappedForecastItems} />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}