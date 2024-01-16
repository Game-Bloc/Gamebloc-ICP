import { AntDesignOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, ConfigProvider, Tooltip, theme } from "antd"
import React from "react"
import ViewSquadModal from "./ViewSquadModal"

interface Props {
  view: () => void
  data: any
  viewModal: any
  handleViewSquad: () => void
}

const SquadCard = ({ view, data, viewModal, handleViewSquad }: Props) => {
  return (
    <>
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
              Clan Tag -
              <span className="text-[#E0DFBA]  text-[.8rem]"> {data.tag}</span>
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
              size="default"
              maxStyle={{
                color: "#D1FADF",
                backgroundColor: "#039855",
                cursor: "pointer",
              }}
            >
              {data.members.map((gamer: any, index: any) => (
                <Tooltip key={index} title={gamer} placement="top">
                  <Avatar
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    {gamer.substring(0, 2).toUpperCase()}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </ConfigProvider>
        </div>
      </div>
      {viewModal && <ViewSquadModal data={data} modal={handleViewSquad} />}
    </>
  )
}

export default SquadCard
