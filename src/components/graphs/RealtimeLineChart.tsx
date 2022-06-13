import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default (props) => {
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      animations: {
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      }
    },
    stroke: {
      curve: 'smooth'
    },
    tooltip: {
      enabled: true,
      x: {
        format: 'yyyy/MM/dd HH:mm:ss.f'
      }
    },
    xaxis: {
      type: 'datetime',
      range: props.range
    },
    yaxis: {
      labels: {
        // formatter: (val) => val.toFixed()
        formatter: (val) => val.toFixed(10)
      },
      title: { text: 'Hit/Miss' }
    }
  };
  return <Chart type="line" options={options} series={props.dataList} />;
};
