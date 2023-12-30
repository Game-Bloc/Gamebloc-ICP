import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/dashboardComps/Sidebar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Select, DatePicker, TimePicker } from "antd";
import { useNavigate } from "react-router-dom";

const CreateTournament = () => {
  const navigate = useNavigate();

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
                  <div className="border-solid border border-[#2E3438] rounded-[0.625rem]">
                    <img
                      src={`gamepad.png`}
                      alt=""
                      className="rounded-[0.625rem]"
                    />
                  </div>
                  <div className="border-solid border mt-8  border-[#2E3438] rounded-[0.625rem]">
                    <div className="flex justify-between my-[.9rem] mx-4 items-center">
                      <p className=" text-[0.7rem] font-semibold sm:text-base  text-white ">
                        Host Tournament
                      </p>
                      <div className="flex flex-wrap justify-end items-center gap-4">
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
                  <p className="text-[0.8rem] ml-4 mt-4 mb-[1.5rem] font-semibold sm:text-base  text-white">
                    Create Tournament Details
                  </p>
                  <div className="my-4 border border-solid border-[#2E3438] w-full" />

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center m-4 ">
                    <div className="flex mt-4 flex-col">
                      <p className=" mb-4 text-sm sm:text-base font-normal text-white">
                        Select Tournament Type
                      </p>
                      <Select
                        placeholder="Tournament Type"
                        optionFilterProp="children"
                        // onChange={handleTournamentTypeChange}
                        // filterOption={filterOption1}
                        options={[
                          {
                            value: "Crowdfunded",
                            label: "Crowdfunded",
                          },
                          {
                            value: "Prepaid",
                            label: "Prepaid",
                          },
                        ]}
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className=" mb-4 text-sm mt-4 lg:mt-0 sm:text-base font-normal text-white">
                        Select Number of Winners
                      </p>
                      <Select
                        placeholder="Select number of Winners"
                        optionFilterProp="children"
                        // onChange={handleWinnersChange}
                        // filterOption={filterOption}
                        options={[
                          {
                            value: "1",
                            label: "1",
                          },
                          {
                            value: "2",
                            label: "2",
                          },
                          {
                            value: "3",
                            label: "3",
                          },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="flex  flex-col sm:flex-row sm:justify-between mt-4 sm:items-center m-4 ">
                    <div className="flex mt-4 flex-col">
                      <p className=" mb-4 text-sm sm:text-base font-normal text-white">
                        Set Time
                      </p>
                      <TimePicker
                        use12Hours
                        format="h:mm a"
                        // onChange={onTimeChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className=" mb-4 mt-4 lg:mt-0  text-sm sm:text-base font-normal text-white">
                        Set Date
                      </p>
                      <DatePicker
                      // disabledDate={disabledDate}
                      // onChange={onDateChange}
                      />
                    </div>
                  </div>

                  <div className="flex-col flex m-4 ">
                    <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                      Game Name
                    </p>
                    <div className=" my-4 items-center pr-8 h-[2.7rem] pl-[0.5rem] border-white border-solid border rounded-lg flex">
                      <input
                        className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-white appearance-none text-[0.9rem] bg-[transparent]"
                        placeholder="Name of game"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex-col flex m-4 ">
                    <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                      Entry Price
                    </p>
                    <div className=" my-4 items-center pr-8 h-[2.7rem] pl-[0.5rem] border-white border-solid border rounded-lg flex">
                      <input
                        className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-white appearance-none text-[0.9rem] bg-[transparent]"
                        placeholder="Name of game"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex-col flex m-4 ">
                    <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                      Number of Participant
                    </p>
                    <div className=" my-4 items-center pr-8 h-[2.7rem] pl-[0.5rem] border-white border-solid border rounded-lg flex">
                      <input
                        className="border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-white appearance-none text-[0.9rem] bg-[transparent]"
                        placeholder="Name of game"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex-col flex m-4 ">
                    <p className="text-sm sm:text-base mt-[.8rem] font-normal text-white">
                      Describe Tournament Rules/Guidelines
                    </p>
                    <div className=" my-4 items-center pt-4 pl-4 border-white border-solid border rounded-lg flex">
                      <textarea
                        className="r border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-white appearance-none text-[0.9rem] bg-[transparent]"
                        placeholder="Name of game"
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="mt-4 mx-4 lg:mx-0 mb-4 flex justify-center items-center">
                    <button className="pt-1 pb-[.15rem]  px-[.6rem] w-full lg:w-[15rem] sm:px-4 text-[.7rem] sm:text-base text-black justify-center mt-[0.7rem] sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3">
                      <p className="font-semibold">Create Tournament</p>
                    </button>
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

export default CreateTournament;
