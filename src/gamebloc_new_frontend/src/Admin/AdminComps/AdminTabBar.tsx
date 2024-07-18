import React from "react"
import { ConfigProvider, Tabs } from "antd"
import type { TabsProps } from "antd"
import NewTournamentTable from "./NewTournamentTable"
import OngoingTournamentTable from "./OngoingTournamentTable"
import CompletedTournamentTable from "./CompletedTournamentTable"

const AdminTabBar = () => {
  const onChange = (key: string) => {}
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `New Tournaments`,
      children: <NewTournamentTable />,
    },
    {
      key: "2",
      label: `Ongoing Tournaments`,
      children: <OngoingTournamentTable />,
    },
    {
      key: "3",
      label: `Completed Tournaments`,
      children: <CompletedTournamentTable />,
    },
  ]
  return (
    <div className="">
      <ConfigProvider
        theme={{
          token: {
            colorPrimaryActive: "#F6B8FC",
            colorPrimary: "#F6B8FC",
            colorPrimaryHover: "#F6B8FC",
            colorText: "#fff",
          },
        }}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </ConfigProvider>
    </div>
  )
}

export default AdminTabBar
