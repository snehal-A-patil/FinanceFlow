import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioChart = ({ data }) => {
  const chartData = {
    labels: data.labels,  // Investment names
    datasets: [
      {
        label: 'Portfolio Value',
        data: data.datasets[0].data,  // Current values of investments
        backgroundColor: [
          '#4caf50', // Green for positive investments
          '#f44336', // Red for negative investments
          '#2196f3', // Blue for neutral or low-risk investments
          '#ff9800', // Orange for high-risk or volatile investments
          '#9c27b0'  // Purple for diverse investment types
        ],
        hoverBackgroundColor: [
          '#66bb6a', '#ef5350', '#42a5f5', '#ffb74d', '#ba68c8'
        ],
        borderWidth: 1,
      },
    ],
  };

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
            const value = data.datasets[0].data[tooltipItem.dataIndex]; // Access value correctly
            const label = data.labels[tooltipItem.dataIndex];  // Access label correctly
            return `${label}: ₹${value.toFixed(2)}`;
          }
        }
      }
    }
  };

  return (
    <div className="chart-container" style={{ position: 'relative', width: '600px', height: '600px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PortfolioChart;
