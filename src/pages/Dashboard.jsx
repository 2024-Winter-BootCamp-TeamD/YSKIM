// Dashboard.js
import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Dashboard = () => {
  useEffect(() => {
    // Custom animation for pie chart
    (function (H) {
      H.seriesTypes.pie.prototype.animate = function (init) {
        const series = this,
          chart = series.chart,
          points = series.points,
          {
            animation
          } = series.options,
          {
            startAngleRad
          } = series;

        function fanAnimate(point, startAngleRad) {
          const graphic = point.graphic,
            args = point.shapeArgs;

          if (graphic && args) {

            graphic
              .attr({
                start: startAngleRad,
                end: startAngleRad,
                opacity: 1
              })
              .animate({
                start: args.start,
                end: args.end
              }, {
                duration: animation.duration / points.length
              }, function () {
                if (points[point.index + 1]) {
                  fanAnimate(points[point.index + 1], args.end);
                }
                if (point.index === series.points.length - 1) {
                  series.dataLabelsGroup.animate({
                    opacity: 1
                  },
                  void 0,
                  function () {
                    points.forEach(point => {
                      point.opacity = 1;
                    });
                    series.update({
                      enableMouseTracking: true
                    }, false);
                    chart.update({
                      plotOptions: {
                        pie: {
                          innerSize: '40%',
                          borderRadius: 8
                        }
                      }
                    });
                  });
                }
              });
          }
        }

        if (init) {
          points.forEach(point => {
            point.opacity = 0;
          });
        } else {
          fanAnimate(points[0], startAngleRad);
        }
      };
    }(Highcharts));

    // 파이차트
    const chart = Highcharts.chart('pie-container', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Types of Issues'
      },
      tooltip: {
        headerFormat: '',
        pointFormat:
          '<span style="color:{point.color}">●</span> ' +
          '{point.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          borderWidth: 2,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br>{point.y} Issues',
            distance: 20
          }
        }
      },
      series: [{
        enableMouseTracking: false,
        animation: {
          duration: 2000
        },
        colorByPoint: true,
        data: [{
          name: 'Clean Code',
          y: 17,
          color: '#6665DD',
        }, {
          name: 'Memory',
          y: 45,
          color: '#29E7CD',
        }, {
          name: 'Time',
          y: 23,
          color: '#FF715B',
        },]
      }]
    });

    // 스플라인차트 (꺾은선 그래프)
    Highcharts.chart('spline-container', {
      chart: {
        type: 'spline'
      },
      title: {
        text: "You've imporved this much..."
      },
      xAxis: {
        categories: [
          '2014', '2015', '2016', '2017', '2018', '2019',
          '2020', '2021', '2022', '2023', '2024', '2025'
        ],
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          format: '{value}'
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        name: 'Submitted',
        marker: {
          symbol: 'circle'
        },
        data: [3, 2, 1, 3, 4, 6, 8, 7, 10, 12, 18, 21]

      }, {
        name: 'Approved',
        marker: {
          symbol: 'circle'
        },
        data: [1, 3, 4, 3, 3, 5, 4, 7, 8, 9, 10, 12]
      }]
    });
  });

  return (
    <div>
      <h2>Overview</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div id="spline-container" style={{ width: "48%", height: "400px" }}></div>
        <div id="pie-container" style={{ width: "48%", height: "400px" }}></div>
      </div>
    </div>
  );
};

export default Dashboard;
