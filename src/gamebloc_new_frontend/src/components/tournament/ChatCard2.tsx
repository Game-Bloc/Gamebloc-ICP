import { Avatar } from "antd"
import React from "react"
import { useAppSelector } from "../../redux/hooks"

interface Props {
  message: any
  userName: string
}

const ChatCard2 = ({ message, userName }: Props) => {
  const userId = useAppSelector((state) => state.userProfile.id_hash)
  const username = useAppSelector((state) => state.userProfile.username)
  const role = useAppSelector((state) => state.userProfile.role)
  const _role = Object.keys(role[0])[0].toUpperCase()
  const mod = "ESTYLOBAM"
  // const mod = "DEONORLA"

  return (
    <div
      className={`${
        userName === message.message.username ? `justify-end` : ``
      } flex items-end  ${
        message.message.body === "_joined_the_chat_" ? "justify-center" : ""
      } `}
    >
      <div
        className={`${
          userName === message.message.name ? `items-end` : `items-start`
        } flex flex-col space-y-2 max-w-xs mx-2 order-2 `}
      >
        {message.message.body === "_joined_the_chat_" ? (
          <h1 className="text-white text-[.8rem] mb-2">
            {message.message.username === userName
              ? "You"
              : `${message.message.username}`}{" "}
            joined chat
          </h1>
        ) : (
          <div
            className={`flex gap-3 mb-3 ${
              message.message.username === userName ? "" : "flex-row-reverse"
            } `}
          >
            <div
              className={` ${
                username.toUpperCase() === mod
                  ? `bg-green-600/50`
                  : `bg-primary-second/20`
              }  rounded-xl p-3 min-w-[6rem]  max-w-[27rem]`}
            >
              <div className="flex items-center ">
                <p
                  className={`${
                    message.message.username === userName
                      ? `text-end`
                      : `text-start`
                  } text-[.7rem] text-gray font-bold`}
                >
                  {message.message.username === userName
                    ? "You"
                    : `${message.message.username}`}
                </p>{" "}
                <p className="text-[.65rem] ml-2 mr-2 text-gray/80">
                  {message.message.time}
                </p>
              </div>
              <span className={` text-gray text-[.7rem]`}>
                {message.message.body}
              </span>
            </div>
            <div className="ml-[.1rem]">
              <Avatar
                size={"small"}
                style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              >
                {message.message.username.substring(0, 2).toUpperCase()}
              </Avatar>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatCard2
