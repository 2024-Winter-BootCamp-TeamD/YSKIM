import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import { GoChevronRight } from "react-icons/go";
import HighchartsReact from "highcharts-react-official";

// 리뷰 데이터 배열
// 리뷰 데이터에는 모드(mode), 인덱스(title), 상세 내용(details), 날짜(date), PR 제목(pr), PR 주소(pr_)이 포함됩니다.
const dummyData = [
  { mode: "Optimize", title: "Review 1", details: "Details for Review 1", date: "2023.11.03", pr: "Feat/#68 수정하기api 반환값에 origin_url추가" },
  { mode: "Clean", title: "Review 2", details: "Details for Review 2", date: "2023.11.05", pr: "Feat/#59 Documents관련 api 암호화 로직 추가" },
  { mode: "Basic", title: "Review 3", details: "Details for Review 3", date: "2023.12.08", pr: "Feat/#48 modified_html 함수 Celary로 비동기 처리" },
  { mode: "Beginner", title: "Review 4", details: "Details for Review 4", date: "2023.12.08", pr: "Feat/#51 검토결과 - tasks.py 비동기 처리" },
  { mode: "Beginner", title: "Review 5", details: "Details for Review 5", date: "2023.12.11", pr: "Feat/#51 검토결과 - tasks.py 비동기 처리" },
  { mode: "Basic", title: "Review 6", details: "Details for Review 6", date: "2023.12.13", pr: "Feat/#51 검토결과 - tasks.py 비동기 처리" },
  { mode: "Beginner", title: "Review 7", details: "Details for Review 7", date: "2023.12.17", pr: "Feat/#51 검토결과 - tasks.py 비동기 처리" },
  { mode: "Clean", title: "Review 8", details: "Details for Review 8", date: "2023.12.22", pr: "Feat/#51 검토결과 - tasks.py 비동기 처리" },
  { mode: "Clean", title: "Review 9", details: "Details for Review 9", date: "2023.12.27", pr: "Feat/#51 검토결과 - tasks.py 비동기 처리" },
  { mode: "Beginner", title: "Review 10", details: "Details for Review 10", date: "2024.01.02", pr: "Feat/#51 검토결과 - tasks.py 비동기 처리" },
];

function History() {
  const [selectedMode, setSelectedMode] = useState("All");
  const [selectedReview, setSelectedReview] = useState(null);

  const filteredData =
    selectedMode === "All"
      ? dummyData
      : dummyData.filter((review) => review.mode === selectedMode);

  useEffect(() => {
    const modeCounts = dummyData.reduce((acc, review) => {
      acc[review.mode] = (acc[review.mode] || 0) + 1;
      return acc;
    }, {});

    const totalLength = dummyData.length;
    Highcharts.chart("pie-chart-container", {
      chart: {
        type: "pie",
        custom: {},
        spacingBottom: 50,
        events: {
          render() {
            const chart = this,
              series = chart.series[0];
            let customLabel = chart.options.chart.custom.label;

            if (!customLabel) {
              customLabel = chart.options.chart.custom.label = chart.renderer
                .label(
                  `Reviews<br/><strong>${totalLength}</strong>`,
                  chart.plotLeft + chart.plotWidth / 2,
                  chart.plotTop + chart.plotHeight / 2
                )
                .css({
                  color: "#000",
                  textAnchor: "middle",
                })
                .add();
            }

            const bbox = customLabel.getBBox();
            customLabel.attr({
              x: chart.plotLeft + chart.plotWidth / 2 - bbox.width / 2,
              y: chart.plotTop + chart.plotHeight / 2 - bbox.height / 2,
            });
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
          click(event) {
            const point = event.point;
            if (point && point.name) {
              const modeName = point.name.split("<br>")[0];
              setSelectedMode((prevMode) => (prevMode === modeName ? "All" : modeName));
            }
          },
        },
      },
      title: {
        text: "",
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
            style: {
              fontSize: "18px",
            }
          },
          point: {
            events: {
              click: function () {
                setSelectedMode((prevMode) => (prevMode === this.name.split("<br>")[0] ? "All" : this.name.split("<br>")[0]));
              },
            },
          },
        },
      },
      series: [
        {
          name: "Reviews",
          colorByPoint: true,
          innerSize: "75%",
          data: [
            { name: "Optimize", y: modeCounts["Optimize"] || 0 },
            { name: "Clean", y: modeCounts["Clean"] || 0 },
            { name: "Basic", y: modeCounts["Basic"] || 0 },
            { name: "Beginner", y: modeCounts["Beginner"] || 0 },
          ],
        },
      ],
    });
  }, []);
  // Review List의 모드별 색상 매핑
  const colorMapping = {
      Optimize: "#2CAFFE",
      Clean: "#6D68DE",
      Basic: "#19FB8B",
      Beginner: "#FF834E",
    };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", gap: "20px", height: "calc(100vh - 40px)", padding: "20px", boxSizing: "border-box" }}>
      {/* Pie Chart */}
      <div style={{ gridColumn: "1 / 2", gridRow: "1 / 2", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" , height: "600px", boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)"}}>  
        <h3 style={{marginBottom: "0px"}}>Categories</h3>
        <div 
          id="pie-chart-container" 
          style={{ 
            height: "95%",
            width: "100%",
            boxSizing: "border-box", }}></div>
      </div>

      {/* Review List */}
      <div style={{ gridColumn: "1 / 2", gridRow: "2 / 3", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", overflowY: "hidden", boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)"}}>
        <h3 style={{marginBottom: "10px"}}>Review List</h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 , overflowY: "scroll", height: "calc(100% - 40px)"}}>
          {filteredData.map((review) => (
            <li
              key={review.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#ddd",
                    marginRight: "10px",
                  }}
                ></div>
                <div>
                  <div>{review.date}</div>
                  <div style={{ fontWeight: "bold" }}>{review.pr}</div>
                </div>
              </div>
              <div style={{color: colorMapping[review.mode], cursor: "pointer"}} onClick={() => setSelectedReview(review)}><strong>{review.mode} Mode</strong></div>
              <div
                style={{
                  position: "relative",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedReview(review)}>
                <GoChevronRight style={{ fontSize: "20px", color: "#000" }} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Code Reviews */}
      <div style={{ gridColumn: "2 / 3", gridRow: "1 / 3", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)"}}>
        <h3>Code Reviews</h3>
        {selectedReview ? (
          <div>
            <h4>{selectedReview.title}</h4>
            <p>{selectedReview.details}</p>
          </div>
        ) : (
          <p>Select a review to see the details.</p>
        )}
      </div>
    </div>
  );
}

export default History;
