import React from 'react';
import Chart from 'react-apexcharts';

const ApexBar = () => {
  return (
    <div>
      Stacked Bar Chart
      <Chart
        type="bar"
        width={600}
        height={600}
        series={[
          {
            name: 'Data1',
            data: [20, 10, 15, 10, 5, 7, 10],
            color: '#F8B195'
          },
          {
            name: 'Data2',
            data: [7, 9, 15, 5, 3, 12, 10],
            color: '#F67280'
          },
          {
            name: 'Data3',
            data: [10, 5, 10, 7, 12, 20, 10],
            color: '#355C7D'
          }
        ]}
        options={{
          chart: {
            toolbar: {
              show: false
            }
            // stacked: true
          },
          xaxis: {
            labels: {
              style: {
                colors: '#f3f3f3'
              }
            },
            tickPlacement: 'on',
            categories: ['1', '2', '3', '4', '5', '6', '7'],
            title: {
              text: 'Time',
              style: {
                color: '#f3f3f3'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: ['#f3f3f3']
              }
            },
            title: {
              text: 'Hit/Miss',
              style: {
                color: '#f3f3f3'
              }
            }
          },
          legend: {
            show: true,
            position: 'top',
            labels: {
              colors: '#f3f3f3'
            }
          }
        }}
      ></Chart>
    </div>
  );
};

export default ApexBar;
