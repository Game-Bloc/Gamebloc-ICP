import { Avatar } from "antd"
import React from "react"

const ChatCard2 = () => {
  const list = "Deonorla"
  return (
    <div className="flex justify-end items-center mb-6">
      <div className=" bg-primary-second/20 rounded-xl p-3 w-fit  max-w-[27rem]">
        <div className="flex items-center  mb-3">
          <p className="text-sm text-gray font-bold">Deonorla</p>{" "}
          <p className="text-[.65rem] ml-2 mr-2 text-gray/80">12:00 pm</p>
        </div>
        <p className="text-gray">Hi</p>
      </div>
      <div className="ml-2">
        <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
          {list.substring(0, 2).toUpperCase()}
        </Avatar>
      </div>
    </div>
  )
}

export default ChatCard2
