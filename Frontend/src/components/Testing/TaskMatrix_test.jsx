import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'; // Make sure to import the Chart component
import './TaskMatrix.css'
import Cal from './Calendar';

const Matrix = () => {


  // Options is the config for charts 
  const [chartOptions, setChartOptions] = useState({
    series: [],
    chart: {
      height:500,
      foreColor: '#ffffff',
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#0f0f0f'],
    title: {
      text: 'HeatMap Chart (Single color)',
    },
  });


  useEffect(() => {
    const series = [];
    for (let i = 0; i < 15; i++) {
      series.push({
        name: `Day${i + 1}`,
        data: generateData(7, { min: 0, max: 90 }),
      });
    }
    setChartOptions((prev) => ({ ...prev, series }));
  }, []);

   const generateData = (count, yrange) => {
    const series = [];
    for (let i = 0; i < count; i++) {
      const x = `D${i + 1}`;
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      series.push({ x, y });
    }
    return series;
  };


  return (
    <div class = "task-matrix">
      <h2>{chartOptions.title.text}</h2>
      <Chart options={chartOptions} series={chartOptions.series} type="heatmap" height={chartOptions.chart.height} />
    </div>
  );
};

export default Matrix;