import React from "react"
import { Avatar, Tooltip } from "antd"
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons"

const Players = () => {
  return (
    <div className="">
      <div className="flex flex-col mx-4">
        <div className="flex ">
          <h2 className="text-white text-sm ">PeakyFBlinders [pFb]</h2>
          <Avatar.Group
            maxCount={2}
            maxPopoverTrigger="click"
            size="large"
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
        </div>
      </div>
    </div>
  )
}

export default Players
