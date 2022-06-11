import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default (props) => {
  const options: ApexOptions = {
    chart: {
      zoom: {
        enabled: false
      },
      animations: {
        easing: 'linear',
        dynamicAnimation: {
          speed: 500
        }
      }
    },
    tooltip: {
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
        formatter: (val) => val.toFixed(0)
      },
      title: { text: 'Value' }
    }
  };
  return <Chart type="line" options={options} series={props.dataList} />;
};
