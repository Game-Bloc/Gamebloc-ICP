import React from "react"
import { Avatar, ConfigProvider, Tooltip, theme } from "antd"
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons"

const Players = () => {
  return (
    <div className="">
      <div className="flex flex-col mx-4">
        <div className="flex flex-col ">
          <div className="w-full border border-primary-second border-solid my-3" />
          <h2 className="text-white text-sm mb-2">PeakyFBlinders [pFb]</h2>
          <ConfigProvider
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
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default Players
