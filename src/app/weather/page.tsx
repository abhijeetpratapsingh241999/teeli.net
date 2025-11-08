"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Search, MapPin, Wind, Droplets, Eye, Gauge, Star, StarOff, Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, Zap } from 'lucide-react';

// Types
interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  dt: number;
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
  };
}

export default function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('London');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'demo';

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Fetch weather on initial load
  useEffect(() => {
    fetchWeather(searchCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Fetch current weather
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!currentResponse.ok) {
        throw new Error('City not found. Please check the spelling and try again.');
      }

      const currentData = await currentResponse.json();
      setCurrentWeather(currentData);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
      setSearchCity(cityName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const toggleFavorite = (cityName: string) => {
    let updatedFavorites: string[];
    if (favorites.includes(cityName)) {
      updatedFavorites = favorites.filter((fav) => fav !== cityName);
    } else {
      updatedFavorites = [...favorites, cityName];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  const getWeatherIcon = (weatherId: number) => {
    if (weatherId >= 200 && weatherId < 300) return <Zap className="w-full h-full" />;
    if (weatherId >= 300 && weatherId < 400) return <CloudDrizzle className="w-full h-full" />;
    if (weatherId >= 500 && weatherId < 600) return <CloudRain className="w-full h-full" />;
    if (weatherId >= 600 && weatherId < 700) return <CloudSnow className="w-full h-full" />;
    if (weatherId >= 801) return <Cloud className="w-full h-full" />;
    return <Sun className="w-full h-full" />;
  };

  // Get daily forecast (one per day at noon)
  const getDailyForecast = () => {
    if (!forecast) return [];
    
    const dailyData: typeof forecast.list = [];
    const seenDates = new Set();
    
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!seenDates.has(date) && dailyData.length < 5) {
        seenDates.add(date);
        dailyData.push(item);
      }
    });
    
    return dailyData;
  };

  return (
    <>
      <Header />
      <main className={`min-h-screen ${darkMode ? 'bg-gradient-to-b from-black via-purple-950/20 to-black' : 'bg-gradient-to-b from-gray-100 via-blue-50 to-gray-100'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className={`font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 ${
              darkMode 
                ? 'bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent' 
                : 'text-gray-900'
            }`}>
              Weather Dashboard
            </h1>
            <p className={`text-lg md:text-xl mb-6 ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              Real-time weather data from around the world
            </p>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-6 py-3 rounded-full border-2 font-semibold transition-all ${
                darkMode
                  ? 'border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10'
                  : 'border-blue-500 text-blue-600 hover:bg-blue-50'
              }`}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-blue-500'}`} />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name..."
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all ${
                    darkMode
                      ? 'bg-black/40 border-cyan-500/30 text-white placeholder-zinc-500 focus:border-cyan-500'
                      : 'bg-white border-blue-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                  }`}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-xl font-semibold transition-all ${
                    darkMode
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white hover:from-cyan-500 hover:to-purple-600'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                  } disabled:opacity-50`}
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>

            {/* Favorites */}
            {favorites.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Favorites:</span>
                {favorites.map((fav) => (
                  <button
                    key={fav}
                    onClick={() => fetchWeather(fav)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${
                      darkMode
                        ? 'bg-cyan-900/20 border-cyan-500/30 text-cyan-300 hover:border-cyan-500'
                        : 'bg-blue-100 border-blue-300 text-blue-700 hover:border-blue-500'
                    }`}
                  >
                    {fav}
                  </button>
                ))}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className={`mt-4 p-4 rounded-xl border-2 ${
                darkMode
                  ? 'bg-red-900/20 border-red-500/50 text-red-300'
                  : 'bg-red-50 border-red-300 text-red-700'
              }`}>
                {error}
              </div>
            )}
          </div>

          {/* Current Weather */}
          {currentWeather && (
            <div className="max-w-6xl mx-auto mb-12">
              <div className={`rounded-3xl border-2 p-8 backdrop-blur-sm ${
                darkMode
                  ? 'border-cyan-500/30 bg-gradient-to-br from-black/60 via-purple-950/40 to-black/60'
                  : 'border-blue-300 bg-white'
              }`}>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <MapPin className={`w-6 h-6 ${darkMode ? 'text-cyan-400' : 'text-blue-500'}`} />
                    <div>
                      <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {currentWeather.name}, {currentWeather.sys.country}
                      </h2>
                      <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                        {new Date(currentWeather.dt * 1000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(currentWeather.name)}
                    className={`p-2 rounded-full transition-all ${
                      favorites.includes(currentWeather.name)
                        ? darkMode ? 'text-yellow-400' : 'text-yellow-500'
                        : darkMode ? 'text-zinc-600 hover:text-zinc-400' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {favorites.includes(currentWeather.name) ? (
                      <Star className="w-8 h-8 fill-current" />
                    ) : (
                      <StarOff className="w-8 h-8" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Temperature Display */}
                  <div className="flex items-center gap-6">
                    <div className={`w-24 h-24 ${darkMode ? 'text-cyan-400' : 'text-blue-500'}`}>
                      {getWeatherIcon(currentWeather.weather[0].id)}
                    </div>
                    <div>
                      <div className={`text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {Math.round(currentWeather.main.temp)}°C
                      </div>
                      <div className={`text-xl capitalize ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                        {currentWeather.weather[0].description}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Feels like {Math.round(currentWeather.main.feels_like)}°C
                      </div>
                    </div>
                  </div>

                  {/* Weather Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl border ${
                      darkMode
                        ? 'bg-black/40 border-cyan-500/20'
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Wind className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-blue-500'}`} />
                        <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Wind</span>
                      </div>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {currentWeather.wind.speed} m/s
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${
                      darkMode
                        ? 'bg-black/40 border-cyan-500/20'
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-blue-500'}`} />
                        <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Humidity</span>
                      </div>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {currentWeather.main.humidity}%
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${
                      darkMode
                        ? 'bg-black/40 border-cyan-500/20'
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-blue-500'}`} />
                        <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Visibility</span>
                      </div>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {(currentWeather.visibility / 1000).toFixed(1)} km
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${
                      darkMode
                        ? 'bg-black/40 border-cyan-500/20'
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-blue-500'}`} />
                        <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Pressure</span>
                      </div>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {currentWeather.main.pressure} hPa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5-Day Forecast */}
          {forecast && (
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-3xl font-bold mb-6 ${
                darkMode
                  ? 'bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent'
                  : 'text-gray-900'
              }`}>
                5-Day Forecast
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {getDailyForecast().map((day, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border-2 p-6 backdrop-blur-sm transition-all hover:scale-105 ${
                      darkMode
                        ? 'border-purple-500/30 bg-gradient-to-br from-black/60 via-purple-950/40 to-black/60 hover:border-purple-500/50'
                        : 'border-blue-300 bg-white hover:border-blue-500'
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-2 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                      {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-purple-400' : 'text-blue-500'}`}>
                      {getWeatherIcon(day.weather[0].id)}
                    </div>
                    <div className={`text-3xl font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {Math.round(day.main.temp)}°C
                    </div>
                    <div className={`text-sm text-center capitalize ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      {day.weather[0].description}
                    </div>
                    <div className={`text-xs text-center mt-2 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                      💧 {day.main.humidity}% • 💨 {day.wind.speed.toFixed(1)} m/s
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Initial State - No Data */}
          {!currentWeather && !loading && !error && (
            <div className="max-w-2xl mx-auto text-center">
              <div className={`text-6xl mb-4 ${darkMode ? 'text-cyan-400' : 'text-blue-500'}`}>🌍</div>
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Search for a city to get started
              </h3>
              <p className={`${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Enter any city name to view current weather and 5-day forecast
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
