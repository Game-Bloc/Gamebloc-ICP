import React from "react"
import { motion } from "motion/react"
function Roadmap() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      className="containerr sectionn flex flex-col gap-8"
    >
      <div className="w-full md:w-3/4 mx-auto flex flex-col gap-3 text-center">
        <h1 className="gradient-text md:text-4xl font-valorant text-transparent bg-gradient-to-r from-lgradient to-dgradient">
          Gamebloc’s 2025 Roadmap : The Master Plan
        </h1>
        <p className="font-opsans text-white text-[12px] md:text-base md:w-2/3 mx-auto">
          Explore what’s next for Gamebloc! Our 2025 roadmap is packed with
          exciting updates, new features, and bigger tournaments. Stay ahead and
          be part of the evolution of Web3 gaming!
        </p>
      </div>
      <img src={`Roadmapping.png`} alt="" className="mx-auto hidden md:block" />
      <img src={`Gang.png`} alt="" className="mx-auto md:hidden" />
    </motion.div>
  )
}

export default Roadmap
