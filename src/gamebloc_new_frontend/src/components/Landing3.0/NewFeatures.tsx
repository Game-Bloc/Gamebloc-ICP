import React from "react"
import { motion } from "motion/react"
import FeatureCard from "./FeatureCard"
function NewFeatures() {
  return (
    <div className="flex flex-col gap-10 sectionn containerr relative">
      <img
        src={`touch3.png`}
        alt=""
        className="absolute -left-20 h-[450px] w-full top-2"
      />
      <div className="mx-auto text-center">
        <h1 className="gradient-text md:text-4xl font-valorant text-transparent bg-gradient-to-r from-lgradient to-dgradient">
          Gamebloc just got even better!
        </h1>
        <p className="font-opsans text-white text-[12px] md:text-base mt-3 ">
          Exciting updates are coming to Gamebloc! Get ready for
        </p>
      </div>
      <div className="flex flex-col items-center justify-center md:flex-row gap-5 md:gap-12">
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
        >
          <FeatureCard
            img={`arena.png`}
            title="Gamebloc Arena"
            description="Play original Gamebloc games, climb the leaderboards, and earn points to enter tournaments for free!"
          />
        </motion.div>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={
            window.innerWidth < 768
              ? { duration: 0.7, ease: "easeOut", delay: 0.25 }
              : { duration: 0.7, ease: "easeOut", delay: 0.7 }
          }
        >
          <FeatureCard
            img={`community.png`}
            title="Community"
            description="A revamped community section to enhance engagement and connectivity."
          />
        </motion.div>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            window.innerWidth < 768
              ? { duration: 0.7, ease: "easeOut", delay: 0.25 }
              : { duration: 0.7, ease: "easeOut", delay: 1.05 }
          }
        >
          <FeatureCard
            img={`versus.png`}
            title="1v1 Game Mode"
            description="Play original Gamebloc games, climb the leaderboards, and earn points to enter tournaments for free!"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default NewFeatures
