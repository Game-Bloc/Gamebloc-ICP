import React, { useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import NotiModal from "../Modals/NotiModal"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { Principal } from "@dfinity/principal"

const AllNoti = () => {
  const { getMyNotifications } = useGameblocHooks()
  const principalText = useAppSelector(
    (state) => state.userProfile.principal_id,
  )
  const principal = Principal.fromText(principalText)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const notifi = useAppSelector((state) => state.notification)

  const handleModal = () => {
    getMyNotifications(principal)
    setOpenModal(!openModal)
  }
  if (notifi.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center h-[70vh]">
        <img
          src={`no-notification.png`}
          className="m-0"
          alt="no-notification"
        />
        <p className=" text-white/50 mt-3 text-center">
          No notifications at the moment
        </p>
      </div>
    )
  } else {
    return (
      <div className="overflow-x-hidden overflow-y-scroll h-screen max-h-screen pb-[20vh] lg:pb-[30vh]">
        {notifi.map((noti: any) => (
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
                <p className="ml-4 text-white/50">
                  {noti.body.substring(0, 20) + "..."}
                </p>
                <p
                  onClick={() => setOpenModal(!openModal)}
                  className="text-primary-second rounded-md pt-1 pb-[.15rem]  px-[.6rem]  sm:px-4   border border-solid sm:py-2  border-primary-second hover:text-black hover:bg-primary-second  text-[0.85rem] sm:text-sm cursor-pointer"
                >
                  View
                </p>
              </div>
            </div>
            <p className="text-white/25 mt-2 ml-6"> {noti.date}</p>
            {openModal && <NotiModal modal={handleModal} data={noti} />}
          </div>
        ))}
      </div>
    )
  }
}

export default AllNoti
