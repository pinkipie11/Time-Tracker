const MonthDayCell = ({ day, events }) => {
  const [expanded, setExpanded] = useState(false);

  const displayEvents = expanded ? events : events.slice(0, 2);

  return (
    <div className="day-cell" onClick={() => setExpanded(!expanded)}>
      {displayEvents.map((event) => (
        <div key={event.id} className="event">
          {event.title}
        </div>
      ))}
      {events.length > 2 && !expanded && (
        <div className="more-events">+{events.length - 2} više</div>
      )}
    </div>
  );
};

export default MonthDayCell;
