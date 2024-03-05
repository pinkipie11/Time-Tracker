const API_BASE_URL = "https://1permil.com/api";

export const postTimeEntry = async (timeEntry) => {
  try {
    // Create a unique ID for the new time entry; in a real app, a more robust unique ID generation would be used
    timeEntry.id = Date.now();

    // Get existing time entries from local storage, parse them, and add the new entry
    const entries = JSON.parse(localStorage.getItem("timeEntries") || "[]");
    entries.push(timeEntry);

    // Save the updated array back to local storage
    localStorage.setItem("timeEntries", JSON.stringify(entries));

    // Return the new entry
    return timeEntry;
  } catch (error) {
    console.error("Local Storage error:", error);
    throw error; // Propagating the error to be handled by the calling function
  }
};

export const getTimeEntries = async () => {
  try {
    // Retrieve and parse the time entries from local storage
    const entries = JSON.parse(localStorage.getItem("timeEntries") || "[]");
    return entries;
  } catch (error) {
    console.error("Local Storage error:", error);
    throw error; // Propagating the error to be handled by the calling function
  }
};
