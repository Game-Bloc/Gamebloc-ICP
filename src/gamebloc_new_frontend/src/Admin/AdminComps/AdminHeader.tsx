import React, { useEffect, useState } from "react"
import { IoMenu } from "react-icons/io5"
import { IoClose } from "react-icons/io5"
import { NavLink, useNavigate } from "react-router-dom"
import { MdDashboard } from "react-icons/md"
import { MdVideogameAsset } from "react-icons/md"
import { FaAngleDown } from "react-icons/fa"
import { Avatar, ConfigProvider, Select, theme } from "antd"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { CiUser } from "react-icons/ci"
import { PiSignOutThin } from "react-icons/pi"
import { useAuth } from "../../Auth/use-auth-client"
import { HiChatBubbleOvalLeft } from "react-icons/hi2"
import { MdHub } from "react-icons/md"

const AdminHeader = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [profileModal, setProfileModal] = useState<boolean>(false)
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false)
  const username = useAppSelector((state) => state.userProfile.username)
  const initials = username!.substring(0, 2).toUpperCase()
  const { getProfile } = useGameblocHooks()
  const { logout } = useAuth()
  const tournamentName: String[] = ["Call of Duty: Mobile"]

  const menus = [
    { name: "Dashboard", link: "/admin-dashboard", icon: MdDashboard },
    {
      name: "Tournament",
      link: "/admin-tournament-view",
      icon: MdVideogameAsset,
    },
    {
      name: "Admin Hub",
      link: "/admin-hub",
      icon: MdHub,
    },
  ]

  return (
    <div className="flex fixed justify-between lg:px-4 items-center w-full h-[5rem] bg-primary-first  z-10 ">
      <div className="m-4 flex w-full justify-between items-center lg:my-4 lg:mx-0">
        <img
          onClick={() => navigate("/admin-dashboard")}
          src={`logo.png`}
          alt=""
          className="w-32 m-0 hidden lg:block cursor-pointer "
        />
        <IoMenu
          className="text-primary-second block lg:hidden"
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-4">
          <div className="hidden lg:flex items-center ">
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                  colorPrimaryActive: "#F6B8FC",
                  colorPrimary: "#F6B8FC",
                  colorPrimaryHover: "#F6B8FC",
                  colorText: "#fff",
                },
              }}
            >
              <Select
                className="mr-[2rem]"
                defaultValue={tournamentName[0]}
                style={{ width: "fit-content" }}
                optionFilterProp="children"
                options={tournamentName.map((name) => ({
                  value: name,
                  label: name,
                }))}
              />
            </ConfigProvider>
          </div>

          <div
            onClick={() => setProfileModal(!profileModal)}
            className="flex items-center relative cursor-pointer rounded-[9999px] bg-[#fff]/10"
          >
            <Avatar
              style={{
                backgroundColor: "#f6b8fc",
                color: "#01070E",
                fontSize: ".8rem",
              }}
              size={40}
            >
              KI
            </Avatar>

            <p className="text-bold text-[.7rem] p-[.65rem]  sm:text-[.8rem] sm:p-[.8rem] text-primary-second">
              Kitchen
            </p>
          </div>

          {profileModal && (
            <div
              onClick={() => setProfileModal(false)}
              className="fixed inset-0 bg-[transparent]  bg-opacity-75 transition-opacity"
            >
              <div className="absolute w-[14rem] bg-[#030C15] rounded-[12px] h-32 flex border border-solid border-[#ffff]/20  flex-col  top-[4rem] right-2 p-4">
                <div
                  onClick={() => navigate("/admin-profile")}
                  className="flex items-center hover:bg-[#fff]/10 cursor-pointer rounded-md w-full p-3"
                >
                  <CiUser className="text-white" />
                  <p className=" ml-4 text-[.8rem] sm:text-base text-white ">
                    {" "}
                    Admin profile
                  </p>
                </div>
                <div
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center hover:bg-[#fff]/10 cursor-pointer rounded-md w-full p-3"
                >
                  <PiSignOutThin className=" text-white" />
                  <p className=" ml-4 text-[.8rem] sm:text-base text-white ">
                    {" "}
                    Homepage
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {open && (
        <div className="bg-primary-second duration-500  absolute left-0 top-0 w-[60%] h-screen">
          <div onClick={() => setOpen(!open)} className="absolute left-4 top-4">
            {/* <div className="relative inline-block ">
                    <FaRegBell />
                    {unreadmessages.length !== 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: "10px",
                          height: "10px",
                          backgroundColor: "red",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div> */}
          </div>
          <div className="absolute right-4 top-4">
            <IoClose onClick={() => setOpen(!open)} />
          </div>
          <div className=" flex flex-col  w-full relative mt-[2rem]">
            <div className="flex justify-center items-center">
              <img src={`gamelogo.png`} className="w-16 mt-[3rem]" alt="" />
            </div>
            <div className="relative flex flex-col gap-4 ml-[2rem]  mt-8">
              {menus.map((value, index) => (
                <div key={index}>
                  <NavLink
                    key={index}
                    to={value.link}
                    style={{ textDecoration: "none" }}
                    className={({ isActive }) =>
                      isActive
                        ? "my-2 text-sm flex font-bold  items-center"
                        : "my-2 text-sm flex font-bold items-center"
                    }
                  >
                    {React.createElement(value.icon, {
                      size: "25",
                      color: "#000",
                    })}
                    <span className="mx-4"> {value.name}</span>
                    {/* {value.subMenu && (
                            <FaAngleDown
                              className={`text-black ${openSubMenu && "rotate-180"} `}
                              onClick={() => setOpenSubMenu(!openSubMenu)}
                            />
                          )} */}
                  </NavLink>
                  {/* {value.subMenu && openSubMenu && open && (
                          <ul className="flex flex-col ml-[3rem] ">
                            {value.subMenu.map((value, index) => (
                              <NavLink
                                to={value.link}
                                key={index}
                                className={({ isActive }) =>
                                  isActive
                                    ? "my-2 text-sm flex font-bold  items-center"
                                    : "my-2 text-sm flex font-bold items-center"
                                }
                              >
                                {value.name}
                              </NavLink>
                            ))}
                          </ul>
                        )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminHeader
