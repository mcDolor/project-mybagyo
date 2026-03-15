import { create } from 'zustand';

interface WeatherData {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface WeatherState {
  searchQuery: string;
  weatherData: WeatherData | null;
  forecastList: WeatherData[];
  isLoading: boolean;
  error: string | null;
  
  setSearchQuery: (query: string) => void;
  fetchWeather: (city: string) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  searchQuery: '',
  weatherData: null,
  forecastList: [],
  isLoading: false,
  error: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  fetchWeather: async (city) => {
    if (!city) return;
    
    set({ isLoading: true, error: null });

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
      
      // Save to localStorage safely (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastSearchedCity', city);
      }
      
      // 2. Fetch 5-Day Forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      
      let dailyData = [];
      if (forecastResponse.ok) {
        const forecastJson = await forecastResponse.json();
        // The API returns 40 items (every 3 hours). This filters it to 1 per day (at 12:00 PM)
        dailyData = forecastJson.list.filter((reading: WeatherData) => reading.dt_txt.includes("12:00:00"));
      }
      
      set({ weatherData: data, forecastList: dailyData, isLoading: false });
    } catch (err: unknown) {
      set({ 
        error: (err as Error).message || 'Failed to fetch weather data. Check your connection.', 
        weatherData: null, 
        forecastList: [],
        isLoading: false 
      });
    }
  },
}));