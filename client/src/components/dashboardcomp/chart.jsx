import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the necessary components for a line chart
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Chart = () => {
  const data = {
    labels: ['Sep 1', 'Sep 5', 'Sep 10', 'Sep 15', 'Sep 20', 'Sep 25', 'Sep 30'], // Days of the month
    datasets: [
      {
        label: 'Expenses',
        data: [50, 200, 150, 100, 300, 75, 180], // Example expense data
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false, // For line chart, you might want fill to be false
        tension: 0.1 // Optional, for smoothness of the line
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="h-72">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
