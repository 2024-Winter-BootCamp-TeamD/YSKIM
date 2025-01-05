import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Dashboard = () => {
  useEffect(() => {
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
              // Set initial animation values
              .attr({
                start: startAngleRad,
                end: startAngleRad,
                opacity: 1
              })
              // Animate to the final position
              .animate({
                start: args.start,
                end: args.end
              }, {
                duration: animation.duration / points.length
              }, function () {
                // On complete, start animating the next point
                if (points[point.index + 1]) {
                  fanAnimate(points[point.index + 1], args.end);
                }
                // On the last point, fade in the data labels, then
                // apply the inner size
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
          // Hide points on init
          points.forEach(point => {
            point.opacity = 0;
          });
        } else {
          fanAnimate(points[0], startAngleRad);
        }
      };
    }(Highcharts));

    Highcharts.chart('container', {
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
        // Disable mouse tracking on load, enable after custom animation
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
  }, []);

  return (
    <div>
      <h2>Overview</h2>
      <div id="container" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default Dashboard;
