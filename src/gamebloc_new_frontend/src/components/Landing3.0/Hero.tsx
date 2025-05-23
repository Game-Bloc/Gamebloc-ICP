import React from "react"
import Button from "./Button"
import { motion } from "motion/react"
interface props {
  setVisible: (arg0: boolean) => void
}
function Hero({ setVisible }: props) {
  return (
    <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between md:items-center containerr sectionn overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
        className="w-full md:w-[60%] flex flex-col gap-5 md:text-left"
      >
        <h1 className="gradient-text md:text-[40px] font-valorant text-transparent bg-gradient-to-r from-lgradient to-dgradient">
          Powering the future of competitive web3 gaming
        </h1>
        <p className="font-opsans text-white text-[12px] md:text-base">
          Experience next-gen gaming with seamless tournaments, exciting
          rewards, and a thriving player community. Compete, earn, and showcase
          your skills in the ultimate blockchain-powered gaming hub.
        </p>
        <div onClick={() => setVisible(true)}>
          <Button text="Enter Gamebloc" style="w-max " />
        </div>
      </motion.div>
      <div className="md:w-2/3">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -65, 0],
            opacity: 1,
            transition: {
              y: { duration: 4, ease: "easeInOut", repeat: Infinity },
              opacity: { duration: 4, ease: "easeInOut" },
            },
          }}
          src={`Hero2.png`}
          alt=""
          className="w-full"
        />
      </div>
    </div>
  )
}

export default Hero
