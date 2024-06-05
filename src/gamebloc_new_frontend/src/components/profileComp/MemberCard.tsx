import { Avatar, ConfigProvider, theme } from "antd"
import React, { useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import PromptModal from "../Modals/PromptModal"
import { useGameblocHooks } from "../../Functions/gameblocHooks"

interface Props {
  gamer: any
  captain: string
}

const MemberCard = ({ gamer, captain }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const username = useAppSelector((state) => state.userProfile.username)
  const { isLoading, leaveSquad } = useGameblocHooks()

  const handleLeaveModal = () => {
    setOpenModal(!openModal)
  }

  const leave_Squad = () => {
    //  leaveSquad(gamer.name, "Remove successfully", "error", "")
    console.log(gamer.name)
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
          {gamer.name !== username ? (
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
