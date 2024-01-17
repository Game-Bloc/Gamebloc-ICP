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
        <h2 className="text-white text-sm mb-2">
          {data.name} [{data.tag}]
        </h2>
        {data.members.map((list: any) => (
          <ConfigProvider
            key={list.principal_id}
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <Avatar.Group
              maxCount={3}
              maxPopoverTrigger="click"
              size="small"
              maxStyle={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                cursor: "pointer",
              }}
            >
              <Tooltip title={list.name} placement="top">
                <Avatar
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                >
                  {list.name.substring(0, 2).toUpperCase()}
                </Avatar>
              </Tooltip>
            </Avatar.Group>
          </ConfigProvider>
        ))}
      </div>
    </>
  )
}

export default SquadList
