import Header from "./Header";
import HeroCard from "./HeroCard";
import ForecastGrid from "./ForecastGrid";
import { Sun, Cloud, CloudRain } from "lucide-react";

export default function WeatherDashboard() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0B0F19] text-[#1A1A1A] dark:text-[#F8F9FA] font-sans transition-colors duration-300">
      <div className="max-w-[1080px] mx-auto px-6 py-6">
        <Header />

        <main>
          <HeroCard
            city="San Francisco"
            country="United States"
            temp="18°"
            feelsLike="16°"
            condition="Partly Cloudy"
            humidity="65%"
            wind="12 km/h"
            visibility="10 km"
          />

          <section className="mb-8 mt-10">
            <h2 className="text-xl font-bold mb-1">5-Day Forecast</h2>
            <p className="text-sm font-medium text-gray-400 mb-6">
              Weather forecast for the next 5 days
            </p>

            <ForecastGrid
              items={[
                {
                  day: "Mon",
                  icon: <Sun size={32} strokeWidth={2} className="text-orange-500" />,
                  high: "22°",
                  low: "15°",
                  desc: "Sunny",
                },
                {
                  day: "Tue",
                  icon: <Cloud size={32} strokeWidth={2} className="text-gray-500" />,
                  high: "20°",
                  low: "14°",
                  desc: "Partly Cloudy",
                  rainChance: "10% chance",
                },
                {
                  day: "Wed",
                  icon: <CloudRain size={32} strokeWidth={2} className="text-blue-400" />,
                  high: "16°",
                  low: "12°",
                  desc: "Rainy",
                  rainChance: "80% chance",
                },
                {
                  day: "Thu",
                  icon: <Cloud size={32} strokeWidth={2} className="text-gray-500" />,
                  high: "17°",
                  low: "13°",
                  desc: "Cloudy",
                  rainChance: "40% chance",
                },
                {
                  day: "Fri",
                  icon: <Sun size={32} strokeWidth={2} className="text-orange-500" />,
                  high: "21°",
                  low: "14°",
                  desc: "Sunny",
                  rainChance: "5% chance",
                },
              ]}
            />
          </section>
        </main>
      </div>
    </div>
  );
}