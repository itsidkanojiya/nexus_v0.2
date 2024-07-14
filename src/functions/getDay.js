export function getDayName(dateString) {
  // Create a new Date object from the input date string
  const date = new Date(dateString);

  // Array of day names
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Get the day of the week (0-6) and return the corresponding day name
  return days[date.getDay()];
}
