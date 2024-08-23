import { Avatar } from "antd"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { IoSend } from "react-icons/io5"
import { ulid } from "ulid"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { useGetTournamentMessages } from "../../Functions/blochooks"
import { useAppSelector } from "../../redux/hooks"
import ChatCard1 from "./ChatCard1"
import ChatCard2 from "./ChatCard2"
import ClipLoader from "react-spinners/ClipLoader"
import { useAuth } from "../../Auth/use-auth-client"
import LoginModal2 from "../Modals/LoginModal2"

interface Props {
  data: any
}

const Chat = ({ data }: Props) => {
  const id = data.id_hash
  const { isAuthenticated } = useAuth()
  const scrollContainerRef = useRef(null)
  const [time, setTime] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const { sendTournamentMessage } = useGameblocHooks()
  const { updateMessages } = useGetTournamentMessages()
  const isMod = useAppSelector((state) => state.userProfile.role)
  const chatId = useAppSelector((state) => state.userProfile.id_hash)
  const username = useAppSelector((state) => state.userProfile.username)
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)

  // const generateULID = () => {
  //   const date = new Date()
  //   let day = date.getDate()
  //   const id = ulid(day)
  //   setChatId(id)
  // }

  const getTimeIn12HourFormat = () => {
    const date = new Date()
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? "pm" : "am"

    hours %= 12
    hours = hours || 12 // Handle midnight (0 hours)

    const formattedTime = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`
    return formattedTime
  }
  const handleLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }

  const onMessageChange = (e: any) => {
    e.preventDefault()
    const input = e.target.value
    setMessage(input)
  }

  //   useEffect(() => {
  //     // Scroll to the bottom of the container when new messages are added
  //     if (scrollContainerRef.current) {
  //       const scrollContainer = scrollContainerRef.current
  //       scrollContainer.scrollTop = scrollContainer.scrollHeight
  //     }
  //     setTime(getTimeIn12HourFormat())
  //   }, [data])

  useEffect(() => {
    // generateULID()
    setInterval(() => {
      setTime(getTimeIn12HourFormat())
      updateMessages()
    }, 2000)
  }, [])

  const sendMessage = () => {
    sendTournamentMessage(id, chatId, username, time, message)
  }

  return (
    <div>
      <div
        ref={scrollContainerRef}
        className="flex  flex-col h-[27rem] max-h-[50rem] overflow-x-hidden overflow-y-scroll"
      >
        {data.users.some((index: any) => index.includes(username)) ||
        data.squad.some((players: any) =>
          players.members.some((gamer: any) => gamer.name.includes(username)),
        ) ||
        Object.keys(isMod[0])[0].toUpperCase() === "MOD" ? (
          data.messages.map((message: any, index: any) => (
            <ChatCard1 key={index} tourData={data} message={message} />
          ))
        ) : (
          <div className="w-full flex justify-center items-center mt-[3rem]">
            <div className="flex flex-col mb-4 ">
              <img src={`empty.svg`} alt="" />
              <p className="text-white text-[.8rem] mt-8 text-center">
                Join this tournament to view chats.
              </p>
            </div>
          </div>
        )}

        {/* <ChatCard2 /> */}
      </div>

      {data.users.some((index: any) => index.includes(username)) ||
      data.squad.some((players: any) =>
        players.members.some((gamer: any) => gamer.name.includes(username)),
      ) ||
      Object.keys(isMod[0])[0].toUpperCase() === "MOD" ? (
        <div className="w-full mt-2 flex justify-center items-center">
          <div className=" w-full justify-center items-center  bg-[#fff]/10 rounded-full flex">
            <textarea
              className="r border-none w-full text-gray/80 focus:outline-none placeholder:text-[0.7rem] focus:ring-0 placeholder:text-gray/80  appearance-none text-[0.7rem] bg-[transparent]"
              placeholder="Leave a comment"
              rows={1}
              value={message}
              onChange={onMessageChange}
            />
          </div>
          {message === "" ? (
            <></>
          ) : (
            <IoSend
              onClick={
                isAuthenticated
                  ? () => {
                      sendMessage()
                      setMessage("")
                    }
                  : () => handleLoginModal()
              }
              className="text-gray mr-0 my-0 ml-4 text-[1.5rem]"
            />
          )}
        </div>
      ) : (
        <></>
      )}

      {openLoginModal && <LoginModal2 modal={handleLoginModal} />}
    </div>
  )
}

export default Chat
