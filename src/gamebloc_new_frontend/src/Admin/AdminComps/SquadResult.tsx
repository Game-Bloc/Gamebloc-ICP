import { ConfigProvider, Tabs, TabsProps } from "antd"
import React from "react"
import Result_1 from "./Result_1"
import Result_2 from "./Result_2"

type prop = {
  tourData: any
  solo_mode: any
  squad_mode: any
}

const SquadResult = ({ tourData, squad_mode, solo_mode }: prop) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Squads Result`,
      children: <Result_1 tourData={tourData} squad_mode={squad_mode} />,
    },
    {
      key: "2",
      label: `Players Result`,
      children: <Result_2 tourData={tourData} solo_mode={solo_mode} />,
    },
  ]
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
