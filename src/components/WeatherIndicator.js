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
      return <WiThunderstorm size={48} />;
    } else if (rainfall > 0) {
      if (isNight) return <WiNightRain size={48} />;
      return <WiRain size={48} />;
    } else if (temp < 0 && humidity > 80) {
      if (isNight) return <WiNightSnow size={48} />;
      return <WiSnow size={48} />;
    } else if (humidity > 80) {
      return <WiFog size={48} />;
    } else if (humidity > 60) {
      if (isNight) return <WiNightCloudy size={48} />;
      return <WiCloud size={48} />;
    } else if (humidity < 40 && temp > 30) {
      return <WiStrongWind size={48} />;
    } else {
      if (isNight) return <WiNightClear size={48} />;
      return <WiDaySunny size={48} />;
    }
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex flex-col items-center">
        {getWeatherIcon(latestData)}
        <span>Current Weather</span>
      </div>
    </div>
  );
};

export default WeatherIndicator;
