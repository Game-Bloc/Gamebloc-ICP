import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

const Secure = () => {
  const [activeCorner, setActiveCorner] = useState(0)
  const [modal, setModal] = useState<{
    visible: boolean
    position: { top: string; left: string }
    text: string
    heading: string
  }>({
    visible: false,
    position: { top: "0", left: "0" },
    text: "",
    heading: "",
  })

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.5, 1],
      transition: {
        repeat: Infinity,
        duration: 0.8,
        repeatType: "loop" as "loop",
      },
    },
  }

  const modalVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  const svgVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 360,
      transition: {
        duration: 4,
        ease: "linear",
      },
    },
  }

  const circleVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as "loop",
      },
    },
  }

  const pathVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        duration: 3,
        ease: "easeInOut",
      },
    },
  }

  useEffect(() => {
    const cornerPositions = [
      { top: "10%", left: "7%" }, // Top-left
      { top: "10%", left: "70%" }, // Top-right
      { top: "80%", left: "7%" }, // Bottom-left
      { top: "80%", left: "70%" }, // Bottom-right
    ]
    const cornerTexts = [
      {
        Heading: "Immutable Transactions on the Block Chain",
        text: "Transactions on the BlockChain are immutable, meaning once they are recorded, they cannot be altered or deleted.",
      },
      {
        Heading: "Decentralized Security with ICP Tokens",
        text: "ICP tokens leverage decentralized blockchain technology to ensure the security of transactions. Through smart contracts and consensus mechanisms.",
      },
      {
        Heading: "Smart Contract Safeguards",
        text: "Smart contracts play a pivotal role in securing transactions. By automating and self-executing contract terms, they eliminate the need for intermediaries, reducing the risk of fraud.",
      },
      {
        Heading: "Web 3 Wallets for Enhanced Privacy",
        text: "Web 3 wallets, such as NFID, offer users enhanced privacy by allowing them to control their own data and identity.",
      },
    ]

    // Set the modal and trigger pulse every 4 seconds
    const intervalId = setInterval(() => {
      const currentCorner = (activeCorner + 1) % 4
      setActiveCorner(currentCorner)

      setModal({
        visible: true,
        position: cornerPositions[activeCorner],
        text: cornerTexts[activeCorner].text,
        heading: cornerTexts[activeCorner].Heading,
      })
    }, 7000)

    return () => clearInterval(intervalId)
  }, [activeCorner])

  return (
    <div className="mt-[2rem] lg:mt-[5rem] relative">
      <div className="flex flex-col">
        <p className="text-primary-second text-[1.1rem] sm:text-[2rem] flex w-full justify-center 2xl:text-[3rem] font-valorant mt-4">
          SECURED TRANSACTIONS
        </p>

        <div className="flex justify-center items-center mt-8 relative">
          <motion.div
            variants={svgVariants}
            initial="initial"
            animate="animate"
            className="svg-container relative"
          >
            <img
              src={`gamemach.svg`}
              alt="Game Mach"
              className="w-full h-auto lg:w-[35rem]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 313 190"
              className="w-full h-auto absolute top-0 left-0"
            >
              <motion.circle
                cx="150.422"
                cy="102.446"
                r="66.0518"
                stroke="#F6B8FC"
                strokeWidth="4.85675"
                variants={circleVariants}
                initial="initial"
                animate="animate"
              />
              <motion.path
                d="M150.343 123.817L134.657 114.752V132.477L150.343 141.542L166.028 132.477V114.752L150.343 123.817Z"
                fill="url(#paint0_linear_578_13819)"
                variants={pathVariants}
                initial="initial"
                animate="animate"
              />
            </svg>

            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate={activeCorner === 0 ? "animate" : ""}
              className="absolute top-0 left-0 w-[10px] h-[10px] bg-primary-second rounded-full"
            />
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate={activeCorner === 1 ? "animate" : ""}
              className="absolute top-0 right-0 w-[10px] h-[10px] bg-primary-second rounded-full"
            />
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate={activeCorner === 2 ? "animate" : ""}
              className="absolute bottom-[2.2rem] lg:bottom-[4.6rem] left-0 w-[10px] h-[10px] bg-primary-second rounded-full"
            />
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate={activeCorner === 3 ? "animate" : ""}
              className="absolute bottom-[2.2rem] lg:bottom-[4.6rem] right-0 w-[10px] h-[10px] bg-primary-second rounded-full"
            />
          </motion.div>
        </div>
      </div>

      {modal.visible && (
        <motion.div
          className=" hidden lg:flex flex-col  absolute z-10 p-4 bg-[#08010E] text-primary-second  border border-gray-300 rounded-md shadow-lg max-w-[20rem]"
          style={{
            top: modal.position.top,
            left: modal.position.left,
            transform: "translate(-50%, -50%)",
            marginTop: "10px",
            marginLeft: "10px",
          }}
          variants={modalVariants}
          initial="initial"
          animate="animate"
        >
          <h3 className="text-[.8rem] font-bold ">{modal.heading}</h3>
          <p className="text-[.6rem] mt-3 ">{modal.text}</p>
        </motion.div>
      )}
    </div>
  )
}

export default Secure
