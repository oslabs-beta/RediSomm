import React from 'react';
import Chart from 'react-apexcharts';

const Realtimetest = (props) => {
  const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;
  const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000;
  const ADDING_DATA_RATIO = 0.8;

  const nameList = ['a'];
  const defaultDataList = nameList.map((name) => ({
    name: name,
    data: []
  }));

  //added to test if graph has limit
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const [dataList, setDataList] = React.useState(defaultDataList);

  React.useEffect(() => {
    const addDataRandomly = (data) => {
      if (Math.random() < 1 - ADDING_DATA_RATIO) {
        return data;
      }
      return [
        ...data,
        {
          x: new Date(),
          // y: data.length * Math.random()
          y: getRandomInt(50)
        }
      ];
    };
    const interval = setInterval(() => {
      setDataList(
        dataList.map((val) => {
          return {
            name: val.name,
            data: addDataRandomly(val.data)
          };
        })
      );
    }, ADDING_DATA_INTERVAL_IN_MILLISECONDS);

    return () => clearInterval(interval);
  });

  return (
    <div>
      Key Space Miss over Time
      <Chart
        type="line"
        width={900}
        height={500}
        series={[
          {
            name: 'Comeback',
            data: [150, 192, 232, 335, 442, 545, 653, 757, 820, 890, 935, 973],
            color: '#F8B195'
          }
        ]}
        options={{
          //   colors: ['#9CCFE7', '#977FD7', '#FFAAA6']
          chart: {
            toolbar: {
              show: false
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
          ],
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
        dataList={dataList}
        range={TIME_RANGE_IN_MILLISECONDS}
      ></Chart>
    </div>
  );
};

export default Realtimetest;
