import React from "react"
import { useAppSelector } from "../../redux/hooks"
import AdminHeader from "../AdminComps/AdminHeader"
import AdminSidebar from "../AdminComps/AdminSidebar"
import { useNavigate } from "react-router-dom"
import HubFunctions from "../AdminComps/AdminHub/HubFunctions"

const AdminHub = () => {
  const navigate = useNavigate()
  const isMod = useAppSelector((state) => state.userProfile.role)
  return (
    <div className="bg-[#02070E]">
      <section className="flex bg-[#02070E]">
        <AdminHeader />
        <AdminSidebar />
        <div className="flex flex-col w-full">
          <div className="m-4 ">
            <div className="ml-[17rem]">
              <div className="mt-[4rem]">
                {Object.keys(isMod[0])[0] !== "Mod" ? (
                  <div className="">
                    <div
                      className="relative z-10"
                      aria-labelledby="modal-title"
                      role="dialog"
                      aria-modal="true"
                    >
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                          <div className="flex items-center justify-center min-h-full ">
                            <div className="relative bg-primary-first w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                              <div className="bg-primary-first p-[2rem] flex flex-col justify-center items-center">
                                <div className="">
                                  <img
                                    src={`gamelogo.png`}
                                    className="mt-3rem mb-[.3rem] w-[3rem] h-[3rem]"
                                    alt=""
                                  />
                                </div>
                                <h1 className="font-valorant mt-4 text-primary-second text-[1.1rem] text-semibold">
                                  No Access !!!
                                </h1>
                                <p className="text-[.7rem] lg:text-[.82rem] text-center text-primary-second/80 my-[.2rem]">
                                  Only an administrator has access to this page
                                </p>
                                <button
                                  onClick={() => navigate("/admin-dashboard")}
                                  className="  justify-center  w-full px-6 text-[.6rem] sm:text-base text-black  mt-[0.8rem] sm:mt-[1.5rem] flex bg-primary-second hover:bg-primary-second/70 rounded-[9999px] items-center cursor-pointer py-3"
                                >
                                  <p className="text-[0.65rem] font-bold sm:text-[.85rem]">
                                    Admin Dashboard
                                  </p>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-primary-second font-[600]  text-[2rem]">
                      Admin Control Panel
                    </h1>
                    {/* ADMIN FUNCTIONS */}
                    <div className="mt-8">
                      <HubFunctions />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminHub
