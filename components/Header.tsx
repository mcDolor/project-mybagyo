"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import logoSrc from "@/assets/logo-only.svg";
import { ThemeSwitcher } from "./theme-switcher";

export default function Header() {
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
      <div className="hidden md:block w-full max-w-[480px] relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={18} />
        </div>
        <input
          className="w-full rounded-xl h-11 bg-[#F0F4F8] dark:bg-[#1A2234] border-2 border-[#A5C0E8] dark:border-blue-500/30 text-sm font-medium pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-all text-[#1A1A1A] dark:text-white placeholder-gray-400"
          type="text"
          placeholder="Search city name..."
          readOnly
        />
      </div>

      {/* Right: Theme Toggle */}
      <ThemeSwitcher />
    </header>
  );
}