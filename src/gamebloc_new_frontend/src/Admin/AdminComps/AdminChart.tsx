import React, { useState } from "react"
import { LineChart, EventProps } from "@tremor/react"

const AdminChart = () => {
  const chartdata = [
    {
      date: "Jan 23",
      Crowdfunded: 45,
      Prepaid: 78,
    },
    {
      date: "Feb 23",
      Crowdfunded: 52,
      Prepaid: 71,
    },
    {
      date: "Mar 23",
      Crowdfunded: 48,
      Prepaid: 80,
    },
    {
      date: "Apr 23",
      Crowdfunded: 61,
      Prepaid: 65,
    },
    {
      date: "May 23",
      Crowdfunded: 55,
      Prepaid: 58,
    },
    {
      date: "Jun 23",
      Crowdfunded: 67,
      Prepaid: 62,
    },
    {
      date: "Jul 23",
      Crowdfunded: 60,
      Prepaid: 54,
    },
    {
      date: "Aug 23",
      Crowdfunded: 72,
      Prepaid: 49,
    },
    {
      date: "Sep 23",
      Crowdfunded: 65,
      Prepaid: 52,
    },
    {
      date: "Oct 23",
      Crowdfunded: 68,
      Prepaid: null,
    },
    {
      date: "Nov 23",
      Crowdfunded: 74,
      Prepaid: null,
    },
    {
      date: "Dec 23",
      Crowdfunded: 71,
      Prepaid: null,
    },
  ]

  const [value, setValue] = useState<EventProps>(null)
  return (
    <LineChart
      className="mt-4 h-72"
      data={chartdata}
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
