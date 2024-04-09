import React, { useEffect, useRef, useState } from "react"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { useAppSelector } from "../../redux/hooks"
import ChatCard1 from "../tournament/ChatCard1"
import { IoSend } from "react-icons/io5"
import ChatCard2 from "../tournament/ChatCard2"
import { useAuth } from "../../Auth/use-auth-client"
import { InfinitySpin } from "react-loader-spinner"
import {
  AppMessage,
  GroupChatMessage,
} from "../../../../declarations/kitchen/kitchen.did"

const ChatContainer = () => {
  // const scrollContainerRef = useRef(null)
  // const [time, setTime] = useState<string>("")
  // // const [message, setMessage] = useState<string>("")
  // // const [chatId, setChatId] = useState<string>("")
  // const { sendChatMessage, getChatmessage, updateChatmessage } =
  //   useGameblocHooks()
  // const chatId = useAppSelector((state) => state.userProfile.id_hash)
  // const username = useAppSelector((state) => state.userProfile.username)
  // const chats = useAppSelector((state) => state.chat)

  // const getTimeIn12HourFormat = () => {
  //   const date = new Date()
  //   let hours = date.getHours()
  //   const minutes = date.getMinutes()
  //   const ampm = hours >= 12 ? "pm" : "am"

  //   hours %= 12
  //   hours = hours || 12 // Handle midnight (0 hours)

  //   const formattedTime = `${hours}:${
  //     minutes < 10 ? "0" : ""
  //   }${minutes} ${ampm}`
  //   return formattedTime
  // }
  // // console.log("chats", chats)
  // const onMessageChange = (e: any) => {
  //   e.preventDefault()
  //   const input = e.target.value
  //   setMessage(input)
  // }

  // useEffect(() => {
  //   setInterval(() => {
  //     getChatmessage(20)
  //     setTime(getTimeIn12HourFormat())
  //   }, 2000)
  // }, [])

  // const sendMessage = () => {
  //   sendChatMessage(message, time, username, chatId)
  // }

  // const handleKeyPress = (e: any) => {
  //   if (e.key === "Enter") {
  //     sendMessage()
  //   }
  // }

  const { ws } = useAuth()
  const [wsIsConnecting, setWsIsConnecting] = useState(true)
  const [wsIsConnected, setWsIsConnected] = useState(false)

  const [messages, setMessages] = useState<GroupChatMessage[]>([])
  const [userVal, setUserVal] = useState("")
  //  const [userName, setUserName] = useState("")
  const userName = useAppSelector((state) => state.userProfile.username)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState("")
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (userName) {
      sendJoinedChatMessage()
    }
  }, [userName])

  const sendJoinedChatMessage = async () => {
    const msg: AppMessage = {
      JoinedChat: userName,
    }
    ws.send(msg)
  }

  const sendTypingMessage = async (appMessage: AppMessage) => {
    if (!timer) {
      setTimer(
        setTimeout(() => {
          setTimer(null)
        }, 3000),
      )
      ws.send(appMessage)
    }
  }

  const handleMessageChange = async (event) => {
    setMessage(event.target.value)
    const msg: GroupChatMessage = {
      name: userName,
      message: event.target.value,
      isTyping: true,
    }
    const appMessage: AppMessage = { GroupMessage: msg }
    sendTypingMessage(appMessage)
  }

  const sendGroupChatMessage = async (event) => {
    event.preventDefault()

    const chat: GroupChatMessage = {
      name: userName,
      message: message,
      isTyping: false,
    }
    const appMessage: AppMessage = { GroupMessage: chat }

    setMessages((prev) => [...prev, chat])
    setMessage("")
    ws.send(appMessage)
  }

  useEffect(() => {
    if (!ws) {
      return
    }

    ws.onopen = () => {
      console.log("Connected to the canister")
      setWsIsConnected(true)
      setWsIsConnecting(false)
    }

    ws.onclose = () => {
      console.log("Disconnected from the canister")
      setWsIsConnected(false)
    }

    ws.onerror = (error) => {
      try {
      } catch (err) {
        console.log("Error:", error)
      }
    }

    ws.onmessage = async (event) => {
      // await handleWebSocketMessage(event)
      try {
        const recievedMessage = event.data

        // If the message is a GroupMessage, check if it is a typing message
        if ("GroupMessage" in recievedMessage) {
          if (recievedMessage.GroupMessage.isTyping) {
            handleIsTypingMessage(recievedMessage.GroupMessage)
          } else {
            if (recievedMessage.GroupMessage.name !== userName) {
              setMessages((prev) => [...prev, recievedMessage.GroupMessage])
            }
          }
        }
        // If the message is a JoinedChat message, add it to the messages
        if ("JoinedChat" in recievedMessage) {
          const chat: GroupChatMessage = {
            name: recievedMessage.JoinedChat,
            message: "_joined_the_chat_",
            isTyping: false,
          }
          setMessages((prev) => [...prev, chat])
        }
      } catch (error) {
        console.log("Error deserializing message", error)
      }
    }
  }, [ws, userName])

  const handleIsTypingMessage = (message: GroupChatMessage) => {
    if (message.name !== userName) {
      setIsTyping(true)
      setTypingUser(message.name)
      setTimeout(() => {
        setIsTyping(false)
      }, 3000)
    }
  }

  return (
    <div className="flex flex-col h-[75vh]">
      <div
        // ref={scrollContainerRef}
        className="flex w-full h-full max-h-full p-2 flex-col border border-white/10 border-solid rounded-lg overflow-x-hidden overflow-y-scroll"
      >
        {isTyping && (
          <div
            className={`w-fit fit bg-gray-600 px-3 py-1 rounded-md text-white transition-opacity duration-500 ease-in-out z-10 fixed top-4`}
          >
            <h3 className="">{typingUser} is typing</h3>
          </div>
        )}
        {messages.map((message: any, index: any) => (
          <ChatCard2 key={index} userName={userName} message={message} />
        ))}
      </div>
      <div className=" w-full mt-2 flex justify-end items-center">
        {/* <form
          className=" flex-row flex  w-full items-center"
          onSubmit={sendGroupChatMessage}
        > */}
        <div className=" w-full justify-center items-center py-2 px-4 bg-[#fff]/10 rounded-full flex">
          <textarea
            className="r border-none w-full text-gray/80 focus:outline-none placeholder:text-[0.7rem] focus:ring-0 placeholder:text-gray/80  appearance-none text-[0.7rem] bg-[transparent]"
            placeholder="Leave a comment"
            rows={1}
            value={message}
            onChange={handleMessageChange}
            // onKeyDown={handleKeyPress}
          />
        </div>
        {message === "" ? (
          <></>
        ) : (
          // <button type="submit">
          <IoSend
            // type="submit"
            onClick={sendGroupChatMessage}
            className="text-gray mr-0 my-0 ml-4 text-[1.5rem]"
          />
        )}
        {/* </form> */}
      </div>
    </div>
  )
}

export default ChatContainer
