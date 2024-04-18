
function currentDate()
{
// Get current date
let currentDate = new Date();

// Extract day, month, and year
let day = currentDate.getDate();
let month = currentDate.getMonth() + 1; // Month starts from 0
let year = currentDate.getFullYear();

// Add leading zeros if necessary
if (day < 10) {
    day = '0' + day;
}
if (month < 10) {
    month = '0' + month;
}

// Format the date as mm/dd/yyyy
let formattedDate = month + '/' + day + '/' + year;

return formattedDate;
}

module.exports = currentDate