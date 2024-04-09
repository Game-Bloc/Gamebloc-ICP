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

  return (
    <div
      className={`${
        userName === message.name ? `justify-end` : ``
      } flex items-end  ${
        message.message === "_joined_the_chat_" ? "justify-center" : ""
      } `}
    >
      <div
        className={`${
          userName === message.name ? `items-end` : `items-start`
        } flex flex-col space-y-2 max-w-xs mx-2 order-2 `}
      >
        {message.message === "_joined_the_chat_" ? (
          <h1 className="text-white text-[.8rem] mb-2">
            {message.name === userName ? "You" : `${message.name}`} joined chat
          </h1>
        ) : (
          <div
            className={`flex gap-3 mb-3 ${
              message.name === userName ? "" : "flex-row-reverse"
            } `}
          >
            <div className="bg-primary-second/20 rounded-xl p-3 min-w-[6rem]   max-w-[27rem]">
              <div className="flex items-center ">
                <p
                  className={`${
                    message.name === userName ? `text-end` : `text-start`
                  } text-[.7rem] text-gray font-bold`}
                >
                  {message.name === userName ? "You" : `${message.name}`}
                </p>{" "}
                {/* <p className="text-[.65rem] ml-2 mr-2 text-gray/80">
                {message.time}
              </p> */}
              </div>
              <span className={` text-gray text-[.7rem]`}>
                {message.message}
              </span>
            </div>
            <div className="ml-[.1rem]">
              <Avatar
                size={"small"}
                style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              >
                {message.name.substring(0, 2).toUpperCase()}
              </Avatar>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatCard2

//  <>
//       {message.username == username && message.f_id == userId ? (
//         <div className="flex justify-end items-center mb-6">
//           <div className=" bg-primary-second/20 rounded-xl p-3 w-fit  max-w-[27rem]">
//             <div className="flex items-center  mb-3">
//               <p className="text-[.7rem] text-gray font-bold">
//                 {message.username}
//               </p>{" "}
//               <p className="text-[.65rem] ml-2 mr-2 text-gray/80">
//                 {message.time}
//               </p>
//             </div>
//             <p className="text-gray text-[.7rem]">{message.body}</p>
//           </div>
//           <div className="ml-2">
//             <Avatar
//               size={"small"}
//               style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
//             >
//               {message.username.substring(0, 2).toUpperCase()}
//             </Avatar>
//           </div>
//         </div>
//       ) : (
//         <div className="flex items-center mb-6">
//           <Avatar
//             size={"small"}
//             style={{
//               backgroundColor: "#fde3cf",
//               color: "#f56a00",
//             }}
//           >
//             {message.username.substring(0, 2).toUpperCase()}
//           </Avatar>
//           <div className="ml-2 bg-white/10 rounded-xl p-3 w-fit  max-w-[27rem]">
//             <div className="flex items-center  mb-3">
//               <p className="text-[.7rem] text-gray font-bold">
//                 {message.username}
//               </p>{" "}
//               <p className="text-[.65rem] ml-2 mr-2 text-gray/80">
//                 {message.time}
//               </p>
//             </div>
//             <p className="text-gray text-[.7rem]">{message.body}</p>
//           </div>
//         </div>
//       )}
//     </>
