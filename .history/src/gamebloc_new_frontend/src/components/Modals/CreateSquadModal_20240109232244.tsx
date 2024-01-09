import React from "react"

interface Props {
  modal: any
}

const CreateSquadModal = ({ modal }: Props) => {
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full ">
              <div className="relative bg-primary-first w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                <div className="bg-primary-first p-[2rem] flex flex-col justify-center items-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateSquadModal
