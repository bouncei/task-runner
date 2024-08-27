export const formatDateTime = (date: Date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours() % 12 || 12; // Fix: handle midnight (0) correctly
  const minute = date.getMinutes();
  const ampm = date.getHours() >= 12 ? "pm" : "am"; // Fix: use original hour for am/pm

  return `${day} ${month} ${year}, ${hour}:${minute
    .toString()
    .padStart(2, "0")}${ampm}`;
};
