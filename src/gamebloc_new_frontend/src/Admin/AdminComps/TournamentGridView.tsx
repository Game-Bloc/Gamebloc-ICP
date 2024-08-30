import React, { useState } from "react"
import AssignPointsModal from "../AdminModals/AssignPointsModal"

interface ign {
  players: any[]
}

const TournamentGridView = ({ players }: ign) => {
  const [openPlayerModal, setOpenPlayerModal] = useState<boolean>(false)

  const handleModal = () => {
    setOpenPlayerModal(!openPlayerModal)
  }

  return (
    <div className="grid grid-cols-3 gap-8 mt-4 ">
      {players.map((player) => (
        <div
          key={player.inGameName}
          className="flex justify-between items-center px-3 border py-4 border-[#5041BC] group "
        >
          <p className="text-white text-[.85rem] ">{player.inGameName}</p>
          <div className="hidden gap-4 group-hover:flex">
            {/* <img onClick={handleModal} src={`view.png`} alt="" />
            <img
              src={`delete-red.png`}
              className="ml-3 cursor-pointer"
              alt=""
            /> */}
          </div>
        </div>
      ))}

      {/* {openPlayerModal && (
        <AssignPointsModal
          modal={handleModal}
          player={undefined}
          onSave={undefined}
        />
      )} */}
    </div>
  )
}

export default TournamentGridView
