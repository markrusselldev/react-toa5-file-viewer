import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RecentTrends = ({ data, headers }) => {
  console.log('RecentTrends data:', data);
  console.log('RecentTrends headers:', headers);

  const labels = data.map(row => row[0]); // Assuming the first column is the timestamp
  const temperatureData = data.map(row => parseFloat(row[headers.indexOf('AirTF_Avg')]));

  const chartData = {
    labels: labels.reverse(),
    datasets: [
      {
        label: 'Temperature (°F)',
        data: temperatureData.reverse(),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recent Temperature Trends',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°F)'
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg mt-4">
      <h2 className="text-lg font-bold">Recent Temperature Trends</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RecentTrends;
