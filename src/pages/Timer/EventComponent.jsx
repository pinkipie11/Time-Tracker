import React from "react";
import moment from "moment";
import "./EventComponent.css";
import { calculateDuration } from "./utils";

const EventComponent = ({ event, view }) => {
  const duration =
    event.start && event.end
      ? calculateDuration(event.start, event.end)
      : "Trajanje nije dostupno";

  return (
    <div className="event-component">
      <strong>{event.title}</strong>
      <div>Date: {moment(event.start).format("YYYY-MM-DD")}</div>
      <div>
        Time: {moment(event.start).format("HH:mm")} -{" "}
        {moment(event.end).format("HH:mm")}
      </div>
      <div>Trajanje: {duration}</div>
      <div>Projekt: {event.projectName || "Nema projekta"}</div>
    </div>
  );
};

export default EventComponent;
