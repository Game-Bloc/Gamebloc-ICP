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
import { AppMessage } from "../../../../declarations/game_bloc_backend/game_bloc_backend.did"

interface Props {
  data: any
}

const Chat = ({ data }: Props) => {
  const id = data.id_hash
  const scrollContainerRef = useRef(null)
  const { ws } = useAuth()
  const [time, setTime] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  // const [chatId, setChatId] = useState<string>("")
  const { sendTournamentMessage } = useGameblocHooks()
  const { updateMessages } = useGetTournamentMessages()
  const chatId = useAppSelector((state) => state.userProfile.id_hash)
  const username = useAppSelector((state) => state.userProfile.username)

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
    if (!ws) {
      return
    }

    ws.onopen = () => {
      console.log("WebSocket connection established.")
      // You can perform any additional actions here after the WebSocket connection is open
      console.log("ws working")
    }

    ws.onclose = () => {
      console.log("WebSocket connection closed.")
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    // Clean up function to close the WebSocket connection when component unmounts
    return () => {
      ws.close()
    }
  }, [ws])

  const sendMessage = () => {
    // sendTournamentMessage(id, chatId, username, time, message)
    const msg: AppMessage = {
      text: message,
    }
    console.log(msg)
    ws.send(msg)
  }

  return (
    <div>
      <div
        ref={scrollContainerRef}
        className="flex  flex-col h-[27rem] max-h-[50rem] overflow-x-hidden overflow-y-scroll"
      >
        {data.messages.map((message: any, index: any) => (
          <ChatCard1 key={index} tourData={data} message={message} />
        ))}

        {/* <ChatCard2 /> */}
      </div>
      <div className="w-full mt-2 flex justify-center items-center">
        <div className=" w-full justify-center items-center p-4 bg-[#fff]/10 rounded-full flex">
          <textarea
            className="r border-none w-full text-gray/80 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-gray/80  appearance-none text-[0.9rem] bg-[transparent]"
            placeholder="Message"
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

export default Chat
