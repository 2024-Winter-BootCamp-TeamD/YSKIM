import React, { useState } from "react";

const dummyData = [
  { id: 1, mode: "Beginner", title: "Review 1", details: "Details for Review 1" },
  { id: 2, mode: "Optimize", title: "Review 2", details: "Details for Review 2" },
  { id: 3, mode: "Clean", title: "Review 3", details: "Details for Review 3" },
];

function History() {
  const [selectedMode, setSelectedMode] = useState("All");
  const [selectedReview, setSelectedReview] = useState(null);

  const filteredData =
    selectedMode === "All"
      ? dummyData
      : dummyData.filter((review) => review.mode === selectedMode);

  return (
    <div>
      <h2>History</h2>
      <div className="filters">
        <button onClick={() => setSelectedMode("All")}>All</button>
        <button onClick={() => setSelectedMode("Beginner")}>Beginner</button>
        <button onClick={() => setSelectedMode("Optimize")}>Optimize</button>
        <button onClick={() => setSelectedMode("Clean")}>Clean</button>
      </div>
      <ul>
        {filteredData.map((review) => (
          <li key={review.id} onClick={() => setSelectedReview(review)}>
            {review.title}
          </li>
        ))}
      </ul>
      {selectedReview && (
        <div className="review-details">
          <h3>{selectedReview.title}</h3>
          <p>{selectedReview.details}</p>
        </div>
      )}
    </div>
  );
}

export default History;