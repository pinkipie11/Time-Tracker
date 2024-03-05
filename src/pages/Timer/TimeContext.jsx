import React, { useState, useEffect } from "react";
import { getTimeEntries, postTimeEntry } from "./localStorageService";
import { calculateDuration } from "./utils";

export const TimeContext = React.createContext({});

export const useTimeContext = () => React.useContext(TimeContext);

export const TimeProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [watch, setWatch] = useState(0);
  const [events, setEvents] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const addCalendarEvent = (newEvent) => {
    setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  // Function to load events from localStorage
  const loadEvents = () => {
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    return events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  };

  // Function to save event to localStorage and update the context
  const saveEvent = (eventData) => {
    console.log("Saving event data:", eventData);

    const events = loadEvents();
    console.log("Existing events:", events);

    const index = events.findIndex((event) => event.id === eventData.id);

    const duration = calculateDuration(eventData.start, eventData.end);
    const updatedEvent = {
      ...eventData,
      measuredTime: eventData.measuredTime,
      duration,
      projectName: eventData.projectName,
    };

    if (index > -1) {
      events[index] = updatedEvent; // Update existing event
    } else {
      events.push(updatedEvent); // Add new event if it doesn't exist
    }
    console.log("Updated events:", events);

    localStorage.setItem("events", JSON.stringify(events));
    setEvents(events);
  };

  // Function to delete event from localStorage
  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  useEffect(() => {
    const loadedEvents = loadEvents();
    setEvents(loadedEvents);
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      const entriesFromStorage = await getTimeEntries();
      setEntries(entriesFromStorage);
    };

    fetchEntries();
  }, []);

  const incrementWatch = (increment) => {
    setWatch((prevWatch) => prevWatch + increment);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const formatHourAndMinute = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  const addEntry = async (newEntryData) => {
    const newEntry = await postTimeEntry(newEntryData);
    setEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  useEffect(() => {
    const fetchEntries = async () => {
      const entriesFromStorage = await getTimeEntries();
      setEntries(entriesFromStorage);
    };

    fetchEntries();
  }, []);

  const contextValue = {
    entries,
    events,
    isRunning,
    watch,
    addEntry,
    saveEvent,
    deleteEvent,
    setIsRunning,
    setWatch,
    incrementWatch,
    formatTime,
    formatHourAndMinute,
    calendarEvents,
    addCalendarEvent,
    selectedProject,
    setSelectedProject,
  };

  return (
    <TimeContext.Provider value={contextValue}>{children}</TimeContext.Provider>
  );
};
