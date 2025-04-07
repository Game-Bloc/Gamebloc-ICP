import React from "react"
import { Avatar, ConfigProvider, Tooltip, theme } from "antd"
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons"

interface Props {
  data: any
  list: any
}

const SquadList = ({ data, list }: Props) => {
  return (
    <>
      {data.game_type.toUpperCase() === "SINGLE" ||
      data.game_type.toUpperCase() === "TEAMVTEAM" ? (
        <div className="flex flex-col mb-4">
          {/* <div className="w-full border border-primary-second border-solid my-3" /> */}
          <div className="flex gap-4 items-center">
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
              }}
            >
              <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
                {list.substring(0, 2).toUpperCase()}
              </Avatar>
            </ConfigProvider>
            <h2 className="text-white text-sm ">{list}</h2>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col ">
            <div className="w-full border border-primary-second border-solid my-3" />
            <h2 className="text-white text-sm mb-2">
              {list.name} [{list.tag}]
            </h2>

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
                {list.members.map((value: any) => (
                  <Tooltip
                    key={value.principal_id}
                    title={value.name}
                    placement="top"
                  >
                    <Avatar
                      style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                    >
                      {value.name.substring(0, 2).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ConfigProvider>
          </div>
        </>
      )}
    </>
  )
}

export default SquadList
