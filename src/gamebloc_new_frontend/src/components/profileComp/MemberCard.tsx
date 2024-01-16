import { Avatar, ConfigProvider, theme } from "antd"
import React from "react"

interface Props {
  gamer: any
  captain: string
}

const MemberCard = ({ gamer, captain }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center">
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <Avatar style={{ backgroundColor: "#f56a00" }}>
            {gamer.name.substring(0, 2).toUpperCase()}
          </Avatar>
        </ConfigProvider>
        <p className="text-white text-[.8rem] ml-2">{gamer.name}</p>
      </div>
      {gamer.name == captain ? (
        <p className="text-white text-[.6rem]">Squad Captain</p>
      ) : (
        <div> </div>
      )}
    </div>
  )
}

export default MemberCard
