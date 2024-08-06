// Function to check if all fields have values
export const areAllFieldsFilled = (details) => {
  if (!details) {
    return false; // If peparDetails itself is empty or undefined, return false
  }

  for (const key in details) {
    if (details.hasOwnProperty(key)) {
      if (!details[key] && details[key] !== 0) {
        return false; // If any field is empty or undefined, return false
      }
    }
  }
  return true; // All fields have non-empty values
};

export function formatTime12Hour(time24) {
  // Split the time into hours and minutes
  var timeArray = time24.split(":");
  var hours = parseInt(timeArray[0]);
  var minutes = parseInt(timeArray[1]);

  // Determine AM or PM
  var period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Add leading zeros to minutes if needed
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the formatted time string
  var formattedTime = hours + ":" + minutes + " " + period;

  return formattedTime;
}

export function formatDate(inputDate) {
  // Split the input date into year, month, and day
  var dateParts = inputDate.split("-");
  var year = dateParts[0];
  var month = dateParts[1];
  var day = dateParts[2];

  // Construct the formatted date string
  var formattedDate = day + "-" + month + "-" + year;

  return formattedDate;
}

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

// // Example usage:
// const selectedDate = "2024-04-30"; // Assuming the format is YYYY-MM-DD
// const dayOfWeek = getDayOfWeek(selectedDate);
// console.log(dayOfWeek); // Output will be the day of the week (e.g., "Saturday")
