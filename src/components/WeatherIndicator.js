import React from 'react';
import {
  WiDaySunny, WiCloud, WiRain, WiSnow,
  WiThunderstorm, WiFog, WiStrongWind,
  WiNightClear, WiNightCloudy, WiNightRain, WiNightSnow
} from 'react-icons/wi';

const WeatherIndicator = ({ latestData, headers }) => {
  const getWeatherIcon = (data) => {
    const temp = parseFloat(data[headers.indexOf('AirT_Max')]);
    const humidity = parseFloat(data[headers.indexOf('RH_Max')]);
    const rainfall = parseFloat(data[headers.indexOf('Rain_Tot')]);
    const timestamp = new Date(data[headers.indexOf('TIMESTAMP')]);

    const isNight = timestamp.getHours() >= 18 || timestamp.getHours() <= 6;

    if (rainfall > 0 && humidity > 80) {
      return <WiThunderstorm className="text-white" size={96} />;
    } else if (rainfall > 0) {
      if (isNight) return <WiNightRain className="text-white" size={96} />;
      return <WiRain className="text-white" size={96} />;
    } else if (temp < 0 && humidity > 80) {
      if (isNight) return <WiNightSnow className="text-white" size={96} />;
      return <WiSnow className="text-white" size={96} />;
    } else if (humidity > 80) {
      return <WiFog className="text-white" size={96} />;
    } else if (humidity > 60) {
      if (isNight) return <WiNightCloudy className="text-white" size={96} />;
      return <WiCloud className="text-white" size={96} />;
    } else if (humidity < 40 && temp > 30) {
      return <WiStrongWind className="text-white" size={96} />;
    } else {
      if (isNight) return <WiNightClear className="text-white" size={96} />;
      return <WiDaySunny className="text-white" size={96} />;
    }
  };

  const weatherData = [
    { label: 'Timestamp', value: latestData[headers.indexOf('TIMESTAMP')] },
    { label: 'Max Temp (°C)', value: latestData[headers.indexOf('AirT_Max')] },
    { label: 'Max Humidity (%)', value: latestData[headers.indexOf('RH_Max')] },
    { label: 'Total Rainfall (mm)', value: latestData[headers.indexOf('Rain_Tot')] },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-lg">
      <div className="flex flex-col items-center sm:flex-row sm:items-start sm:flex-wrap">
        <div className="mr-4 flex-shrink-0">
          {getWeatherIcon(latestData)}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Current Weather</h2>
          <ul className="mt-2 space-y-2 sm:space-y-1 sm:space-x-4 sm:flex sm:flex-wrap">
            {weatherData.map((data, index) => (
              <li key={index} className="bg-blue-500 rounded-lg p-2 mb-2 sm:mb-0">
                <span className="font-semibold">{data.label}: </span>{data.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherIndicator;
