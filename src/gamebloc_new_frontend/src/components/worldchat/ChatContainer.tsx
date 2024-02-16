import React, { useEffect, useRef, useState } from "react"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { useAppSelector } from "../../redux/hooks"
import ChatCard1 from "../tournament/ChatCard1"
import { IoSend } from "react-icons/io5"
import ChatCard2 from "../tournament/ChatCard2"

const ChatContainer = () => {
  // const id = data.id_hash
  const scrollContainerRef = useRef(null)
  const [time, setTime] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  // const [chatId, setChatId] = useState<string>("")
  const { sendChatMessage, getChatmessage, updateChatmessage } =
    useGameblocHooks()
  const chatId = useAppSelector((state) => state.userProfile.id_hash)
  const username = useAppSelector((state) => state.userProfile.username)
  const chats = useAppSelector((state) => state.chat)

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
  console.log("chats", chats)
  const onMessageChange = (e: any) => {
    e.preventDefault()
    const input = e.target.value
    setMessage(input)
  }

  useEffect(() => {
    setInterval(() => {
      getChatmessage(20)
      setTime(getTimeIn12HourFormat())
    }, 2000)
  }, [])

  const sendMessage = () => {
    sendChatMessage(message, time, username, chatId)
  }

  return (
    <div className="flex flex-col h-[75vh]">
      <div
        // ref={scrollContainerRef}
        className="flex w-full h-full max-h-full p-2 flex-col border border-white/10 border-solid rounded-lg overflow-x-hidden overflow-y-scroll"
      >
        {chats.map((message: any, index: any) => (
          <ChatCard2 key={index} message={message} />
        ))}
      </div>
      <div className=" w-full mt-2 flex justify-end items-center">
        <div className=" w-full justify-center items-center py-2 px-4 bg-[#fff]/10 rounded-full flex">
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
            onClick={() => {
              sendMessage()
              setMessage("")
            }}
            className="text-gray mr-0 my-0 ml-4 text-[1.5rem]"
          />
        )}
      </div>
    </div>
  )
}

export default ChatContainer
