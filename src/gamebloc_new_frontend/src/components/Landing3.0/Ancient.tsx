import React from "react"
import Button from "./Button"
import { motion } from "motion/react"
interface props {
  setVisible: (arg0: boolean) => void
}
function Ancient({ setVisible }: props) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
      className="containerr sectionn flex flex-col gap-8 relative"
    >
      <img
        src={`blur.png`}
        alt=""
        className="hidden lg:block absolute -top-[50px] -right-[500px] -z-10"
      />
      <img src={`Icp.svg`} alt="" className="mx-auto w-[88px] md:w-[136px]" />
      <div className="w-full flex flex-col gap-3 text-center">
        <h1 className="gradient-text md:text-4xl font-valorant text-transparent bg-gradient-to-r from-lgradient to-dgradient">
          Transactions on the ICP network{" "}
        </h1>
        <p className="font-opsans text-white text-[12px] md:text-base md:w-2/3 mx-auto">
          Gamebloc ensures secure and transparent transactions with ICP’s
          blockchain technology. Smart contracts automate and enforce
          agreements, eliminating intermediaries and reducing fraud. With Web3
          wallets like NFID, you stay in control of your data and identity for a
          seamless and private gaming experience.
        </p>
        <div onClick={() => setVisible(true)}>
          <Button text="Get Started Now" style="w-max mx-auto mt-2" />
        </div>
      </div>
    </motion.div>
  )
}

export default Ancient
