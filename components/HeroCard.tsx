import { Cloud, Droplet, Wind, Eye } from "lucide-react";

type HeroCardProps = {
  city: string;
  country: string;
  temp: string;
  feelsLike: string;
  condition: string;
  humidity: string;
  wind: string;
  visibility: string;
};

export default function HeroCard({ city, country, temp, feelsLike, condition, humidity, wind, visibility }: HeroCardProps) {
  return (
    <section className="bg-gradient-to-r from-[#F4F5F8] via-[#F6F4F5] to-[#F8EBE6] dark:from-[#1E293B] dark:to-[#0F172A] rounded-[1.5rem] p-10 flex flex-col md:flex-row items-center justify-between mb-10 shadow-sm border border-gray-100 dark:border-white/5">
      
      {/* Left: Location */}
      <div className="text-center md:text-left mb-6 md:mb-0">
        <h1 className="text-4xl font-bold text-[#1A1A1A] dark:text-white mb-1">{city}</h1>
        <p className="text-sm font-medium text-gray-400">{country}</p>
      </div>

      {/* Center: Temperature & Icon */}
      <div className="flex flex-col items-center mb-6 md:mb-0">
        <div className="flex items-center gap-6">
          <div className="flex items-start">
            <span className="text-7xl font-bold text-[#1A1A1A] dark:text-white tracking-tighter">{parseInt(temp)}</span>
            <span className="text-5xl font-bold text-[#1A1A1A] dark:text-white">°</span>
          </div>
          <Cloud size={80} strokeWidth={2} className="text-gray-500 dark:text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Feels like {feelsLike}</p>
      </div>

      {/* Right: Details */}
      <div className="flex flex-col items-center md:items-start">
        <h2 className="text-lg font-bold text-[#1A1A1A] dark:text-white mb-4">{condition}</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Droplet size={18} strokeWidth={2.5} className="text-[#60A5FA]" />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Humidity</span>
              <span className="text-sm font-bold text-[#1A1A1A] dark:text-white">{humidity}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind size={18} strokeWidth={2.5} className="text-[#60A5FA]" />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Wind</span>
              <span className="text-sm font-bold text-[#1A1A1A] dark:text-white">{wind}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={18} strokeWidth={2.5} className="text-[#60A5FA]" />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Visibility</span>
              <span className="text-sm font-bold text-[#1A1A1A] dark:text-white">{visibility}</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}