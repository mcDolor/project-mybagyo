import { Droplet } from "lucide-react";
import React from "react";

type ForecastCardProps = {
  day: string;
  icon: React.ReactNode;
  high: string;
  low: string;
  desc: string;
  rainChance?: string;
};

export default function ForecastCard({ day, icon, high, low, desc, rainChance }: ForecastCardProps) {
  return (
    <div className="bg-white dark:bg-[#151B2B] rounded-[1.5rem] p-6 flex flex-col items-center border border-gray-100 dark:border-white/5 w-full cursor-pointer transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-md hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
      
      {/* Day */}
      <span className="text-[16px] font-bold text-[#1A1A1A] dark:text-gray-100 mb-5">
        {day}
      </span>
      
      {/* Icon inside a subtle circle */}
      <div className="w-[60px] h-[60px] rounded-full bg-[#F8F9FA] dark:bg-white/5 flex items-center justify-center mb-5 transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      
      {/* Temperatures */}
      <span className="text-[24px] font-bold text-[#1A1A1A] dark:text-white leading-none tracking-tight">
        {high}
      </span>
      <span className="text-[14px] font-medium text-gray-400 mt-2 mb-5">
        {low}
      </span>
      
      {/* Description */}
      <span className="text-[13px] font-medium text-gray-400 mb-3">
        {desc}
      </span>
      
      {/* Rain Chance */}
      <div className="h-5 flex items-center justify-center">
        {rainChance && (
          <span className="text-[12px] font-bold text-[#60A5FA] flex items-center gap-1.5">
            <Droplet size={12} strokeWidth={3} className="fill-current" />
            {rainChance}
          </span>
        )}
      </div>
      
    </div>
  );
}