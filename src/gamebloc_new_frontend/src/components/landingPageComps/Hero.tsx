import React, { useEffect, useState } from "react"
import "./hero.css"
import { Blurhash } from "react-blurhash"
const layer1: any = require("../../../assets/layer1.svg").default
const layer2: any = require("../../../assets/layer2.svg").default
const layer3: any = require("../../../assets/layer3.svg").default

interface Props {
  setModal: any
}

const Hero = ({ setModal }: Props) => {
  const [loadedImg1, setLoadedImg1] = useState<boolean>(false)
  const [loadedImg2, setLoadedImg2] = useState<boolean>(false)
  const [loadedImg3, setLoadedImg3] = useState<boolean>(false)

  useEffect(() => {
    let img1 = new Image()
    img1.onload = () => {
      setLoadedImg1(true)
    }
    img1.src = layer1
  }, [layer1])

  useEffect(() => {
    let img2 = new Image()
    img2.onload = () => {
      setLoadedImg2(true)
    }
    img2.src = layer2
  }, [layer2])

  useEffect(() => {
    let img3 = new Image()
    img3.onload = () => {
      setLoadedImg3(true)
    }
    img3.src = layer3
  }, [layer3])

  return (
    <div className="relative mt-[5rem] h-fit">
      <div
        style={{
          display: loadedImg1 ? "none" : "inline",
          position: "relative",
        }}
      >
        <Blurhash
          hash="LGDJ#H00-:nO?w4n-:Sj-9M{o~R*"
          resolutionX={32}
          resolutionY={32}
          punch={1}
          style={{ width: "100vw", height: "50vw" }}
        />
      </div>
      <img
        style={{ display: loadedImg1 ? "inline" : "none" }}
        src={layer1}
        className="w-screen relative"
        alt=""
      />
      <div
        style={{
          display: loadedImg2 ? "none" : "inline",
          position: "absolute",
        }}
      >
        <Blurhash
          hash="LTDu.|DwxwaixgIoxtR:xVWAbcWA"
          resolutionX={32}
          resolutionY={32}
          punch={1}
          style={{
            position: "absolute",
            top: "0",
            width: "100vw",
            height: "50vw",
          }}
        />
      </div>

      <img
        style={{ display: loadedImg2 ? "flex" : "none" }}
        src={layer2}
        className="w-screen absolute top-0"
        alt=""
      />
      <div className="absolute w-full top-0 flex justify-between items-center">
        <div className="flex flex-col w-[69%] 2xl:w-[70%] ml-8">
          <p
            style={{ lineHeight: "1.3" }}
            className="text-primary-second text-[0.85rem] sm:text-[2rem]  lg:text-[3rem]  xl:text-[4rem] h-fit  2xl:text-[4rem] font-valorant my-4 sm:my-8 "
          >
            THE FUTURE OF WEB3 GAMING
          </p>
          <p className="text-white text-[0.6rem] sm:text-[0.7rem] lg:text-lg mb-[0.5rem] md:mb-[1rem] ">
            {" "}
            Your Hub for Next-Gen Gaming! Join Crowdfunded Tournaments, Win
            Prizes, and Host Game Launch Events.
          </p>
          <button
            onClick={() => setModal(true)}
            className="pt-1 pb-[.25rem]  px-[.6rem] w-[6rem]  sm:w-[10rem] lg:w-[15rem] sm:px-6 text-[.6rem] sm:text-base text-black justify-between mt-[0.8rem] sm:mt-[1.5rem] hover:bg-primary-second/70  flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3"
          >
            <p className="text-[0.65rem] sm:text-[.85rem]">Get Started</p>
            <img src={`details.png`} alt="" className="m-0 w-[.75rem] sm:w-6" />
          </button>
        </div>
        <div
          style={{
            display: loadedImg3 ? "none" : "inline",
          }}
        >
          <Blurhash
            hash="LWC$O0VmxyE0xyM|$+NHt8NFk8oL"
            resolutionX={32}
            resolutionY={32}
            punch={1}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <img
          style={{ display: loadedImg3 ? "inline" : "none" }}
          src={layer3}
          className="w-[48.5%] 2xl:w-[68%]"
          alt=""
        />
      </div>
    </div>
  )
}

export default Hero
