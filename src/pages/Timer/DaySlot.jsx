import React, { useState } from "react";
import EventComponent from "./EventComponent"; // Ažurirajte putanju prema potrebi

const DaySlot = ({ dayEvents }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="day-slot">
      {dayEvents.slice(0, expanded ? dayEvents.length : 2).map((event) => (
        <EventComponent key={event.id} event={event} />
      ))}
      {dayEvents.length > 2 && !expanded && (
        <button onClick={() => setExpanded(!expanded)}>Prikaži više</button>
      )}
      {expanded && (
        <button onClick={() => setExpanded(!expanded)}>Prikaži manje</button>
      )}
    </div>
  );
};

export default DaySlot;
