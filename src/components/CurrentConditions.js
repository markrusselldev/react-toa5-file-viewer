import React from 'react';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import { format, parseISO } from 'date-fns';
import WindDirectionIndicator from './WindDirectionIndicator';

const determineWeatherIcon = (latestData) => {
  const temp = parseFloat(latestData[4]); // Assuming AirTF_Avg is at index 4
  const windSpeed = parseFloat(latestData[7]); // Assuming the wind speed is at index 7
  const precipitation = parseFloat(latestData[3]); // Assuming the precipitation is at index 3

  if (precipitation > 0) {
    return <WiRain className="text-6xl sm:text-9xl" />;
  } else if (windSpeed > 30) { // High wind speed
    return <WiThunderstorm className="text-6xl sm:text-9xl" />;
  } else if (temp < 32) {
    return <WiSnow className="text-6xl sm:text-9xl" />;
  } else if (temp < 50 && temp > 32) { // Cool temperatures
    return <WiFog className="text-6xl sm:text-9xl" />;
  } else if (windSpeed > 10) {
    return <WiCloud className="text-6xl sm:text-9xl" />;
  } else {
    return <WiDaySunny className="text-6xl sm:text-9xl" />;
  }
};

const CurrentConditions = ({ latestData, headers }) => {
  const dataMap = {};
  headers.forEach((header, index) => {
    dataMap[header] = latestData[index];
  });

  const weatherIcon = determineWeatherIcon(latestData);

  // Format the latest date and time
  const latestDateTime = format(parseISO(latestData[0]), 'MMM dd, yyyy h:mm a');

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-2">
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg flex-1">
        <div className="flex items-center justify-center mb-4">
          {weatherIcon}
        </div>
        <div>
          <h1 className="text-xl font-bold">Current Weather</h1>
          <p className="mt-2">{latestDateTime}</p>
          <div className="mt-2">
            <p>Temperature: {dataMap['AirTF_Avg']}°F</p>
            <p>Humidity: {dataMap['RH']}%</p>
            <p>Barometric Pressure: {dataMap['BP_inHg_Avg']} inHg</p>
            <p>Dew Point: {dataMap['DP_F_Avg']}°F</p>
            <p>Wind Speed: {dataMap['WS_mph_Avg']} mph</p>
          </div>
        </div>
      </div>
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg flex-1 mt-2 sm:mt-0">
        <div className="flex items-center justify-center mb-4">
          <WindDirectionIndicator direction={dataMap['WindDir']} />
        </div>
        <div>
          <h2 className="text-lg font-bold">Wind</h2>
          <div className="mt-2">
            <p>Speed: {dataMap['WS_mph_Avg']} mph</p>
            <p>Direction: {dataMap['WindDir']}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentConditions;
