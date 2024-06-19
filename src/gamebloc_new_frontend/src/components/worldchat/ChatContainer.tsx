import React, { useEffect, useRef, useState } from "react"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { useAppSelector } from "../../redux/hooks"
import ChatCard1 from "../tournament/ChatCard1"
import { IoSend } from "react-icons/io5"
import ChatCard2 from "../tournament/ChatCard2"
import { useAuth } from "../../Auth/use-auth-client"
import LoginModal2 from "../Modals/LoginModal2"
import WelcomeModal from "../Modals/WelcomeModal"
import { InfinitySpin } from "react-loader-spinner"
import {
  AppMessage,
  GroupChatMessage,
} from "../../../../declarations/kitchen/kitchen.did"
import { ulid } from "ulid"

const ChatContainer = () => {
  const { ws, principal } = useAuth()
  const [wsIsConnecting, setWsIsConnecting] = useState(true)
  const [wsIsConnected, setWsIsConnected] = useState(false)
  const [time, setTime] = useState<string>("")
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const [accountModal, setAccountModal] = useState<boolean>(false)
  const chats = useAppSelector((state) => state.chat)
  const [messages, setMessages] = useState<any[]>(chats)
  const { sendChatMessage, getChatmessage, updateChatmessage } =
    useGameblocHooks()
  const chatId = useAppSelector((state) => state.userProfile.id_hash)
  const userName = useAppSelector((state) => state.userProfile.username)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState("")
  const [timer, setTimer] = useState(null)

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

  useEffect(() => {
    getChatmessage(20)
  }, [])

  useEffect(() => {
    if (userName) {
      setTime(getTimeIn12HourFormat())
      sendJoinedChatMessage()
    }
  }, [userName])

  const sendMessage = () => {
    sendChatMessage(message, time, userName, chatId)
  }

  const sendJoinedChatMessage = async () => {
    const msg: AppMessage = {
      JoinedChat: userName,
    }
    ws.send(msg)
  }

  const handleMessageChange = async (event: any) => {
    setMessage(event.target.value)
  }

  const sendGroupChatMessage = async () => {
    const chat: GroupChatMessage = {
      message: {
        id: [],
        username: userName,
        body: message,
        f_id: chatId,
        time: time,
        sender: principal,
      },
      isTyping: false,
    }
    const appMessage: AppMessage = { GroupMessage: chat }

    setMessages((prev) => [...prev, chat])
    setMessage("")
    ws.send(appMessage)
    sendMessage()
    console.log("called:", appMessage)
  }

  const handleLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }
  const handleAccModal = () => {
    setAccountModal(!accountModal)
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
      try {
        const recievedMessage = event.data

        // If the message is a GroupMessage, check if it is a typing message
        if ("GroupMessage" in recievedMessage) {
          if (recievedMessage.GroupMessage.isTyping) {
            handleIsTypingMessage(recievedMessage.GroupMessage)
          } else {
            if (recievedMessage.GroupMessage.message.username !== userName) {
              setMessages((prev) => [...prev, recievedMessage.GroupMessage])
            }
          }
        }
        // If the message is a JoinedChat message, add it to the messages
        if ("JoinedChat" in recievedMessage) {
          const chat: GroupChatMessage = {
            message: {
              id: [],
              username: recievedMessage.JoinedChat,
              body: "_joined_the_chat_",
              f_id: chatId,
              time: time,
              sender: principal,
            },
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
    if (message.message.username !== userName) {
      setIsTyping(true)
      setTypingUser(message.message.username)
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
            className={`w-fit fit bg-gray-600 px-3 py-1 rounded-md text-white transition-opacity duration-500 ease-in-out z-10 `}
          >
            <p className="text-gray text-[.7rem]">{typingUser} is typing</p>
          </div>
        )}
        {messages.map((message: any, index: any) => (
          <ChatCard2 key={index} userName={userName} message={message} />
        ))}
      </div>
      <div className=" w-full mt-2 flex justify-end items-center">
        <div className=" w-full justify-center items-center  px-4 bg-[#fff]/10 rounded-full flex">
          <textarea
            className="resize border-none w-full text-gray/80 focus:outline-none placeholder:text-[0.7rem] focus:ring-0 placeholder:text-gray/80  appearance-none text-[0.7rem] bg-[transparent]"
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
          <IoSend
            onClick={() => sendGroupChatMessage()}
            className="text-gray cursor-pointer mr-0 my-0 ml-4 text-[1.5rem]"
          />
        )}
      </div>
      {openLoginModal && <LoginModal2 modal={handleLoginModal} />}
      {accountModal && <WelcomeModal modal={handleAccModal} />}
    </div>
  )
}

export default ChatContainer
