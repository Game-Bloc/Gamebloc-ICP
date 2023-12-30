import React from "react";
import Header from "../../components/Header/Header";
import AdminSidebar from "../AdminComps/AdminSidebar";
import AdminTabBar from "../AdminComps/AdminTabBar";

const Admin = () => {
  return (
    <div className="">
      <section className="flex ">
        <Header />
        <AdminSidebar />
        <div className="flex flex-col w-full">
          <div className="m-4 mt-24">
            <div className="ml-4">
              <h1 className="text-primary-second font-bold mt-4  text-[2.5rem]">
                Tournaments
              </h1>

              <div className="flex flex-col w-full mt-[3rem]">
                <h2 className="text-white mb-[2rem] text-semibold text-[1.7rem]">
                  Overview
                </h2>
                <div className="grid grid-cols-3 gap-4 2xl:grid-cols-4 2xl:gap-8">
                  <div className="border flex justify-between   border-primary-second border-solid rounded-2xl p-[1rem] w-[18rem] h-[6rem] ">
                    <div className="flex flex-col  items-start">
                      <p className="text-white font-[Oswald] text-[1rem]">
                        Concluded Tournaments
                      </p>
                      <p className="text-white mt-[.4rem]  text-[1.5rem]">
                        701
                      </p>
                    </div>
                    <img
                      src={`carbon_task.svg`}
                      className="m-0 h-8 w-8"
                      alt=""
                    />
                  </div>
                  <div className="border flex justify-between   border-primary-second border-solid rounded-2xl p-[1rem] w-[18rem] h-[6rem] ">
                    <div className="flex flex-col  items-start">
                      <p className="text-white font-[Oswald] text-[1rem]">
                        Ongoing Tournaments
                      </p>
                      <p className="text-white mt-[.4rem]  text-[1.5rem]">83</p>
                    </div>
                    <img
                      src={`carbon_continue.svg`}
                      className="m-0 h-8 w-8"
                      alt=""
                    />
                  </div>
                  <div className="border flex justify-between   border-primary-second border-solid rounded-2xl p-[1rem] w-[18rem] h-[6rem] ">
                    <div className="flex flex-col  items-start">
                      <p className="text-white font-[Oswald] text-[1rem]">
                        New Tournaments
                      </p>
                      <p className="text-white mt-[.4rem]  text-[1.5rem]">9</p>
                    </div>
                    <img src={`new.svg`} className="m-0 h-8 w-8" alt="" />
                  </div>
                  <div className="border flex justify-between   border-primary-second border-solid rounded-2xl p-[1rem] w-[18rem] h-[6rem] ">
                    <div className="flex flex-col  items-start">
                      <p className="text-white font-[Oswald] text-[1rem]">
                        Pending Tournaments
                      </p>
                      <p className="text-white mt-[.4rem]  text-[1.5rem]">12</p>
                    </div>
                    <img src={`pending.svg`} className="m-0 h-8 w-8" alt="" />
                  </div>
                </div>

                <div className="mt-[5rem]">
                  <h2 className="text-white mb-[2rem] text-semibold text-[1.7rem]">
                    Tournaments
                  </h2>
                  <div className="">
                    <AdminTabBar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
