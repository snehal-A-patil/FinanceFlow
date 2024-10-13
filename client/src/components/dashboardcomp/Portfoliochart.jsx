import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioChart = ({ data }) => {
  // Default chart data if 'data' is not provided
  const defaultData = {
    labels: ['No Data Available'],
    datasets: [
      {
        data: [1],
        backgroundColor: ['#ccc'],
        hoverBackgroundColor: ['#bbb'],
        borderWidth: 1,
      },
    ],
  };

  // Use default data if the passed data is not valid
  const chartData = data && data.labels && data.datasets && data.datasets[0]?.data
    ? {
        labels: data.labels,
        datasets: [
          {
            label: 'Portfolio Value',
            data: data.datasets[0].data,
            backgroundColor: [
              '#4caf50',
              '#f44336',
              '#2196f3',
              '#ff9800',
              '#9c27b0',
            ],
            hoverBackgroundColor: [
              '#66bb6a', '#ef5350', '#42a5f5', '#ffb74d', '#ba68c8',
            ],
            borderWidth: 1,
          },
        ],
      }
    : defaultData;  // Fallback to default data

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Allow custom sizing
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = chartData.datasets[0].data[tooltipItem.dataIndex]; // Access value correctly
            const label = chartData.labels[tooltipItem.dataIndex];  // Access label correctly
            return `${label}: ₹${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ position: 'relative', width: '600px', height: '600px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PortfolioChart;
