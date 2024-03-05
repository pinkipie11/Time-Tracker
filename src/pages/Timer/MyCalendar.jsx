import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal } from "react-modal";
import moment from "moment";
import EventModal from "./EventModal";
import { useTimeContext } from "./TimeContext";

const localizer = momentLocalizer(moment);
const Calendar = require("react-big-calendar");

const MyCalendar = () => {
  const { entries, saveEvent } = useTimeContext(); // Removed addEntry as it's not used
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [view, setView] = useState("month");

  const handleEventClick = (event) => {
    // Otvorite modal s detaljima događaja
  };

  const eventPropGetter = (event) => {
    // Ovdje možete prilagoditi stilove događaja na osnovu kategorije
    const backgroundColor = getCategoryColor(event.category);
    return { style: { backgroundColor } };
  };

  // Load events from context on component mount and when entries change
  useEffect(() => {
    const calendarEvents = entries.map((entry) => ({
      id: entry.id,
      title: entry.Description,
      start: new Date(entry.StartTime), // Ensure this is a Date object
      end: new Date(entry.EndTime), // Ensure this is a Date object
      allDay: entry.allDay || false,
    }));
    setEvents(calendarEvents);
  }, [entries]);

  // Handler for selecting an event
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  // Handler for selecting a slot
  const handleSelectSlot = (slotInfo) => {
    // Prepare a new event object for the EventModal
    const newEvent = {
      id: Math.random(), // Temporary ID; replace with a proper unique ID generator
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
      allDay: false,
    };
    setSelectedEvent(newEvent);
    setModalOpen(true);
  };

  // Save the new or updated event
  const handleSaveEvent = (eventData) => {
    saveEvent(eventData); // Save event using the context function
    setModalOpen(false); // Close the modal after saving
  };

  useEffect(() => {
    console.log("Events state updated:", events);
  }, [events]);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "700px" }}
    />
  );
};
