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

      // Initialize the count for this month if not already initialized
      if (!monthCounts[month]) {
        monthCounts[month] = {
          Crowdfunded: 0,
          Prepaid: 0,
        }
      }

      // Check the tournament type and increment the respective count
      if (tour.tournament_type.Crowdfunded === null) {
        monthCounts[month].Crowdfunded++
      } else if (tour.tournament_type.Prepaid == null) {
        monthCounts[month].Prepaid++
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
      }
    })

    return result
  }

  const monthlyCounts = countTournamentsByMonth(tournament)

  const [value, setValue] = useState<EventProps>(null)
  return (
    <LineChart
      className="mt-4 h-72"
      data={monthlyCounts}
      index="date"
      categories={["Crowdfunded", "Prepaid"]}
      colors={["red", "blue"]}
      yAxisWidth={30}
      onValueChange={(v) => setValue(v)}
      connectNulls={true}
    />
  )
}

export default AdminChart
