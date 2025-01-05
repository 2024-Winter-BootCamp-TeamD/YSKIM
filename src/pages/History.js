import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const dummyData = [
  { id: 1, mode: "Optimize", title: "Review 1", details: "Details for Review 1" },
  { id: 2, mode: "Clean", title: "Review 2", details: "Details for Review 2" },
  { id: 3, mode: "Basic", title: "Review 3", details: "Details for Review 3" },
  { id: 4, mode: "Beginner", title: "Review 4", details: "Details for Review 4" },
];



// { name: "Optimize<br>Mode", y: 13 },
// { name: "Clean Code<br>Mode", y: 4 },
// { name: "Basic<br>Mode", y: 16 },
// { name: "Beginner<br>Mode", y: 14 },
// ],


function History() {
  const [selectedMode, setSelectedMode] = useState("All");
  const [selectedReview, setSelectedReview] = useState(null);

  const filteredData =
    selectedMode === "All"
      ? dummyData
      : dummyData.filter((review) => review.mode === selectedMode);

  useEffect(() => {
    Highcharts.chart("pie-chart-container", {
      chart: {
        type: "pie",
        custom: {},
        events: {
          render() {
            const chart = this,
              series = chart.series[0];
            let customLabel = chart.options.chart.custom.label;

            if (!customLabel) {
              customLabel = chart.options.chart.custom.label = chart.renderer
                .label(
                  `Total<br/><strong>47</strong>`,
                  0,
                  0
                )
                .css({
                  color: "#000",
                  textAnchor: "middle",
                })
                .add();
            }

            const x = series.center[0] + chart.plotLeft;
            const y =
              series.center[1] +
              chart.plotTop -
              customLabel.attr("height") / 2;

            customLabel.attr({
              x,
              y,
            });
            customLabel.css({
              fontSize: `${series.center[2] / 12}px`,
            });
          },
        },
      },
      title: {
        text: "Categories",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.y}",
          },
        },
      },
      series: [
        {
          name: "Reviews",
          colorByPoint: true,
          innerSize: "75%",
          data: [
            { name: "Optimize<br>Mode", y: 13 },
            { name: "Clean Code<br>Mode", y: 4 },
            { name: "Basic<br>Mode", y: 16 },
            { name: "Beginner<br>Mode", y: 14 },
          ],
        },
      ],
    });
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", gap: "20px" }}>
      <div style={{ gridColumn: "1 / 2", gridRow: "1 / 2", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <div id="pie-chart-container" style={{ height: "400px" }}></div>
      </div>
      <div style={{ gridColumn: "2 / 3", gridRow: "1 / 3", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Review Details</h3>
        {selectedReview ? (
          <div>
            <h4>{selectedReview.title}</h4>
            <p>{selectedReview.details}</p>
          </div>
        ) : (
          <p>Select a review to see the details.</p>
        )}
      </div>
      <div style={{ gridColumn: "1 / 2", gridRow: "2 / 3", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Code Reviews</h3>
        <ul>
          {filteredData.map((review) => (
            <li
              key={review.id}
              style={{ cursor: "pointer", marginBottom: "10px" }}
              onClick={() => setSelectedReview(review)}
            >
              {review.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default History;
