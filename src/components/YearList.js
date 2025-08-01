import React from "react";

const YearList = ({ years, selectedYear, onSelect }) => (
  <div className="year-list">
    {years.map(year => (
      <button key={year} className={`year-btn ${year === selectedYear ? "selected" : ""}`} onClick={() => onSelect(year)}>
        {year}
      </button>
    ))}
  </div>
);
export default YearList;
