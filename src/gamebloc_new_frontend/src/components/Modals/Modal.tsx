import React from "react"

type Prop = {
  modal: any
  _function?: () => any
  message: string
}

const Modal = ({ modal, _function, message }: Prop) => {
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
            <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div className="relative  bg-primary-first rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className=" bg-primary-first px-4 pt-5 shadow-md pb-4 sm:p-6 sm:pb-4">
                  <div className=" flex  flex-col w-full  sm:w-[28rem] p-4 h-fit  ">
                    {/* <h4 className="font-medium text-[#08172E] text-white/90 text-base ">
                      Sign Out of Gamebloc
                    </h4> */}
                    <p className=" text-white/90 text-sm my-2">{message}</p>
                    <div className=" flex mt-2 flex-row  ">
                      <button
                        onClick={() => modal(false)}
                        className="py-2 px-8 bg-[#141414]/10 text-white/70 w-full border border-white border-solid text-xs sm:text-sm "
                      >
                        Cancel
                      </button>
                      <button
                        className="py-2 px-8 ml-4 bg-[#EF4444] text-[#ffffff] w-full  text-xs sm:text-sm "
                        onClick={() => {
                          _function(), modal(false)
                        }}
                      >
                        Yes, I’m Sure
                      </button>
                    </div>
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

export default Modal
