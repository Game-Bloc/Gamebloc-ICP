import React, { useState } from "react"
import { HiMenuAlt3 } from "react-icons/hi"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { MdDashboard } from "react-icons/md"
import { MdVideogameAsset } from "react-icons/md"
import { FaAngleDown } from "react-icons/fa"

const AdminSidebar = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false)
  const navigate = useNavigate()

  const menus = [
    { name: "Dashboard", link: "/admin-dashboard", icon: MdDashboard },
    {
      name: "Tournament",
      link: "/admin-tournament-view",
      icon: MdVideogameAsset,
    },
  ]

  return (
    <div
      className={` bg-[#050A11] min-h-screen sticky ${
        open ? "w-72" : "w-[4.5rem]"
      } duration-500 px-4 border-solid border-[1px] mt-[5rem] border-r-primary-second `}
    >
      {/* <div className="py-3 flex justify-end ">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer text-primary-second"
          onClick={() => setOpen(!open)}
        />
      </div> */}
      <h2
        className={`text-white text-bold text-[1.2rem] ${
          !open && "opacity-0 translate-x-10 overflow-hidden "
        } `}
      >
        Chucky Jones
      </h2>
      <p
        className={`text-bold text-[.7rem]   text-primary-second ${
          !open && "opacity-0 translate-x-10 overflow-hidden "
        } `}
      >
        Administrator
      </p>
      <div className="my-[3rem] border border-white/20 border-b-[1px] border-solid " />

      <div className="mt-8 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <div key={i} className="group">
            <div
              className="flex items-center  cursor-pointer text-sm gap-3.5 font-medium p-2 hover:bg-[#bfa9c27e] rounded-md"
              onClick={() => {
                // !menu.subMenu
                //   ? navigate(`${menu.link}`)
                //   : setOpenSubMenu(!openSubMenu)
                navigate(`${menu.link}`)
              }}
            >
              <div>
                {React.createElement(menu.icon, {
                  size: "20",
                  color: "#F6B8FC",
                })}
              </div>
              <h2
                style={{ transitionDelay: `${i + 3}00ms` }}
                className={`text-[#fff]  whitespace-pre ${
                  !open && "opacity-0 translate-x-10 overflow-hidden "
                } duration-500`}
              >
                {menu.name}
              </h2>
              <h2
                style={{ color: "#fff" }}
                className={` ${
                  open && "hidden "
                } absolute left-48 bg-[#bfa9c27e] font-semibold whitespace-pre text-[#ffffff], rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-[3.8rem] group-hover:duration-300 group-hover:w-fit `}
              >
                {menu.name}
              </h2>
              {/* {menu.subMenu && (
                <FaAngleDown
                  className={`flex justify-end text-white ${
                    openSubMenu && "rotate-180"
                  } `}
                />
              )} */}
            </div>
            {/* {menu.subMenu && openSubMenu && open && (
              <ul className="flex flex-col ml-[3rem] z-50  rounded-md ">
                {menu.subMenu.map((value, index) => (
                  <NavLink
                    to={value.link}
                    key={index}
                    className={({ isActive }) =>
                      isActive
                        ? "my-2 hover:bg-[#bfa9c27e] z-50 rounded-md p-2  text-white text-sm flex font-bold  items-center"
                        : "my-2 hover:bg-[#bfa9c27e] z-50 rounded-md p-2 text-white text-sm flex font-bold items-center"
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
  )
}

export default AdminSidebar
