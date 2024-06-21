export const generateDate = () => {
  let currentDate = new Date()

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }

  const dayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
  }

  const timeString = currentDate.toLocaleTimeString("en-US", timeOptions)
  const dayString = currentDate.toLocaleDateString("en-US", dayOptions)

  let currentMonth = currentDate.toLocaleString("default", { month: "long" })
  let currentYear = currentDate.getFullYear()
  let dayOfMonth = currentDate.getDate()

  let date =
    `${timeString}, ${dayString}` +
    ", " +
    dayOfMonth +
    " " +
    currentMonth +
    ", " +
    currentYear +
    "."
  return date
}

export const squadCount = (data: any) => {
  let totalCount = 0
  data.squad.forEach((player: any) => (totalCount += player.members.length))
  return totalCount
}

export const formatDate = (inputDate) => {
  // Split the input string by space
  var parts = inputDate.split(" ")

  // Extract time
  var time = parts[0]

  // Extract am/pm
  var ampm = parts[1]

  // Extract date
  var dateParts = parts[2].split("-")
  var year = dateParts[0]
  var month = parseInt(dateParts[1])
  var day = parseInt(dateParts[2])

  // Convert month to word
  var months = [
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
  ]
  var monthWord = months[month - 1]

  // Convert day to word
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  var dayOfWeek = new Date(year, month - 1, day).getDay()
  var dayWord = days[dayOfWeek]

  // Create the formatted string
  var formattedDate =
    time +
    " " +
    ampm +
    ", " +
    dayWord +
    " " +
    monthWord +
    " " +
    day +
    ", " +
    year

  return formattedDate
}

export const formatDate2 = (inputDate) => {
  // Extract date
  var dateParts = inputDate.split("-")
  var year = dateParts[0]
  var month = parseInt(dateParts[1])
  var day = parseInt(dateParts[2])

  // Convert month to word
  var months = [
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
  ]
  var monthWord = months[month - 1]

  // Convert day to word
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  var dayOfWeek = new Date(year, month - 1, day).getDay()
  var dayWord = days[dayOfWeek]

  // Create the formatted string
  var formattedDate = dayWord + " " + monthWord + " " + day + ", " + year

  return formattedDate
}

export function hasDateReached(givenDate) {
  // Parse the given date string into year, month, and day
  const [year, month, day] = givenDate.split("-").map(Number)

  // Create a comparable string for the given date
  const targetDateStr = `${year.toString().padStart(4, "0")}${month
    .toString()
    .padStart(2, "0")}${day.toString().padStart(2, "0")}`

  // Get the current date components
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1 // Months are zero-indexed
  const currentDay = currentDate.getDate()

  // Create a comparable string for the current date
  const currentDateStr = `${currentYear
    .toString()
    .padStart(4, "0")}${currentMonth.toString().padStart(2, "0")}${currentDay
    .toString()
    .padStart(2, "0")}`

  console.log("ended", currentDateStr >= targetDateStr)
  // Compare the date strings
  return currentDateStr >= targetDateStr
}
