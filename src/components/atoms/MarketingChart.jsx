import React from 'react';
import Chart from 'react-apexcharts';

const MarketingChart = ({ series, categories, height = 350 }) => {
  const options = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#2DCC70', '#2C3E50'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: height,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#2C3E50',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'smooth',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#2DCC70', '#2C3E50'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      max: 250,
    },
  };

  return (
    <div className="col-span-12 rounded-sm bg-white px-5 pt-7.5 pb-5 sm:px-7.5 xl:col-span-8">
      <div id="marketingChart" className="-ml-5">
        <Chart
          options={{ ...options, xaxis: { ...options.xaxis, categories: categories ? JSON.parse(JSON.stringify(categories)) : [] } }}
          series={series ? JSON.parse(JSON.stringify(series)) : []}
          type="area"
          height={height}
        />
      </div>
    </div>
  );
};

export default MarketingChart;
