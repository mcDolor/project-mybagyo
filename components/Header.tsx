"use client";

import { KeyboardEvent } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import logoSrc from "@/assets/logo-only.svg";
import { ThemeSwitcher } from "./theme-switcher";
import { useWeatherStore } from "@/lib/store";

export default function Header() {
  // Grab the global state variables and functions from Zustand
  const { searchQuery, setSearchQuery, fetchWeather } = useWeatherStore();

  // Handle pressing "Enter"
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      fetchWeather(searchQuery);
      setSearchQuery(""); // Clears the input field after searching
    }
  };

  // Handle clicking the magnifying glass icon
  const handleIconClick = () => {
    if (searchQuery.trim() !== "") {
      fetchWeather(searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <header className="flex justify-between items-center mb-10 pt-4">
      {/* Left: Brand */}
      <a href="#" className="flex items-center gap-3">
        <Image 
          src={logoSrc} 
          alt="MyBagyo logo" 
          className="w-8 h-auto object-contain" 
          priority
        />
        <span className="text-xl font-bold tracking-tight text-[#1A1A1A] dark:text-white">
          MyBagyo
        </span>
      </a>

      {/* Center: Search */}
      <div className="w-full max-w-[480px] relative mx-4">
        <div 
          className="absolute inset-y-0 left-0 pl-4 flex items-center cursor-pointer z-10"
          onClick={handleIconClick}
        >
          <Search className="text-gray-400 hover:text-blue-500 transition-colors" size={18} />
        </div>
        <input
          className="w-full rounded-xl h-11 bg-[#F0F4F8] dark:bg-[#1A2234] border-2 border-[#A5C0E8] dark:border-blue-500/30 text-sm font-medium pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-all text-[#1A1A1A] dark:text-white placeholder-gray-400"
          type="text"
          placeholder="Search city name..."
          value={searchQuery}          /* Binds the input to global state */
          onChange={(e) => setSearchQuery(e.target.value)} // Updates Zustand memory, but DOES NOT call API yet
          onKeyDown={handleKeyDown}    /* Listens for the Enter key */
          /* Notice: readOnly has been completely removed! */
        />
      </div>

      {/* Right: Theme Toggle */}
      <ThemeSwitcher />
    </header>
  );
}