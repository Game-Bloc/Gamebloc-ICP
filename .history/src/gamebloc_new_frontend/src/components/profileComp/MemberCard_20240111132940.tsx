import { Avatar, ConfigProvider, theme } from "antd"
import React from "react"

const MemberCard = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center">
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <Avatar style={{ backgroundColor: "#f56a00" }}>TR</Avatar>
        </ConfigProvider>
        <p className="text-white text-[.8rem] ml-2">Torvenda Richie</p>
      </div>

      <p className="text-white">Squad Captain</p>
    </div>
  )
}

export default MemberCard
