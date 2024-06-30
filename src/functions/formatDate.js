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
