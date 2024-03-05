/**
 * Calculates the duration of an event and returns it in the format HH:mm:ss.
 * @param {Date} start - The start time of the event.
 * @param {Date} end - The end time of the event.
 * @returns {string} The duration formatted as HH:mm:ss.
 */
export const calculateDuration = (start, end) => {
  // Calculate the duration in milliseconds by subtracting the start time from the end time
  const durationInMilliseconds = end.getTime() - start.getTime();

  // Calculate the number of seconds, minutes, and hours in the duration
  let seconds = Math.floor(durationInMilliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  // Calculate the remaining seconds and minutes after subtracting hours
  seconds = seconds % 60;
  minutes = minutes % 60;

  // Add leading zeros to ensure two-digit format for hours, minutes, and seconds
  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  // Return the duration in the format HH:mm:ss
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};
