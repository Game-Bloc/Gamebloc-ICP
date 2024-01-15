import React, { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/dashboardComps/Sidebar"
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { Avatar, ConfigProvider, Tabs, TabsProps } from "antd"
import { useAppSelector } from "../redux/hooks"
import Copy from "../components/utils/Copy"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import { useGetAllSquad } from "../Functions/blochooks"
import FallbackLoading from "../components/Modals/FallBackLoader"
import Squad from "../components/profileComp/Squad"

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Squad`,
    children: <Squad />,
  },
]

const Profile = () => {
  const navigate = useNavigate()
  const username = useAppSelector((state) => state.userProfile.username)
  const principal = useAppSelector((state) => state.userProfile.principal_id)
  const accountId = useAppSelector((state) => state.userProfile.account_id)
  const date = useAppSelector((state) => state.userProfile.date)
  const balance = useAppSelector((state) => state.IcpBalance.balance)
  const initials = username!.substring(0, 2).toUpperCase()
  const principalID = principal
  const textToCopy = "GFHnfhctUYGFYVteyutyu76534FGHJGCJVJHssh4HJY"
  const { getProfile, isLoadingProfile, getICPBalance } = useGameblocHooks()
  const { updating, getAllSquads } = useGetAllSquad()
  const [_date, setDate] = useState<string>("")

  const onChange = (key: string) => {
    console.log(key)
  }
  useEffect(() => {
    getProfile()
    getAllSquads()
    getICPBalance()
  }, [])

  console.log("Redux Balance:", balance)

  if (isLoadingProfile) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <FallbackLoading />
      </div>
    )
  } else {
    return (
      <div className="">
        <section className="flex">
          <Header />
          <Sidebar />
          <div className="flex flex-col w-full">
            <div className="m-4 mt-24  ">
              <div className="">
                {/* <div
                  onClick={() => navigate(-1)}
                  className="flex  items-center cursor-pointer"
                >
                  <IoIosArrowRoundBack className="text-primary-second" />
                  <p className="text-primary-second ml-2 text-[0.8rem]">Back</p>
                </div> */}

                <div className=" sm:ml-4 mt-4  flex flex-col ">
                  <h1 className="text-primary-second font-bold mt-4 text-base md:text-[1.5rem] 2xl:text-[2rem]">
                    Your profile
                  </h1>
                  <div className=" flex flex-col w-full sm:w-fit justify-center items-center md:items-start md:justify-start  mt-8 bg-[#030C15] p-4 rounded-[1.6rem]">
                    <div className="flex ">
                      <Avatar
                        style={{
                          backgroundColor: "#f6b8fc",
                          color: "#01070E",
                          fontSize: "1.2rem",
                        }}
                        size={80}
                      >
                        {initials}
                      </Avatar>
                      <div className="flex ml-[3rem] flex-col">
                        <h2 className="text-white text-bold text-base sm:text-[1.5rem]">
                          {username}
                        </h2>
                        <div className="flex items-center">
                          <img src={`calender.svg`} className="m-0" alt="" />
                          <p className="text-bold text-[.7rem] p-[.65rem]  sm:text-[.8rem] sm:p-[.8rem] text-[#9B9B9B]">
                            Member since {date}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="text-bold text-[.7rem] p-[.65rem]  sm:text-[.8rem] sm:p-[.8rem] text-[#ffffff]">
                            ICP Balance: {balance}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-primary-second border-solid w-full mt-[1.5rem] mb-4" />

                    <div className="mt-[.5rem] gap-4 flex flex-col md:flex-row ">
                      <div className="flex flex-col justify-start">
                        <p className="text-[#E0DFBA] text-[.8rem] sm:text-base text-bold">
                          Principal I.D{" "}
                        </p>
                        <div className=" border-solid border-[#634E6D] mt-[.5rem] flex border rounded-md">
                          <Copy textToCopy={principalID} />
                          <h2 className="text-white p-[.5rem] ml-4 text-bold text-[.8rem] sm:text-[1rem] w-[15rem] md:w-[10rem] whitespace-nowrap overflow-hidden text-ellipsis">
                            {principal}
                          </h2>
                        </div>
                      </div>
                      <div className="flex flex-col justify-start">
                        <p className="text-[#E0DFBA] text-[.8rem] sm:text-base text-bold">
                          Account I.D{" "}
                        </p>
                        <div className=" border-solid border-[#634E6D] mt-[.5rem] flex border rounded-md">
                          <Copy textToCopy={accountId} />
                          <h2 className="text-white p-[.5rem] ml-4 text-bold text-[.8rem] sm:text-[1rem] w-[15rem] md:w-[10rem] whitespace-nowrap overflow-hidden text-ellipsis">
                            {accountId}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-[3rem] ">
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
        </section>
      </div>
    )
  }
}

export default Profile
