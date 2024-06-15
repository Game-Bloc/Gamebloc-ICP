import { Avatar, ConfigProvider, theme } from "antd"
import React, { useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import PromptModal from "../Modals/PromptModal"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
const { Principal } = require("@dfinity/principal")
interface Props {
  gamer: any
  captain: string
  id: string
}

const MemberCard = ({ gamer, captain, id }: Props) => {
  const principalText = gamer.principal_id
  const [openModal, setOpenModal] = useState<boolean>(false)
  const username = useAppSelector((state) => state.userProfile.username)
  const { isLoading, leaveSquad } = useGameblocHooks()

  const handleLeaveModal = () => {
    setOpenModal(!openModal)
  }

  const leave_Squad = () => {
    const principal = Principal.fromText(principalText)
    leaveSquad(id, principal, "Removed successfully", "error", "")
    // console.log(id)
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center">
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <Avatar style={{ backgroundColor: "#f56a00" }}>
            {gamer.name.substring(0, 2).toUpperCase()}
          </Avatar>
        </ConfigProvider>
        <p className="text-white text-[.8rem] ml-2">{gamer.name}</p>
      </div>
      {gamer.name === captain ? (
        <div>
          <p className="text-white text-[.6rem]">Squad Captain</p>
        </div>
      ) : gamer.name !== captain ? (
        <div>
          {username == captain ? (
            <div onClick={() => setOpenModal(true)} className="cursor-pointer">
              <img src={`remove.png`} alt="" />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {openModal && (
        <PromptModal
          modal={handleLeaveModal}
          handleRemove={leave_Squad}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default MemberCard
