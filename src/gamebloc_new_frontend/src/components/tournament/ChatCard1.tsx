import { Avatar } from "antd"
import React from "react"
import { useAppSelector } from "../../redux/hooks"

interface Props {
  message: any
  tourData: any
}

const ChatCard1 = ({ message, tourData }: Props) => {
  const userId = useAppSelector((state) => state.userProfile.id_hash)
  const username = useAppSelector((state) => state.userProfile.username)
  const role = useAppSelector((state) => state.userProfile.role)
  const _role = Object.keys(role[0])[0].toUpperCase()
  const mod = "ESTYLOBAM"

  return (
    <>
      {message.map((data: any, index: any) =>
        data.name == username && data.id == userId ? (
          <div key={index} className="flex justify-end items-center mb-6">
            <div
              className={`${
                username.toUpperCase() === mod
                  ? `bg-green-600/50`
                  : `bg-primary-second/20`
              }  rounded-xl p-3 w-fit  max-w-[27rem]`}
            >
              <div className="flex items-center  mb-3">
                <p className="text-sm text-gray font-bold">{data.name}</p>{" "}
                <p className="text-[.65rem] ml-2 mr-2 text-gray/80">
                  {data.time}
                </p>
              </div>
              <div className="max-w-[27rem]">
                <p className="flex flex-wrap break-words break-all whitespace-pre-wrap text-gray ">
                  {data.message}
                </p>
              </div>
            </div>
            <div className="ml-2">
              <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
                {data.name.substring(0, 2).toUpperCase()}
              </Avatar>
            </div>
          </div>
        ) : (
          <div key={index} className="flex items-center mb-6">
            <Avatar
              style={{
                backgroundColor: "#fde3cf",
                color: "#f56a00",
              }}
            >
              {data.name.substring(0, 2).toUpperCase()}
            </Avatar>
            <div
              className={`ml-2 ${
                data.name.toUpperCase() === mod
                  ? `bg-green-600/50`
                  : `bg-white/10`
              }   rounded-xl p-3 w-fit  max-w-[27rem]`}
            >
              <div className="flex items-center  mb-3">
                <p className="text-sm text-gray font-bold">{data.name}</p>{" "}
                <p className="text-[.65rem] ml-2 mr-2 text-gray/80">
                  {data.time}
                </p>
              </div>
              <div className="max-w-[27rem]">
                <p className="flex flex-wrap text-gray break-words break-all whitespace-pre-wrap">
                  {data.message}
                </p>
              </div>
            </div>
          </div>
        ),
      )}
    </>
  )
}

export default ChatCard1
