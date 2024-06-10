import React from "react"
import { useNavigate } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io"
import { ConfigProvider, Tabs, TabsProps } from "antd"
import AllNoti from "./AllNoti"
import NewNoti from "./NewNoti"

interface Prop {
  modal: () => void
}

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `New`,
    children: <NewNoti />,
  },
  {
    key: "2",
    label: `All`,
    children: <AllNoti />,
  },
]

const MobileNoti = ({ modal }: Prop) => {
  return (
    <div className="absolute z-50 bg-primary-first top-0 left-0 w-full h-screen ">
      <div className="relative p-[2rem]">
        <div className="items-center justify-between flex w-full">
          <div
            onClick={() => modal()}
            className="flex  items-center cursor-pointer"
          >
            <IoIosArrowRoundBack className="text-primary-second" />
          </div>
          <p className="text-primary-second ml-2 text-[1rem]">Notifications</p>
        </div>

        <div className="mt-[3rem] px-[1rem] ">
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
      </div>
    </div>
  )
}

export default MobileNoti
