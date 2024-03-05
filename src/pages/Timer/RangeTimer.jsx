import React, { useState } from "react";
import Calendar from "react-calendar";
import CustomCalendar from "./CustomCalendar.css";

const RangeTimer = ({ date, setDate }) => {
  if (!date || !date.startDate || !date.endDate) {
    // Handle the case where date or its properties are not available
    return <div>Invalid date</div>;
  }

  // Access 'startDate' and 'endDate' safely
  const startDate = date.startDate;
  const endDate = date.endDate;
  // Handler for date change
  const onChange = (newDate) => {
    setDate({ startDate: newDate, endDate: newDate, key: "selection" });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20%",
        right: "10px",
        border: "1px solid grey",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: "white",
        zIndex: 1000, // Ensure it's above other elements
      }}
    >
      <Calendar
        onChange={onChange}
        value={date.startDate}
        selectRange={true} // Enable range selection
      />
    </div>
  );
};

export default RangeTimer;
