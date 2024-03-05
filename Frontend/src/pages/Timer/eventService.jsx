// Function to load events from localStorage and format them for the calendar
export const loadEvents = () => {
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  return events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
};

// Function to save or update an event in localStorage
export const saveEvent = (event) => {
  const events = loadEvents();
  const existingIndex = events.findIndex((e) => e.id === event.id);

  if (existingIndex > -1) {
    // Update existing event
    events[existingIndex] = event;
  } else {
    // Add new event with a unique ID
    event.id = Date.now();
    events.push(event);
  }

  // Save back to localStorage
  localStorage.setItem("events", JSON.stringify(events));
};
