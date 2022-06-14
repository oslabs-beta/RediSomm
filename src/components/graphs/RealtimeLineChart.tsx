import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default (props) => {
  const options: ApexOptions = {
    chart: {
      width: '1000',
      height: '600',
      toolbar: {
        show: false
      },
      // zoom: {
      //   enabled: false
      // },
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
      range: props.range,
      title: {
        text: 'Time',
        style: {
          color: '#f3f3f3'
        }
      },
      labels: {
        style: {
          colors: '#f3f3f3'
        }
      }
    },

    // yaxis: {
    //   labels: {
    //     // formatter: (val) => val.toFixed()
    //     formatter: (val) => val.toFixed(10)
    //   },
    //   title: { text: 'Hit/Miss' }
    // }
    yaxis: [
      {
        labels: {
          style: {
            colors: ['#f3f3f3']
          },
          formatter: function (val) {
            return val.toFixed(0);
          }
        },
        title: {
          text: 'Usage',
          style: {
            color: '#f3f3f3'
          }
        }
      }
    ]
    // legend: {
    //   show: true,
    //   position: 'top',
    //   labels: {
    //     colors: '#f3f3f3'
    //   }
    // }
  };
  return (
    <Chart
      type="line"
      width={900}
      height={500}
      options={options}
      series={props.dataList}
    />
  );
};
