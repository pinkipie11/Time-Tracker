import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTimeContext } from "./TimeContext";
import EventComponent from "./EventComponent";

// Properly defining the localizer outside the component
const localizer = momentLocalizer(moment);

const CalendarView = ({ selectedProject }) => {
  const [view, setView] = useState("month"); // Početni prikaz
  const { calendarEvents } = useTimeContext();

  return (
    <div style={{ height: "700px" }}>
      <Calendar
        selectedProject={selectedProject}
        localizer={localizer}
        events={calendarEvents.map((event) => ({
          ...event,
          projectName: selectedProject ? selectedProject.name : "No Project",
        }))}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={setView} // Ažurira prikaz na temelju korisničkog odabira
        style={{ height: "100%" }}
        components={{
          event: (props) => <EventComponent {...props} view={view} />,
        }}
      />
    </div>
  );
};

export default CalendarView;
