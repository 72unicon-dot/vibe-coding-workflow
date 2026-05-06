import React, { useState, useEffect } from 'react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState({ temp: '--', description: '' });
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // .env에 설정

  useEffect(() => {
    // 사용자의 위치는 임시로 고정(위도 37.5665, 경도 126.9780: 서울)
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=37.5665&lon=126.9780&units=metric&appid=${apiKey}`
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.main.temp) + '°C',
          description: data.weather[0].description,
        });
      } catch (e) {
        console.error('날씨 정보를 불러오는 데 실패했습니다.', e);
      }
    };
    if (apiKey) fetchWeather();
  }, [apiKey]);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2 text-primary">날씨 정보</h2>
      <p className="text-lg">현재 온도: <span className="font-bold" id="current-temp">{weather.temp}</span></p>
      <p className="text-sm text-gray-600">설명: {weather.description}</p>
    </div>
  );
}
