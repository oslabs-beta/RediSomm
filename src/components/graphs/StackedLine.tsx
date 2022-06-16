import React from 'react';
import Chart from 'react-apexcharts';

const StackedLine = () => {
  return (
    <div>
      Stacked Area Chart
      <Chart
        type="line"
        width={800}
        height={600}
        series={[
          {
            name: 'Data1',
            data: [20, 30, 15, 10, 5, 7, 10, 10, 10, 10, 10, 10],
            color: '#F8B195'
          },
          {
            name: 'Data2',
            data: [7, 9, 15, 5, 3, 12, 10, 10, 10, 10, 10, 10, 10],
            color: '#F67280'
          },
          {
            name: 'Data3',
            data: [10, 5, 10, 7, 12, 20, 10, 10, 10, 10, 10, 10, 10],
            color: '#355C7D'
          }
        ]}
        options={{
          chart: {
            toolbar: {
              show: false
            },
            stacked: true
          },
          xaxis: {
            labels: {
              style: {
                colors: '#f3f3f3'
              }
            },
            tickPlacement: 'on',
            categories: [
              '0:00',
              '1:00',
              '2:00',
              '3:00',
              '4:00',
              '5:00',
              '6:00',
              '7:00',
              '8:00',
              '9:00',
              '10:00',
              '11:00',
              '12:00'
            ],
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

export default StackedLine;
