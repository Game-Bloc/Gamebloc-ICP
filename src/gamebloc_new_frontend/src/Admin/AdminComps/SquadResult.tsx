import { ConfigProvider, Tabs, TabsProps } from "antd"
import React from "react"

type prop = {
  tourData: any
}
const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Squads Result`,
    children: "squads",
  },
  {
    key: "2",
    label: `Players Result`,
    children: "players",
  },
]
const SquadResult = ({ tourData }: prop) => {
  return (
    <div className="mt-4">
      <ConfigProvider
        theme={{
          token: {
            colorPrimaryActive: "#F6B8FC",
            colorPrimary: "#F6B8FC",
            colorPrimaryHover: "#F6B8FC",
            colorText: "#fff",
            colorBgContainer: "#000",
          },
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </ConfigProvider>
    </div>
  )
}

export default SquadResult
