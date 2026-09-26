import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  Search,
  Wind,
  Droplets,
  Sunrise,
  Sunset,
  CloudRain,
  Activity,
  MapPin,
  RotateCw,
  Calendar,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { weatherProvider } from '../providers/WeatherProvider';
import { WeatherData } from '../types';

export const WeatherPage: React.FC = () => {
  const [cityInput, setCityInput] = useState('');
  const [currentCity, setCurrentCity] = useState('New Delhi');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherProvider.getWeatherByCity(city);
      setWeather(data);
      setCurrentCity(data.city);
    } catch (err: any) {
      setError(err?.message || 'Could not fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('New Delhi');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      fetchWeather(cityInput.trim());
      setCityInput('');
    }
  };

  const quickCities = ['Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Jaipur', 'Lucknow'];

  return (
    <>
      <SEOHead
        title={weather ? `Weather in ${weather.city} — Live Forecast, AQI & Rain` : 'Live Weather Forecast India'}
        description="Check real-time accurate weather forecast for Indian cities. Hourly updates, 7-day forecast, Air Quality Index (AQI), humidity, wind speed, and rain probability."
        canonicalPath="/weather"
        breadcrumbs={[
          { label: 'Utilities', url: '/calculators' },
          { label: 'Weather' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Weather Forecast', url: '/weather' }]} />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">
            <CloudSun className="w-4 h-4" />
            <span>Meteorological Observation System</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Live Weather &amp; Air Quality Index (AQI)
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Real-time meteorological observations for Indian cities with genuine satellite telemetry, hourly conditions, and a 7-day outlook.
          </p>
        </div>

        {/* City Search Bar & Quick Cities */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-xl flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Search any Indian city or district (e.g. Pune, Jaipur, Kochi)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition"
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="font-semibold text-slate-400 text-[11px]">Popular:</span>
            {quickCities.map((c) => (
              <button
                key={c}
                onClick={() => fetchWeather(c)}
                className={`px-3 py-1 rounded-full border transition whitespace-nowrap ${
                  currentCity.toLowerCase().includes(c.toLowerCase())
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="py-20 text-center">
            <RotateCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500">Connecting to meteorological stations...</p>
          </div>
        )}

        {/* Weather Dashboard View */}
        {!loading && weather && (
          <div className="space-y-8">
            
            {/* Main Overview Hero Card */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-700 text-white p-6 sm:p-10 shadow-xl shadow-blue-500/10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/20 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-blue-100 uppercase tracking-wider font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{weather.city}, {weather.state}</span>
                  </div>
                  <div className="text-4xl sm:text-6xl font-black mt-2 font-mono">
                    {weather.temperature}&deg;C
                  </div>
                  <div className="text-sm sm:text-base text-blue-100 mt-1 font-medium">
                    {weather.condition} • Feels like {weather.feelsLike}&deg;C
                  </div>
                </div>

                {/* AQI Badge */}
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center self-stretch sm:self-auto min-w-[140px]">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-blue-100">Air Quality Index</div>
                  <div className="text-3xl font-black mt-0.5">{weather.aqi}</div>
                  <div className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 inline-block mt-1">
                    {weather.aqiQuality}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-white/10 flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-sky-200" />
                  <div>
                    <div className="text-blue-200 text-[10px] uppercase font-semibold">Humidity</div>
                    <div className="text-sm font-bold font-mono">{weather.humidity}%</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/10 flex items-center gap-3">
                  <Wind className="w-5 h-5 text-sky-200" />
                  <div>
                    <div className="text-blue-200 text-[10px] uppercase font-semibold">Wind Speed</div>
                    <div className="text-sm font-bold font-mono">{weather.windSpeed} km/h</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/10 flex items-center gap-3">
                  <CloudRain className="w-5 h-5 text-sky-200" />
                  <div>
                    <div className="text-blue-200 text-[10px] uppercase font-semibold">Rain Probability</div>
                    <div className="text-sm font-bold font-mono">{weather.rainProbability}%</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/10 flex items-center gap-3">
                  <Sunrise className="w-5 h-5 text-amber-300" />
                  <div>
                    <div className="text-blue-200 text-[10px] uppercase font-semibold">Sunrise / Sunset</div>
                    <div className="text-xs font-bold font-mono">{weather.sunrise} / {weather.sunset}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-blue-200">
                <span>Source: {weather.source}</span>
                <span>Last Updated: {weather.lastUpdated}</span>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Hourly Forecast (Today)
                </h3>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 text-center">
                {weather.hourly.map((h, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] text-slate-500 font-medium mb-1">{h.time}</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white font-mono my-1">
                      {h.temp}&deg;
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{h.icon}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7-Day Outlook */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  7-Day Meteorological Outlook
                </h3>
              </div>

              <div className="space-y-2">
                {weather.daily.map((d, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between text-xs"
                  >
                    <span className="font-bold text-slate-800 dark:text-slate-200 w-24">
                      {d.day}
                    </span>
                    <span className="text-slate-500 text-center flex-1">
                      {d.condition}
                    </span>
                    <div className="font-mono text-right space-x-2">
                      <span className="font-bold text-slate-900 dark:text-white">{d.high}&deg;</span>
                      <span className="text-slate-400">{d.low}&deg;</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
