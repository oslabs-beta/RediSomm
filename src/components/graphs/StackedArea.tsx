import React from 'react';
import Chart from 'react-apexcharts';

const StackedArea = () => {
  return (
    <div>
      <div className="StackedArea-name">
        <div className="stackedarea-title">Keyspace Miss Over Time </div>
      </div>

      <Chart
        className="stackedarea-chart"
        type="area"
        width={900}
        height={500}
        series={[
          {
            name: 'Comeback',
            data: [150, 192, 232, 335, 442, 545, 653, 757, 820, 890, 935, 973],
            color: '#F8B195'
          },
          {
            name: 'BTS',
            data: [87, 95, 143, 160, 204, 264, 353, 450, 513, 560, 623, 774],
            color: '#F67280'
          },
          {
            name: 'BlackPink',
            data: [55, 76, 106, 153, 176, 192, 204, 226, 294, 318, 480, 579],
            color: '#355C7D'
          },
          {
            name: 'Weekly Idol',
            data: [46, 90, 95, 111, 145, 155, 176, 182, 192, 201, 211, 246],
            color: '#C06C84'
          },
          {
            name: 'IU',
            data: [75, 150, 185, 234, 297, 326, 450, 487, 571, 621, 678, 721],
            color: '#6C5B7B'
          },
          {
            name: 'Twice',
            data: [79, 132, 156, 205, 278, 318, 401, 499, 532, 588, 611, 635],
            color: '#B7D0CD'
          },
          {
            name: 'That That',
            data: [80, 150, 179, 253, 293, 359, 399, 449, 563, 587, 605, 638],
            color: '#947481'
          },
          {
            name: 'Suga',
            data: [112, 180, 222, 260, 290, 379, 421, 485, 523, 549, 684, 721],
            color: '#99B898'
          },
          {
            name: 'Psy',
            data: [112, 174, 223, 270, 321, 377, 400, 423, 455, 523, 554, 689],
            color: '#45ADA8'
          },
          {
            name: 'Jennie',
            data: [76, 90, 102, 121, 142, 160, 232, 332, 408, 497, 556, 588],
            color: '#9DE0AD'
          },
          {
            name: 'Coachella',
            data: [50, 90, 98, 105, 132, 137, 156, 187, 229, 246, 255, 287],
            color: '#510A32'
          },
          {
            name: '2ne1',
            data: [75, 80, 99, 121, 150, 201, 259, 307, 353, 379, 425, 488],
            color: '#474747'
          }
        ]}
        options={{
          //   colors: ['#9CCFE7', '#977FD7', '#FFAAA6']
          chart: {
            toolbar: {
              show: false
            },
            stacked: true
          },
          xaxis: {
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
            },
            labels: {
              style: {
                colors: '#f3f3f3'
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
          },
          //information(number) that displays in the graph
          dataLabels: { enabled: false }
        }}
      ></Chart>
    </div>
  );
};

export default StackedArea;
