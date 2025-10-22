'use client';
import { ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const MultiRadialChart = () => {
  const ringValues = [10, 90, 75, 60, 50];
  const ringColors = ['#fb923c', '#22c55e', '#06b6d4', '#6366f1', '#a855f7'];

  const data = {
    labels: [],
    datasets: ringValues.map((value, index) => ({
      data: [value, 100 - value],
      backgroundColor: [ringColors[index], '#f3f4f6'],
      borderWidth: 0,
      cutout: `${20 + index * 13}%`,
      radius: `${35 + index * 23}%`,
    })),
  };

  const options = {
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    animation: {
      animateRotate: true,
      duration: 1000,
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-center w-full">
      <div className="relative w-60 h-60">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default MultiRadialChart;
