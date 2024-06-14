import React, { useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import NotiModal from "../Modals/NotiModal"

const AllNoti = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const notifi = useAppSelector((state) => state.notification)

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div className="overflow-x-hidden overflow-y-scroll h-screen max-h-screen pb-[20vh] lg:pb-[30vh]">
      {notifi.map((noti: any) => (
        <div key={noti.id} className="flex flex-col mt-2">
          <div className="flex items-center">
            {noti.read === false && (
              <div
                style={{
                  position: "relative",
                  top: 0,
                  right: 0,
                  width: "10px",
                  height: "10px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              />
            )}
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

export default AllNoti
