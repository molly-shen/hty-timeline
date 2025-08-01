import React, { useState } from "react";
import { timelineData } from "../data/timelineData";
import YearList from "./YearList";
import EventCards from "./EventCards";

const Timeline = () => {
  const [selectedYear, setSelectedYear] = useState(timelineData[0].year);
  const currentEvents = timelineData.find(item => item.year === selectedYear)?.events || [];

  return (
    <div className="timeline-container">
      <YearList years={timelineData.map(item => item.year)} selectedYear={selectedYear} onSelect={setSelectedYear} />
      <EventCards events={currentEvents} />
    </div>
  );
};

export default Timeline;
