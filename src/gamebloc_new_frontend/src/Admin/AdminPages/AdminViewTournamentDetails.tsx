import React from "react"
import AdminHeader from "../AdminComps/AdminHeader"
import AdminSidebar from "../AdminComps/AdminSidebar"

const AdminViewTournamentDetails = () => {
  return (
    <div className="bg-[#02070E]">
      <section className="flex bg-[#02070E]">
        <AdminHeader />
        <AdminSidebar />
        <div className="flex flex-col w-full">
          <div className="m-4 ">
            <div className="ml-[17rem]">
              <div className="mt-[4rem]">
                <h1 className="text-primary-second font-[600]  text-[2rem]">
                  Tournaments
                </h1>
                <div className="mt-8">
                  <div className="flex bg-[#070C12] p-4 flex-row w-full">
                    <div className="flex flex-col">
                      <div className="flex gap-4">
                        <img src={`reloaded.svg`} alt="" />
                        <div className="flex flex-col">
                          <p className="text-[1.2rem] mb-[.5rem] font-[Oswald]">
                            Reloaded Tournament 2.0
                          </p>
                          <p className="text-[0.8rem] mb-2 text-[#E49A83]">
                            Gamebloc
                          </p>
                          <div className="flex gap-4">
                            <div className="flex px-[12px] justify-center items-center bg-[#297FFF]/15 w-[3rem]">
                              <p className="text-[.7rem] text-[#ABCCFF]">
                                Crowdfunded
                              </p>
                            </div>
                            <div className="flex px-[12px] justify-center items-center bg-[#297FFF]/15 w-[3rem]">
                              <p className="text-[.7rem] text-[#ABCCFF]">
                                Solo
                              </p>
                            </div>
                            <div className="flex px-[12px] justify-center items-center bg-[#297FFF]/15 w-[3rem]">
                              <p className="text-[.7rem] text-[#ABCCFF]">
                                Battle Royale
                              </p>
                            </div>
                            <div className="flex px-[12px] justify-center items-center bg-[#297FFF]/15 w-[3rem]">
                              <p className="text-[.7rem] text-[#ABCCFF]">
                                100 Slots
                              </p>
                            </div>
                            <div className="flex px-[12px] justify-center items-center bg-[#297FFF]/15 w-[3rem]">
                              <p className="text-[.7rem] text-[#ABCCFF]">
                                3 Winners
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default AdminViewTournamentDetails
