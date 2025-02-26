import React, { useState } from "react"
import { LineChart, EventProps } from "@tremor/react"

interface prop {
  tournament: any
}

const AdminChart = ({ tournament }: prop) => {
  const countTournamentsByMonth = (tournament: any) => {
    // Initialize an object to store counts for each month
    const monthCounts = {}

    // Iterate through each tour
    tournament.forEach((tour: any) => {
      const startingDate = new Date(tour.starting_date)
      const month = startingDate.toLocaleString("default", { month: "short" }) // Get the month name (e.g., Jan, Feb, etc.)
      console.log("Month", month)
      // Initialize the count for this month if not already initialized
      if (!monthCounts[month]) {
        monthCounts[month] = {
          Crowdfunded: 0,
          Prepaid: 0,
          Blitzkrieg: 0,
        }
      }

      // Check the tournament type and increment the respective count
      if (
        Object.keys(tour.tournament_type)[0].toUpperCase() === "CROWDFUNDED"
      ) {
        monthCounts[month].Crowdfunded++
      } else if (
        Object.keys(tour.tournament_type)[0].toUpperCase() === "PREPAID"
      ) {
        monthCounts[month].Prepaid++
      } else if (
        Object.keys(tour.tournament_type)[0].toUpperCase() === "BLITZKRIEG"
      ) {
        monthCounts[month].Blitzkrieg++
      }
    })
    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ]

    // Construct the result array from the monthCounts object
    const result = monthOrder.map((month) => {
      return {
        date: month,
        Crowdfunded: monthCounts[month]?.Crowdfunded || 0,
        Prepaid: monthCounts[month]?.Prepaid || 0,
        Blitzkrieg: monthCounts[month]?.Blitzkrieg || 0,
      }
    })

    return result
  }

  const monthlyCounts = countTournamentsByMonth(tournament)
  console.log("chart", monthlyCounts)

  const [value, setValue] = useState<EventProps>(null)
  return (
    <LineChart
      className="mt-4 h-72"
      data={monthlyCounts}
      index="date"
      categories={["Crowdfunded", "Prepaid", "Blitzkrieg"]}
      colors={["red", "blue", "green"]}
      yAxisWidth={30}
      onValueChange={(v) => setValue(v)}
      connectNulls={true}
    />
  )
}

export default AdminChart
