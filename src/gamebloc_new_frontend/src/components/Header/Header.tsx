import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdVideogameAsset } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { Avatar } from "antd";
import { useAppSelector } from "../../redux/hooks";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
  const username = useAppSelector((state) => state.userProfile.username);
  const initials = username!.substring(0, 2).toUpperCase();

  const menus = [
    { name: "Overview", link: "/dashboard", icon: MdDashboard },
    {
      name: "Tournament",
      link: "/dashboard",
      icon: MdVideogameAsset,
      subMenu: [
        { name: "Prepaid", link: "/dashboard" },
        { name: "CrowdFunded", link: "/dashboard" },
      ],
    },
  ];

  return (
    <div className="flex fixed justify-between lg:px-4 items-center w-full h-[5rem] bg-primary-first border-solid border-b-4 border-[#f6b8fc13] z-10 ">
      <div className="m-4 flex w-full justify-between items-center lg:my-4 lg:mx-0">
        <img src={`logo.png`} alt="" className="w-32 m-0 hidden lg:block" />
        <IoMenu
          className="text-primary-second block lg:hidden"
          onClick={() => setOpen(!open)}
        />
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center cursor-pointer rounded-[9999px] bg-[#fff]/10"
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
      </div>
      {open && (
        <div className="bg-primary-second duration-500  absolute left-0 top-0 w-[60%] h-screen">
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
    </div>
  );
};

export default Header;
