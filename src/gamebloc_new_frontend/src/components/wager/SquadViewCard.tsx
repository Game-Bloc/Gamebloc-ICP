import React, { useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import GamerCardII from "./GamerCardII"

const SquadViewCard = () => {
  const [showCard, setShowCard] = useState(false)

  const handleToggle = () => {
    setShowCard(!showCard)
  }

  return (
    <div className=" flex flex-col ">
      <div
        onClick={handleToggle}
        className="bg-[#1E1E21] flex justify-between items-center mt-4 px-4 py-2 w-full rounded-full cursor-pointer"
      >
        <p className="text-[.85rem] text-[#A1A1AA] font-bold">Fire Squad</p>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: showCard ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-[#A1A1AA]" />
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
    </div>
  )
}

export default SquadViewCard
