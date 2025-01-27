import React, { useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import GamerCardII from "./GamerCardII"
import BetConfirmModal from "./BetConfirmModal"

const SquadViewCard = () => {
  const [showCard, setShowCard] = useState(false)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleModal = () => {
    setOpenModal(false)
  }
  const handleToggle = () => {
    setShowCard(!showCard)
  }

  return (
    <div className=" flex flex-col ">
      <div className="bg-[#1E1E21] flex justify-between items-center mt-4 px-4 py-2 w-full rounded-xl cursor-pointer">
        <div className="flex flex-col">
          <p className="ml-1  mt-3 text-[.85rem] lg:text-[1rem] text-[#A1A1AA] font-bold">
            Fire Squad
          </p>
          <div className="flex gap-4 mt-3">
            <button
              onClick={handleToggle}
              className="py-2 px-2  bg-primary-second text-black w-[10rem]  text-xs sm:text-sm rounded-xl "
            >
              Squad info
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="py-2 px-4  bg-primary-second text-black w-[10rem]  text-xs sm:text-sm rounded-xl "
            >
              Place Bet
            </button>
          </div>
        </div>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: showCard ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown onClick={handleToggle} className="text-[#A1A1AA]" />
        </motion.div>
      </div>

      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 w-full flex flex-col gap-4 justify-start"
          >
            <GamerCardII />
            <GamerCardII />
            <GamerCardII />
            <GamerCardII />
          </motion.div>
        )}
      </AnimatePresence>
      {openModal && <BetConfirmModal modal={handleModal} />}
    </div>
  )
}

export default SquadViewCard
