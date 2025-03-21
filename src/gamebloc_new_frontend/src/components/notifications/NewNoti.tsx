import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import NotiModal from "../Modals/NotiModal"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { Principal } from "@dfinity/principal"

const NewNoti = () => {
  const { markAsRead, getMyNotifications } = useGameblocHooks()
  const principalText = useAppSelector(
    (state) => state.userProfile.principal_id,
  )
  const principal = Principal.fromText(principalText)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const notifi = useAppSelector((state) => state.notification)
  const [selectedNoti, setSelectedNoti] = useState<any>(null)

  const unreadmessages = [...notifi]
    .sort((a, b) => b.id - a.id)
    .filter((list: any) => list.read === false)
    .map((data: any) => data)

  useEffect(() => {
    getMyNotifications(principal)
  }, [])

  const handleModal = (noti: any) => {
    setSelectedNoti(noti)
    setOpenModal(!openModal)
  }

  const mark_as_read = (principal: Principal, id: bigint) => {
    markAsRead(principal, id)
  }

  if (unreadmessages.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center h-[70vh]">
        <img
          src={`no-notification.png`}
          className="m-0"
          alt="no-notification"
        />
        <p className=" text-white/50 mt-3 text-center">
          No unread notification at the moment
        </p>
      </div>
    )
  } else {
    return (
      <div className="overflow-x-hidden overflow-y-scroll h-screen max-h-screen pb-[20vh] lg:pb-[30vh]">
        {unreadmessages.map((noti: any) => (
          <div key={noti.id} className="flex flex-col mt-2">
            <div className="flex items-center">
              <div
                style={{
                  position: "relative",
                  top: 0,
                  right: 0,
                  width: "10px",
                  height: "10px",
                  backgroundColor: noti.read === false ? `red` : "#40454A",
                  borderRadius: "50%",
                }}
              />

              <div className="flex justify-between items-center w-full">
                <p className="ml-4 text-white/50 font-bold">
                  {" "}
                  {noti?.body.length > 25
                    ? noti?.body.substring(0, 25) + "....."
                    : noti?.body}
                </p>
                <p
                  onClick={() => {
                    mark_as_read(principal, noti.id)
                    handleModal(noti)
                  }}
                  className="mt-6 text-primary-second rounded-md pt-1 pb-[.15rem]  px-[.6rem]  sm:px-4   border border-solid sm:py-2  border-primary-second hover:text-black hover:bg-primary-second  text-[0.85rem] sm:text-sm cursor-pointer"
                >
                  View
                </p>
              </div>
            </div>
            <p className="text-white/25 text-[.7rem] -mt-[0.5rem] ml-6">
              {" "}
              {noti.date}
            </p>
            {openModal && selectedNoti && (
              <NotiModal
                principal={principal}
                modal={() => setOpenModal(false)}
                data={selectedNoti}
              />
            )}
          </div>
        ))}
      </div>
    )
  }
}
export default NewNoti
