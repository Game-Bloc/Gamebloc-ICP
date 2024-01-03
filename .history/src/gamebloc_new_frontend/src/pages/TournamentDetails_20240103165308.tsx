import React from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/dashboardComps/Sidebar"
import { useNavigate } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io"
import { Avatar, ConfigProvider, Tabs, TabsProps } from "antd"

const TournamentDetail = () => {
  const navigate = useNavigate()

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tournament Info`,
      children: `Coming soon`,
    },
    {
      key: "2",
      label: `Rules and Description`,
      children: `Coming Soon`,
    },
    {
      key: "3",
      label: `Players`,
      children: `Coming Soon`,
    },
  ]

  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <div className="">
      <section className="flex gap-6">
        <Header />
        <Sidebar />
        <div className="flex flex-col ">
          <div className="m-4 mt-24  ">
            <div className="flex flex-col">
              <div
                onClick={() => navigate(-1)}
                className="flex  items-center cursor-pointer"
              >
                <IoIosArrowRoundBack className="text-primary-second" />
                <p className="text-primary-second ml-2 text-[0.8rem]">Back</p>
              </div>
              <div className="flex flex-col lg:flex-row ">
                <div className=" w-full lg:w-[50%] mt-4 sm:mt-8 lg:mx-4 flex flex-col">
                  <div className="flex w-full justify-center items-center">
                    <div className="relative border-solid border border-[#2E3438] w-fit rounded-[0.625rem]">
                      <img
                        src={
                          //   id == "1"
                          //     ? `category1.svg`
                          //     : id == "2"
                          //     ? `category2.svg`
                          //     : id == "3"
                          //     ? `category3.svg`
                          //     : id == "4"
                          //     ? `category4.svg`
                          //                                           :
                          `gamepad.png`
                        }
                        alt=""
                        className="rounded-[0.625rem]"
                      />
                      <div className="absolute flex top-4 left-4 bg-gradient-to-r justify-between items-center from-[#77536F] to-[#574151] rounded-md sm:rounded-xl py-1 px-2 sm:p-3 ">
                        <img src={`mdi_crowd.png`} className="m-0" alt="" />
                        <p className=" ml-[.5rem]  text-[0.6rem]  sm:text-sm text-white">
                          Crowd Funded
                        </p>
                      </div>
                      <div className="flex absolute right-4 bottom-4 flex-wrap justify-end items-center gap-4">
                        <div className="rounded-[9999px] pt-[0.3rem] px-[.9rem] pb-[0.2rem] sm:px-[1.2rem] sm:pb-[0.4rem]  bg-[#FEE4E2] border-none">
                          <p className=" text-[#D92D20] text-[0.6rem] sm:text-[0.8rem] cursor-pointer font-medium">
                            Action
                          </p>
                        </div>
                        <div className="rounded-[9999px] pt-[0.3rem] px-[.9rem] pb-[0.2rem] sm:px-[1.2rem] sm:pb-[0.4rem]  bg-[#FFD98F] border-none">
                          <p className=" text-[#B88217] text-[0.6rem] sm:text-[0.8rem] cursor-pointer font-medium">
                            Adventure
                          </p>
                        </div>
                        <div className="rounded-[9999px] pt-[0.3rem] px-[.9rem] pb-[0.2rem] sm:px-[1.2rem] sm:pb-[0.4rem]  bg-[#D1FADF] border-none">
                          <p className=" text-[#039855] text-[0.6rem] sm:text-[0.8rem] cursor-pointer font-medium">
                            Shooting
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-solid border mt-8  border-[#2E3438] rounded-[0.625rem]">
                    <div className="flex justify-between my-[.9rem] mx-4 items-center">
                      <p className=" text-[0.7rem] font-semibold sm:text-base  text-white ">
                        Host Tournament
                      </p>
                    </div>
                    <div className="my-4 border border-solid border-[#2E3438] w-full" />

                    <div className="p-4 flex flex-col">
                      <p className=" text-[0.8rem] font-semibold sm:text-base  text-white ">
                        {" "}
                        Information
                      </p>

                      <p className="mt-4 text-[0.7rem] xl:text-[1rem] text-white">
                        As a registered user, you can create your own
                        tournaments. Specify the game, tournament format, entry
                        fees (for crowdfunded tournaments), and prize pool (for
                        prepaid tournaments). Set the rules and guidelines, and
                        watch as gamers from all over sign up for your event.
                        Browse through the list of upcoming tournaments. Join
                        your preferred tournament by paying the entry fee or
                        confirming your participation. Get ready to compete and
                        showcase your gaming skills. If you're a winner, your
                        prizes will be awarded based on the tournament's rules.
                        Receive your rewards and bask in the glory of your
                        victory.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-[0.625rem] w-full lg:w-[50%] mt-8 border-solid border-[#2E3438]">
                  <div className="mt-[1.5rem] mx-4 ">
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimaryActive: "#F6B8FC",
                          colorPrimary: "#F6B8FC",
                          colorPrimaryHover: "#F6B8FC",
                          colorText: "#fff",
                        },
                      }}
                    >
                      <Tabs
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                      />
                    </ConfigProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TournamentDetail
