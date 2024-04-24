import React from "react"
import { Avatar, ConfigProvider, Tooltip, theme } from "antd"
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons"

interface Props {
  data: any
}

const SquadList = ({ data }: Props) => {
  return (
    <>
      <div className="flex flex-col ">
        <div className="w-full border border-primary-second border-solid my-3" />
        <div className="flex gap-4 items-center">
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
              {data.substring(0, 2).toUpperCase()}
            </Avatar>
          </ConfigProvider>
          <h2 className="text-white text-sm mb-2">{data}</h2>
        </div>
      </div>
    </>
  )
}

export default SquadList
