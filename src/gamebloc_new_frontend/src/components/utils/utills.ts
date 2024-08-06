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

  // console.log("ended", currentDateStr >= targetDateStr)
  // Compare the date strings
  return currentDateStr >= targetDateStr
}

export function inProgress(givenDate) {
  let dateMatch = givenDate.match(/\d{4}-\d{2}-\d{2}/)
  let date = dateMatch[0]
  // Parse the given date string into year, month, and day
  const [year, month, day] = date.split("-").map(Number)

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

  // console.log("ended", currentDateStr >= targetDateStr)
  // Compare the date strings
  return currentDateStr >= targetDateStr
}

  export const convertToMilliseconds = (inputDateString: String) => {
    const dateTimeMatch = inputDateString.match(
      /(\d{1,2}:\d{2}\s*[APMapm]+)\s*(\d{4}-\d{2}-\d{2})/,
    )

    if (!dateTimeMatch) {
      console.error("Invalid date format")
      return NaN
    }

    const [, time, date] = dateTimeMatch

    // Extract hours, minutes, and AM/PM from the time part
    const [hoursStr, minutesStr] = time.split(":")
    const hours = parseInt(hoursStr, 10)
    const minutes = parseInt(minutesStr, 10)
    const isPM = /pm/i.test(time)

    // Extract year, month, and day from the date part
    const [yearStr, monthStr, dayStr] = date.split("-")
    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10) - 1
    const day = parseInt(dayStr, 10)

    // Convert 12-hour format to 24-hour format
    let adjustedHours = hours
    if (isPM && hours !== 12) {
      adjustedHours += 12
    } else if (!isPM && hours === 12) {
      adjustedHours = 0
    }

    // Create a new Date object with the components
    const dateObject = new Date(year, month, day, adjustedHours, minutes)

    // Check for invalid date
    if (isNaN(dateObject.getTime())) {
      console.error("Invalid date")
      return NaN
    }

    // Get the timestamp in milliseconds
    const timestampInMilliseconds = dateObject.getTime()

    return timestampInMilliseconds
  }