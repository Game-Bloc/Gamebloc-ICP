import React, { useEffect, useState } from "react"
import { TableColumnsType, Table, ConfigProvider, theme } from "antd"
import AdminHeader from "../AdminComps/AdminHeader"
import AdminSidebar from "../AdminComps/AdminSidebar"
import { Avatar } from "antd"
import hooks from "../../Functions/hooks"
import ClipLoader from "react-spinners/ClipLoader"
import { useAppSelector } from "../../redux/hooks"
import Copy from "../../components/utils/Copy"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const AdminProfile = () => {
  const [color, setColor] = useState("#ffffff")
  const { fetching, kitchenBalance, getAdminTransaction } = hooks()
  const dataState = useAppSelector((state) => state.adminTransaction)
  const balance = useAppSelector((state) => state.IcpBalance.kitchenBalance)
  const _icp2Usd = useAppSelector((state) => state.IcpBalance.currentICPrice)
  const admin_id = useAppSelector((state) => state.adminProfile.account_id)
  console.log("admin ui id", admin_id)
  useEffect(() => {
    kitchenBalance()
    getAdminTransaction()
  }, [])

  const columns: TableColumnsType<any> = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div key={record.id} className="flex items-center">
          <img
            src={
              record.action == "sent"
                ? `send.png`
                : record.action == "received"
                ? `dollar-coins.png`
                : `approve.png`
            }
            className="w-[1.5rem] m-0 h-[1.5rem]"
            alt=""
          />

          <div className="ml-[.5rem] flex flex-col">
            <p className="text-[.7rem] font-semibold ">{record.action}</p>
            {/* <p className=" text-[.7rem]">{record.username}</p> */}
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <p
          className={` whitespace-nowrap ${
            record.action === "received"
              ? "text-[#3be58c]"
              : record.action === "sent"
              ? "text-[#e04438]"
              : "text-[#B88217]"
          } text-[.7rem] text-nowrap`}
        >
          {record.action === "received"
            ? `+${record.amount}`
            : record.action === "sent"
            ? `-${record.amount}`
            : `${record.amount}`}
          <span></span> ICP
        </p>
      ),
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text, record) => (
        <p className=" whitespace-nowrap text-[.7rem]">
          {" "}
          {record.from
            ? record.from.substring(0, 7) +
              "......" +
              record.from.substring(58, 64)
            : ""}
        </p>
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (text, record) => (
        <p className=" whitespace-nowrap text-[.7rem]">
          {" "}
          {record.to
            ? record.to.substring(0, 7) + "......" + record.to.substring(58, 64)
            : ""}
        </p>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <p className="whitespace-nowrap text-[.7rem] text-nowrap">
          {record.date}
        </p>
      ),
    },
  ]

  return (
    <div className="bg-[#02070E]">
      <section className="flex bg-[#02070E]">
        <AdminHeader />
        <AdminSidebar />
        <div className="flex flex-col w-full">
          <div className="m-4 ">
            <div className="lg:ml-[17rem]">
              <div className="mt-[4rem]">
                <h1 className="text-primary-second font-[600]  text-base lg:text-[2rem]">
                  Kitchen Profile
                </h1>
                <div className="flex flex-col  lg:flex-row justify-start items-center ">
                  <div className=" flex flex-col w-full sm:w-fit justify-center  md:items-start md:justify-start  mt-8 bg-[#030C15]  p-4 rounded-[1.6rem]">
                    <div className="flex">
                      <div className="mr-4 lg:mr-[3rem]">
                        <Avatar
                          style={{
                            backgroundColor: "#f6b8fc",
                            color: "#01070E",
                            fontSize:
                              window.innerWidth >= 1200 ? "1.2rem" : ".8rem",
                          }}
                          size={window.innerWidth >= 1200 ? 80 : 50}
                        >
                          KI
                        </Avatar>
                      </div>
                      <div className="flex  flex-col">
                        <h2 className="text-white text-bold text-base sm:text-[1.5rem]">
                          Kitchen
                        </h2>
                        <div className="flex items-center  mt-2">
                          {fetching ? (
                            <div>
                              <ClipLoader
                                color={color}
                                loading={fetching}
                                cssOverride={override}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-row gap-4">
                              <div className="flex flex-row">
                                <p className="text-bold text-[1rem] mr-1  sm:text-[1rem]  text-[#ffffff]">
                                  {balance}
                                </p>
                                <img
                                  src={`Icp.svg`}
                                  className="w-6 h-6 m-0"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-row">
                                <p className="text-[1rem] text-white mr-4">≈</p>
                                <p className="text-bold text-[1rem]   sm:text-[1rem]  text-[#ffffff]">
                                  ${(balance * _icp2Usd).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* <div className="flex items-center">
                            <img src={`calender.svg`} className="m-0" alt="" />
                            <p className="text-bold text-[.7rem] p-[.65rem]  sm:text-[.8rem] sm:p-[.8rem] text-[#9B9B9B]">
                              Member since {date}
                            </p>
                          </div> */}

                        {/* <button
                            onClick={() => setTransferModal(!transferModal)}
                            className="pt-1 pb-[.25rem]  px-[.6rem]  sm:px-4 text-[.7rem] sm:text-sm hover:text-black hover:bg-primary-second/70  text-primary-second justify-center border border-solid border-primary-second/70 flex bg-transparent rounded-lg items-center cursor-pointer sm:py-2"
                          >
                            <p className="font-semibold mr-2">Send </p>
                            <img
                              src={`Icp.svg`}
                              className="w-6 h-6 m-0"
                              alt=""
                            />
                          </button> */}
                      </div>
                    </div>

                    <div className=" border-t-[1px] border-primary-second border-solid w-full mt-[1.5rem] mb-4" />

                    <div className="mt-[.5rem]  gap-6 flex flex-col  md:flex-row md:flex-wrap ">
                      {/* <div className="flex flex-col justify-start">
                          <p className="text-[#E0DFBA] text-[.8rem] sm:text-base text-bold">
                            Principal I.D{" "}
                          </p>
                          <div className=" border-solid border-[#634E6D] mt-[.5rem] flex border  w-[12rem] md:w-[15rem] rounded-md">
                            <Copy textToCopy={principalID} />
                            <h2 className="text-white p-[.5rem] ml-4 text-bold text-[.8rem] sm:text-[1rem] ">
                              {principal
                                ? principal.substring(0, 7) +
                                  "......" +
                                  principal.substring(58, 64)
                                : null}
                            </h2>
                          </div>
                        </div> */}
                      <div className="flex flex-col justify-start">
                        <p className="text-[#E0DFBA] text-[.8rem] sm:text-base text-bold">
                          Wallet Address{" "}
                        </p>
                        <div className=" border-solid border-[#634E6D] mt-[.5rem] flex border rounded-md w-[12rem] md:w-[15rem]">
                          <Copy textToCopy={admin_id} />
                          <h2 className="text-white p-[.5rem] ml-4 text-bold text-[.8rem] sm:text-[1rem]  whitespace-nowrap overflow-hidden text-ellipsis">
                            {admin_id
                              ? admin_id.substring(0, 7) +
                                "......" +
                                admin_id.substring(58, 64)
                              : null}
                          </h2>
                        </div>
                      </div>

                      {/* {squadId !== "" && (
                          <div className="flex flex-col justify-start">
                            <p className="text-[#E0DFBA] text-[.8rem] sm:text-base text-bold">
                              Squad I.D{" "}
                            </p>
                            <div className=" border-solid border-[#634E6D] mt-[.5rem] flex border rounded-md w-[12rem] md:w-[15rem]">
                              <Copy textToCopy={squadId} />
                              <h2 className="text-white p-[.5rem] ml-4 text-bold text-[.8rem] sm:text-[1rem]  whitespace-nowrap overflow-hidden text-ellipsis">
                                {squadId
                                  ? squadId.substring(0, 5) +
                                    "......" +
                                    squadId.substring(20, 26)
                                  : null}
                              </h2>
                            </div>
                          </div>
                        )} */}
                    </div>
                  </div>
                </div>
                {/* TRANSACTIONS TAB*/}
                <div className="mt-8">
                  <ConfigProvider
                    theme={{
                      algorithm: theme.defaultAlgorithm,
                      token: {
                        colorBgContainer: "#030C15",
                        colorBorder: "#595959",
                        colorSplit: "#595959",
                        controlItemBgActive: "#f6b8fc86",
                        colorText: "#fff",
                      },
                    }}
                  >
                    <Table
                      rowClassName={() => "rowClassName1"}
                      columns={columns}
                      dataSource={dataState}
                      scroll={{ x: true }}
                      rowKey="id"
                    />
                  </ConfigProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminProfile
