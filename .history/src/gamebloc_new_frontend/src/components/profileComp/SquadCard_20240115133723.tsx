import { AntDesignOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, ConfigProvider, Tooltip, theme } from "antd"
import React from "react"

interface Props {
  view: () => void
  data: any
}

const SquadCard = ({ view, data }: Props) => {
  return (
    <div
      onClick={view}
      className="bg-[#030C15] w-full cursor-pointer rounded-md p-4 flex justify-between items-center"
    >
      <div className="flex items-center">
        <img src={`frame.svg`} alt="" />
        <div className="flex flex-col ml-4">
          <h2 className="text-white font-bold text-[.9rem] sm:text-[1.2rem]">
            {data.name}
          </h2>
          <p className="text-white text-[.8rem]">
            Clan Tag - {data.tag}
            <span className="text-[#E0DFBA]  text-[.8rem]"> pFbサ</span>
          </p>
        </div>
      </div>
      <div>
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
  )
}

export default SquadCard
