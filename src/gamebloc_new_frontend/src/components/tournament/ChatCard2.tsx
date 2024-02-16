import { Avatar } from "antd"
import React from "react"
import { useAppSelector } from "../../redux/hooks"

interface Props {
  message: any
}

const ChatCard2 = ({ message }: Props) => {
  const userId = useAppSelector((state) => state.userProfile.id_hash)
  const username = useAppSelector((state) => state.userProfile.username)

  console.log("body:", message.body)

  return (
    <>
      {message.username == username && message.f_id == userId ? (
        <div className="flex justify-end items-center mb-6">
          <div className=" bg-primary-second/20 rounded-xl p-3 w-fit  max-w-[27rem]">
            <div className="flex items-center  mb-3">
              <p className="text-[.7rem] text-gray font-bold">
                {message.username}
              </p>{" "}
              <p className="text-[.65rem] ml-2 mr-2 text-gray/80">
                {message.time}
              </p>
            </div>
            <p className="text-gray text-[.7rem]">{message.body}</p>
          </div>
          <div className="ml-2">
            <Avatar
              size={"small"}
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            >
              {message.username.substring(0, 2).toUpperCase()}
            </Avatar>
          </div>
        </div>
      ) : (
        <div className="flex items-center mb-6">
          <Avatar
            size={"small"}
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
            }}
          >
            {message.username.substring(0, 2).toUpperCase()}
          </Avatar>
          <div className="ml-2 bg-white/10 rounded-xl p-3 w-fit  max-w-[27rem]">
            <div className="flex items-center  mb-3">
              <p className="text-[.7rem] text-gray font-bold">
                {message.username}
              </p>{" "}
              <p className="text-[.65rem] ml-2 mr-2 text-gray/80">
                {message.time}
              </p>
            </div>
            <p className="text-gray text-[.7rem]">{message.body}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatCard2
