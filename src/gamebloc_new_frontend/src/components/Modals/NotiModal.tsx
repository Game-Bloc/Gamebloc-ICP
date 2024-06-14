import React from "react"
import { RiCloseFill } from "react-icons/ri"

interface notiState {
  modal: () => void
  data: any
}

const NotiModal = ({ modal, data }: notiState) => {
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-[#fff]/20 bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full ">
              <div className="relative border-white/10 border border-solid bg-primary-first w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                <div className="bg-primary-first  p-[2rem] flex flex-col justify-center items-center">
                  <RiCloseFill
                    onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div key={data.id} className="flex flex-col mt-4">
                    <div className="flex items-center">
                      <p className=" text-white/50">{data.body}</p>
                    </div>
                    <p className="text-white/25 mt-2"> {data.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotiModal
