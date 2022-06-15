import React from 'react';
import Chart from 'react-apexcharts';

const ApexPie = () => {
  return (
    <div>
      Piechart
      <Chart
        type="pie"
        width={600}
        height={600}
        series={[10, 20, 30, 40, 50, 60, 70]}
        options={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
          colors: [
            '#F8B195',
            '#F67280',
            '#C06C84',
            '#6C5B7B',
            '#355C7D',
            '#B7D0CD',
            '#947481'
          ]
        }}
      ></Chart>
    </div>
  );
};

export default ApexPie;
