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

  return (
    <div className="flex fixed justify-between lg:px-4 items-center w-full h-[5rem] bg-primary-first  z-10 ">
      <div className="m-4 flex w-full justify-between items-center lg:my-4 lg:mx-0">
        <img
          onClick={() => navigate("/admin-dashboard")}
          src={`logo.png`}
          alt=""
          className="w-32 m-0  cursor-pointer "
        />

        <div className="flex gap-4">
          <div className="flex items-center">
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
    </div>
  )
}

export default AdminHeader
