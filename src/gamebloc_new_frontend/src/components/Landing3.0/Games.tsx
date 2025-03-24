import React from "react"
import Button from "./Button"
import { motion } from "motion/react"
interface props {
  setVisible: (arg0: boolean) => void
}
function Games({ setVisible }: props) {
  return (
    <div className="flex flex-col gap-5 containerr sectionn relative">
      <img
        src={`blur.png`}
        alt=""
        className="absolute -top-96 -left-32 w-[600px] -z-30"
      />
      <img
        src={`touch2.png`}
        alt=""
        className="absolute -z-30 w-[750px] -top-60 -left-20"
      />
      <div className="flex flex-col-reverse gap-5 md:gap-0 md:flex-row md:justify-between md:items-center w-full">
        <div className="md:w-[40%] w-full">
          <img src={`gaming.png`} alt="" className="mx-auto" />
        </div>
        <div className="w-full md:w-[50%] flex flex-col gap-3 md:text-left">
          <h1 className="gradient-text md:text-4xl font-valorant text-transparent bg-gradient-to-r from-lgradient to-dgradient">
            New games joining the gamebloc gaming line up
          </h1>
          <p className="font-opsans text-white text-[12px] md:text-base">
            You can now create tournaments in three new games on
            Gamebloc—Fortnite, Free Fire, and Clash Royale! Compete not just on
            mobile, but also on console and PC. Get ready for bigger battles and
            even bigger prizes! 🎮🔥
          </p>
          <div onClick={() => setVisible(true)}>
            <Button text="Check it out" style="w-max " />
          </div>
        </div>
      </div>
      <div className="flex gap-8 justify-center md:justify-between items-center w-[90%] lg:w-2/3 mt-4 lg:mt-[4rem] mx-auto">
        <motion.img
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
          src={`ancient8.png`}
          alt=""
          className="w-[5rem] md:w-32 m-0 "
        />
        <motion.img
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          src={`sabertooth.png`}
          alt=""
          className="w-[5rem]   md:w-[10rem] m-0 "
        />
        <motion.img
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
          src={`GBLogo.png`}
          alt=""
          className="w-[5rem] md:w-32 m-0 "
        />
      </div>
    </div>
  )
}

export default Games
