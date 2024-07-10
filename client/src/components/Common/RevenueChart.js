import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';
const RevenueChart = ({ data }) => {
  // Chuẩn bị dữ liệu cho biểu đồ
  Chart.register(Chart.controllers.bar, Chart.scaleService.getScaleConstructor('category'));
  const chartData = {
    labels: data.map(item => `Tháng ${item.month}`),
    datasets: [
      {
        label: 'Doanh thu',
        data: data.map(item => item.totalRevenue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h2>Biểu đồ doanh thu theo tháng</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default RevenueChart;