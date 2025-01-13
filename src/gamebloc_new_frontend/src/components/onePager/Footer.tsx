import React from "react"
import { Element } from "react-scroll"

const Footer = () => {
  return (
    <Element name="social" id="social">
      <div className="w-full lg:mt-8 ">
        {/* <div className="flex bg-primary-second flex-col lg:flex-row  justify-between items-center  lg:mt-4 sm:py-[3rem] p-[1.5rem]  sm:p-[3rem]">
          <div className="flex flex-col lg:-mt-[2.5rem] ">
            <p className="text-base m-0">Subscribe to our E-mail newsletter</p>
            <div className="flex flex-row items-center">
              <div className=" my-4 items-center pr-8 h-[2.7rem] pl-[0.5rem] border-[#01070E] border-solid border rounded-lg flex">
                <input
                  className="border-none w-full text-black focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-black appearance-none text-[0.9rem] bg-[transparent]"
                  placeholder="Email"
                  type="text"
                />
              </div>

              <button className="pt-1 pb-[.25rem] ml-6   px-[.6rem]  sm:px-4 text-[.7rem] sm:text-sm text-primary-second justify-center  flex bg-primary-first rounded-lg items-center cursor-pointer sm:py-2">
                <p className="font-semibold">Subscribe</p>
              </button>
            </div>
          </div>

          <div className="grid mt-[2rem] gap-4 lg:gap-8 lg:0 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            <div className="flex flex-col">
              <p className="text-primary-first text-[1.25rem] mb-[1.875rem] font-bold leading-[1.23575rem] ">
                About US
              </p>
              <p className="mb-[1.25rem] leading-[1.4875rem] text-[.8rem] text-primary-first cursor-pointer font-normal">
                About Gamebloc
              </p>
              <p className="mb-[1.25rem] leading-[1.4875rem] text-[.8rem] cursor-pointer  text-primary-first font-normal">
                Features
              </p>
              <p className="mb-[1.25rem] leading-[1.4875rem] text-[.8rem] cursor-pointer  text-primary-first font-normal">
                Services
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-primary-first text-[1.25rem] mb-[1.875rem] font-bold leading-[1.23575rem] ">
                Support
              </p>
              <p className="mb-[1.25rem] leading-[1.4875rem] text-[.8rem] text-primary-first cursor-pointer font-normal">
                Contact Us
              </p>
              <p className="mb-[1.25rem] leading-[1.4875rem] text-[.8rem] cursor-pointer  text-primary-first font-normal">
                Customer Support
              </p>
              <p className="mb-[1.25rem] leading-[1.4875rem] text-[.8rem] cursor-pointer  text-primary-first font-normal">
                FAQs
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-primary-first text-[1.25rem] mb-[1.875rem] font-bold leading-[1.23575rem] ">
                Legal
              </p>
              <p className="mb-[1.25rem] leading-[1.4875rem] text-[.8rem] text-primary-first cursor-pointer font-normal">
                Terms & Conditions
              </p>
              <p className="mb-[1.25rem] leading-[1.4875rem] text-[.8rem] cursor-pointer  text-primary-first font-normal">
                Privacy & Policy
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-primary-first text-[1.25rem] mb-[1.875rem] font-bold leading-[1.23575rem] ">
                Market Place
              </p>
              <p className="mb-[1.25rem] leading-[1.4875rem] text-[.8rem] text-primary-first cursor-pointer font-normal">
                Launch a game
              </p>
              <p className="mb-[1.25rem] leading-[1.4875rem] text-[.8rem] cursor-pointer  text-primary-first font-normal">
                Collaboration
              </p>
              <p className="mb-[1.25rem] leading-[1.4875rem] text-[.8rem] cursor-pointer  text-primary-first font-normal">
                Host a Tournament
              </p>
            </div>
          </div>
        </div>
        <div className="mx-[1.5rem] sm:mx-[3rem]">
          <div className="  border border-solid border-[#2E3438]/40 w-full" />
        </div> */}
        <div className="relative  mx-[1.5rem] sm:mx-[3rem]">
          <div className="w-full  border-solid border-white/20 border-b-[1px]  my-3" />
        </div>
        <div className="relative mt-3 mx-[1.5rem] sm:mx-[3rem] py-[1rem]  flex justify-between items-center">
          <img
            src={`footer_1.png`}
            alt=""
            className="absolute w-[50%] h-[90%] top-1/2 left-1/2 transform -translate-x-1/2 "
          />

          <div className="relative flex">
            <img
              src={`logo.png`}
              alt=""
              className=" w-[2.5rem]   md:w-[10rem] m-0"
            />
            <p className="text-[.6rem] mt-3 sm:mt-5 lg:mt-6 text-white">
              ©{new Date().getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@sbrtooth.com"
              className="cursor-pointer"
              target="_blank"
            >
              <img src={`mail.png`} className=" w-4 md:w-[1.5rem] " alt="" />
            </a>

            <a
              href="https://x.com/game_bloc"
              className="cursor-pointer"
              target="_blank"
            >
              <img src={`twitter.png`} className=" w-4 sm:w-[1.5rem] " alt="" />
            </a>
            <a
              href="https://www.instagram.com/game_bloc"
              className="cursor-pointer"
              target="_blank"
            >
              <img src={`insta.png`} className=" w-4 sm:w-[1.5rem]  " alt="" />
            </a>
            <a
              href="https://discord.gg/4zvaufxpbx"
              className="cursor-pointer"
              target="_blank"
            >
              <img src={`discord.png`} className=" w-4 sm:w-[1.5rem] " alt="" />
            </a>
          </div>
        </div>
      </div>
    </Element>
  )
}

export default Footer
