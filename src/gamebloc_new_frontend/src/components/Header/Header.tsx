import React, { useEffect, useState } from "react"
import { IoMenu } from "react-icons/io5"
import { IoClose } from "react-icons/io5"
import { NavLink, useNavigate } from "react-router-dom"
import { MdDashboard } from "react-icons/md"
import { MdVideogameAsset } from "react-icons/md"
import { FaAngleDown } from "react-icons/fa"
import { Avatar, Tooltip } from "antd"
import { useAppSelector } from "../../redux/hooks"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { CiUser } from "react-icons/ci"
import { PiSignOutThin } from "react-icons/pi"
import { useAuth } from "../../Auth/use-auth-client"
import { HiChatBubbleOvalLeft } from "react-icons/hi2"
import LoginModal2 from "../Modals/LoginModal2"
import WelcomeModal from "../Modals/WelcomeModal"
import SignOutModal from "../Modals/SignOutModal"
import { FaRegBell } from "react-icons/fa"
import MobileNoti from "../notifications/MobileNoti"

const Header = () => {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const notifi = useAppSelector((state) => state.notification)
  const unreadmessages = notifi
    .filter((list: any) => list.read === false)
    .map((data: any) => data)
  const [profileModal, setProfileModal] = useState<boolean>(false)
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false)
  const username = useAppSelector((state) => state.userProfile.username)
  const initials = username?.substring(0, 2).toUpperCase()
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const [accountModal, setAccountModal] = useState<boolean>(false)
  const [mobileNotiModal, setMobileNotiModal] = useState<boolean>(false)

  useEffect(() => {
    if (mobileNotiModal || open) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }

    // Clean up the effect when the component is unmounted
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [mobileNotiModal, open])

  const menus = [
    {
      name: "Overview",
      action: () => {},
      link: "/dashboard",
      icon: MdDashboard,
    },
    {
      name: "Tournament",
      action: () => setOpenSubMenu(!openSubMenu),
      link: "",
      icon: MdVideogameAsset,
      subMenu: [
        { name: "Prepaid", link: "/prepaid-tournament" },
        { name: "CrowdFunded", link: "/active-tournament" },
      ],
    },
    {
      name: "World Chat",
      action: () => {},
      link: isAuthenticated ? "/world-chat" : "",
      icon: HiChatBubbleOvalLeft,
    },
  ]
  const closeNotification = () => {
    setMobileNotiModal(false)
  }
  const handleLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }
  const handleAccModal = () => {
    setAccountModal(!accountModal)
  }
  const handleSignOutModal = () => {
    setOpenModal(!openModal)
  }

  const signOut = () => {
    localStorage.clear()
    sessionStorage.clear()
    logout()
    navigate("/dashboard")
    setOpenModal(false)
  }

  return (
    <div className="flex fixed justify-between lg:px-4 items-center w-full h-[5rem] bg-primary-first border-solid border-b-4 border-[#f6b8fc13] z-10 ">
      <div className="m-4 flex w-full justify-between items-center lg:my-4 lg:mx-0">
        <img
          onClick={() => navigate("/dashboard")}
          src={`logo.png`}
          alt=""
          className="w-32 m-0 hidden cursor-pointer lg:block"
        />
        <IoMenu
          className="text-primary-second block lg:hidden"
          onClick={() => setOpen(!open)}
        />
        {!isAuthenticated ? (
          <div className=" flex justify-between items-center">
            <p
              onClick={() => handleLoginModal()}
              className="text-primary-second hover:text-primary-second/70  text-[0.85rem] sm:text-sm cursor-pointer"
            >
              Login
            </p>
            <button
              onClick={() => handleLoginModal()}
              className="pt-1 pb-[.25rem] ml-4  px-[.6rem]  sm:px-4 text-[.7rem] sm:text-sm text-black justify-center hover:bg-primary-second/70   flex bg-primary-second rounded-lg items-center cursor-pointer sm:py-2"
            >
              <p className="font-semibold">Create Account</p>
            </button>
          </div>
        ) : (
          <div className="flex relative items-center">
            <Tooltip placement="bottom" title="Notifications" color="#bfa9c27e">
              <div
                onClick={
                  isAuthenticated
                    ? () => setMobileNotiModal(true)
                    : () => handleLoginModal()
                }
                className="relative hidden lg:inline-block cursor-pointer mr-8"
              >
                <FaRegBell className="text-primary-second" />
                {unreadmessages.length == !0 && (
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
              </div>
            </Tooltip>
            <Tooltip placement="bottom" title="Profile" color="#bfa9c27e" fresh>
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
                  {initials}
                </Avatar>

                <p className="text-bold text-[.7rem] p-[.65rem]  sm:text-[.8rem] sm:p-[.8rem] text-primary-second">
                  {username}
                </p>
              </div>
            </Tooltip>
            {profileModal && (
              <div
                onClick={() => setProfileModal(false)}
                className="fixed inset-0 bg-[transparent]  bg-opacity-75 transition-opacity"
              >
                <div className="absolute w-[14rem] bg-[#030C15] rounded-[12px] h-32 flex border border-solid border-[#ffff]/20  flex-col  top-[4rem] right-2 p-4">
                  <div
                    onClick={() => navigate("/profile")}
                    className="flex items-center hover:bg-[#fff]/10 rounded-md w-full p-3"
                  >
                    <CiUser className="text-white" />
                    <p className=" ml-4 text-[.8rem] sm:text-base text-white ">
                      {" "}
                      Profile
                    </p>
                  </div>
                  <div
                    onClick={() => setOpenModal(true)}
                    className="flex items-center hover:bg-[#fff]/10 rounded-md w-full p-3"
                  >
                    <PiSignOutThin className=" text-white" />
                    <p className=" ml-4 text-[.8rem] sm:text-base text-white ">
                      {" "}
                      Sign out
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {open && (
        <div className="bg-primary-second duration-500  absolute left-0 top-0 w-[60%] h-screen">
          <div
            onClick={
              isAuthenticated
                ? () => {
                    setOpen(!open)
                    setMobileNotiModal(true)
                  }
                : () => handleLoginModal()
            }
            className="absolute left-4 top-4"
          >
            <div className="relative inline-block ">
              <FaRegBell />
              {unreadmessages.length == !0 && (
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
            </div>
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
                <div onClick={value.action} key={index}>
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
                    {value.subMenu && (
                      <FaAngleDown
                        className={`text-black ${openSubMenu && "rotate-180"} `}
                        onClick={() => setOpenSubMenu(!openSubMenu)}
                      />
                    )}
                  </NavLink>
                  {value.subMenu && openSubMenu && open && (
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
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {mobileNotiModal && <MobileNoti modal={closeNotification} />}
      {openLoginModal && <LoginModal2 modal={handleLoginModal} />}
      {accountModal && <WelcomeModal modal={handleAccModal} />}
      {openModal && (
        <SignOutModal modal={handleSignOutModal} handleSignOut={signOut} />
      )}
    </div>
  )
}

export default Header
