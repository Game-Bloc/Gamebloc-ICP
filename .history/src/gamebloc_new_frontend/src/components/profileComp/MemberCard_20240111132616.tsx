import { Avatar, ConfigProvider, theme } from "antd"
import React from "react"

const MemberCard = () => {
  return (
    <div className="flex justify-between items-center">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Avatar style={{ backgroundColor: "#f56a00" }}>TR</Avatar>
      </ConfigProvider>
    </div>
  )
}

export default MemberCard
