import ForecastCard from "./ForecastCard";

type ForecastItem = {
  day: string;
  icon: React.ReactNode;
  high: string;
  low: string;
  desc: string;
  rainChance?: string;
};

export default function ForecastGrid({ items }: { items: ForecastItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-5 w-full">
      {items.map((item) => (
        <ForecastCard key={item.day} {...item} />
      ))}
    </div>
  );
}