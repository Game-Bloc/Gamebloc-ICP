import React from "react"
import { ConfigProvider, Tabs } from "antd"
import type { TabsProps } from "antd"
import OngoingTable from "./OngoingTable"

const AdminTabBar = () => {
  const onChange = (key: string) => {}
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `New Tournaments`,
      children: <OngoingTable />,
    },
    {
      key: "2",
      label: `Ongoing Tournaments`,
      children: <div className="text-white">New</div>,
    },
    {
      key: "3",
      label: `Completed Tournaments`,
      children: <div className="text-white">Pending</div>,
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
