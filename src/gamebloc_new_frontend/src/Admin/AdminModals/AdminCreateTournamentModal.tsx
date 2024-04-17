import React, { useEffect, useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { RiCloseFill } from "react-icons/ri"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { ulid } from "ulid"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { ConfigProvider, DatePicker, Select, theme, TimePicker } from "antd"

interface Props {
  modal: () => void
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const AdminCreateTournamentModal = () => {
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-[#fff]/20  bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full ">
              <div className="relative bg-primary-first w-[90%] md:max-w-[55%]  lg:max-w-[60%]  rounded-[12px] max-h-[45rem]  overflow-x-hidden overflow-y-scroll overflow-hidden">
                <div className="bg-primary-first py-[2rem] px-[4rem]  flex flex-col ">
                  <p className="text-[0.8rem] ml-4 mt-4 mb-[1rem] font-semibold sm:text-base  text-primary-second">
                    Game Details
                  </p>
                  <div className="flex mt-4 mx-4 flex-col">
                    <p className=" mb-4 text-sm sm:text-[.85rem] font-normal text-white">
                      Game Type
                    </p>
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
                        placeholder="Select game play mode"
                        optionFilterProp="children"
                        // onChange={handleGameTYpe}
                        // filterOption={filterOption}
                        options={[
                          {
                            value: "MP/BR Single",
                            label: "MP/BR Single",
                          },
                          {
                            value: "BR Duo",
                            label: "BR Duo",
                          },
                          {
                            value: "BR Squad",
                            label: "BR Squad",
                          },
                        ]}
                      />
                    </ConfigProvider>
                    <div className="flex-col  flex mt-3">
                      <p className="text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
                        Number of Participant
                      </p>
                      <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                        <input
                          className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                          placeholder="Participants"
                          type="text"
                          // onChange={onUserChange}
                          // value={noOfUsers}
                        />
                      </div>
                    </div>

                    <div className="my-8 border border-solid border-[#2E3438] w-full" />
                    <p className="text-[0.8rem] mt-4 mb-[1rem] font-semibold sm:text-base  text-primary-second">
                      Tournament Details
                    </p>
                    <div className="flex-col  flex mt-3">
                      <p className="text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
                        Tournament Name
                      </p>
                      <div className=" my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-primary-second  bg-[#141414] border-solid border rounded-[6px] flex">
                        <input
                          className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                          placeholder="Tournament name"
                          type="text"
                          // onChange={onTitleChange}
                          // value={title}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-8 items-center ">
                      <div className="flex flex-col w-full">
                        <p className="mb-4 text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
                          Select Tournament Type
                        </p>
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
                        </ConfigProvider>
                      </div>
                      <div className="flex flex-col w-full">
                        <p className=" mb-4 text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
                          Select Number of Winners
                        </p>
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
                        </ConfigProvider>
                      </div>
                    </div>

                    <div className="flex flex-row gap-8 mt-4 items-center ">
                      <div className="flex-col flex w-full ">
                        <p className="text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
                          {/* {tourType === "Prepaid"
                            ? " Pool Price in $"
                            : " Entry Price in $"} */}
                          Pool Price
                        </p>
                        <div className=" my-4 items-center pr-8  pl-1 border-[#595959] bg-[#141414] border-solid border rounded-[6px] flex hover:border-primary-second">
                          <input
                            className="border-none w-full h-[2rem] text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                            placeholder={
                              // tourType === "Prepaid"
                              //   ? " Pool Price ($)"
                              //   : "Entry price ($)"
                              "   Pool Price ($)"
                            }
                            type="text"
                            // onChange={
                            //   tourType === "Prepaid"
                            //     ? onPriceChange
                            //     : tourType === "Crowdfunded"
                            //     ? onEntryChange
                            //     : onEntryChange
                            // }
                            // value={
                            //   tourType === "Prepaid" ? poolPrize : entryPrice
                            // }
                          />
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <p className=" mb-4 mt-4 lg:mt-0  text-sm sm:text-[.85rem] font-normal text-white">
                          End Date
                        </p>
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
                          <DatePicker
                          // disabledDate={disabledDate}
                          // onChange={onEndDateChange}
                          />
                        </ConfigProvider>
                      </div>
                    </div>

                    <div className="flex flex-row gap-8 mt-4 items-center ">
                      <div className="flex  flex-col w-full">
                        <p className=" mb-4 text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
                          Start Time
                        </p>
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
                          <TimePicker
                            use12Hours
                            format="h:mm a"
                            // onChange={onTimeChange}
                          />
                        </ConfigProvider>
                      </div>
                      <div className="flex flex-col w-full">
                        <p className=" mb-4 text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
                          Start Date
                        </p>
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
                          <DatePicker
                          // disabledDate={disabledDate}
                          // onChange={onDateChange}
                          />
                        </ConfigProvider>
                      </div>
                    </div>

                    <div className="flex-col flex mt-4 ">
                      <p className="text-sm sm:text-[.85rem] mt-[.8rem] font-normal text-white">
                        Tournament Description and Rules
                      </p>
                      <div className=" my-4 items-center pl-2  border-[#595959] bg-[#141414] border-solid border rounded-[6px] hover:border-primary-second flex">
                        <textarea
                          className="pl-0 border-none w-full text-white focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414]"
                          placeholder="Enter tournament description and Guidelines."
                          rows={4}
                          // value={tournamentRules}
                          // onChange={onRuleChange}
                        />
                      </div>
                    </div>
                    <div className="flex w-full justify-end items-center mt-8">
                      <div className=" flex justify-between items-center">
                        <p className="text-[#303B9C]/90 hover:text-[#303B9C]  py-2 px-[.9rem] text-[0.85rem] border border-solid border-[#303B9C] sm:text-sm cursor-pointer">
                          Cancel
                        </p>
                        <button className=" ml-8   py-2 px-3  text-sm text-white justify-center hover:bg-[#303B9C]   flex bg-[#303B9C]/90 items-center cursor-pointer ">
                          <p className="font-normal">Create Tournament</p>
                        </button>
                      </div>
                    </div>
                    {/* END OF LINE */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCreateTournamentModal
