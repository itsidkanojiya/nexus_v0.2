export function getDayOfWeek(selectedDate) {
  // Convert the selectedDate to a JavaScript Date object
  const dateObj = new Date(selectedDate);

  // Array of weekday names
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Get the day of the week from the date object (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayIndex = dateObj.getDay();

  // Return the name of the day of the week
  return daysOfWeek[dayIndex];
}
