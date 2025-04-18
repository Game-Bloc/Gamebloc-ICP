import React, { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/dashboardComps/Sidebar"
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { Avatar, ConfigProvider, Tabs, TabsProps } from "antd"
import { useAppSelector } from "../redux/hooks"
import Copy from "../components/utils/Copy"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import { useGetAllSquad, useUpdateTournament } from "../Functions/blochooks"
import FallbackLoading from "../components/Modals/FallBackLoader"
import Squad from "../components/profileComp/Squad"
import TransferModal from "../components/Modals/TransferModal"
import ClipLoader from "react-spinners/ClipLoader"
import MyTournaments from "../components/profileComp/MyTournaments/MyTournaments"
import TransactionHistory from "../components/profileComp/Transaction/TransactionHistory"
import { useAuth } from "../Auth/use-auth-client"
import { Principal } from "@dfinity/principal"
import Stats from "../components/profileComp/stats/Stats"
import MyPointCard from "../components/profileComp/MyPointCard"
import hooks from "../Functions/hooks"
import DepositPromptModal from "../components/Modals/Deposit/DepositPromptModal"
import QrModal from "../components/Modals/Deposit/QrModal"
import NairaDepositModal from "../components/Modals/Deposit/NairaDepositModal"

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Stats`,
    children: <Stats />,
  },
  {
    key: "2",
    label: `My Tournaments`,
    children: <MyTournaments />,
  },
  {
    key: "3",
    label: `Squad`,
    children: <Squad />,
  },
  {
    key: "4",
    label: `Transaction History`,
    children: <TransactionHistory />,
  },
]

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const Profile = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [color, setColor] = useState("#ffffff")
  const [transferModal, setTransferModal] = useState<boolean>(false)
  const [promptModal, setPromptModal] = useState<boolean>(false)
  const [qrModal, setQrModal] = useState<boolean>(false)
  const [fiatModal, setFiatModal] = useState<boolean>(false)
  const username = useAppSelector((state) => state.userProfile.username)
  const principal = useAppSelector((state) => state.userProfile.principal_id)
  const _principal = Principal.fromText(principal)
  const _icp2Usd = useAppSelector((state) => state.IcpBalance.currentICPrice)
  const accountId = useAppSelector((state) => state.userProfile.account_id)
  const date = useAppSelector((state) => state.userProfile.date)
  const balance = useAppSelector((state) => state.IcpBalance.balance)
  const ngn = useAppSelector((state) => state.IcpBalance.ngnRate)
  const notification_id = useAppSelector((state) => state.IcpBalance.id)
  const squadId = useAppSelector((state) => state.userProfile.squad_badge)
  const initials = username!.substring(0, 2).toUpperCase()
  const referralCode = useAppSelector((state) => state.IcpBalance.referralCode)
  const principalID = principal
  const {
    getProfile,
    isLoadingProfile,
    updateProfile,
    fetching,
    getICPBalance,
    getTransactions,
    getNotificationId,
  } = useGameblocHooks()
  const {
    gettingCode,
    kitchenBalance,
    getUserMail,
    getNairaExchangeRate,
    getReferralCode,
  } = hooks()
  const { updateTournament } = useUpdateTournament()
  const [_date, setDate] = useState<string>("")

  const onChange = (key: string) => {
    console.log(key)
  }
  const handleModal = () => {
    setTransferModal(!transferModal)
  }
  useEffect(() => {
    if (username === "") {
      getProfile()
    } else {
      updateProfile()
    }
    getNairaExchangeRate()
    getUserMail(_principal)
    updateTournament()
    getNotificationId(_principal)
    getICPBalance()
    kitchenBalance()
    getTransactions(accountId)
    // console.log("ngn", ngn)
    // console.log("Referral state:", referralCode)
  }, [isAuthenticated])

  // console.log("icp_price", _icp2Usd)

  const handlePromptModal = () => {
    setPromptModal(!promptModal)
  }

  const handleQRModal = () => {
    setQrModal(!qrModal)
  }

  const handleFiatModal = () => {
    setFiatModal(!fiatModal)
  }

  const code = () => {
    getReferralCode(_principal)
  }

  useEffect(() => {
    if (referralCode == " " || referralCode == undefined) {
      code()
    }
  }, [isAuthenticated])

  if (isLoadingProfile) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <FallbackLoading />
      </div>
    )
  } else {
    return (
      <div className="">
        <section className="flex">
          <Header />
          <Sidebar />
          <div
            className="flex flex-col
           w-full"
          >
            <div className="m-4 mt-24">
              <div className="">
                <div className=" sm:ml-4 mt-4  flex flex-col ">
                  <h1 className="text-primary-second font-bold mt-4 text-base md:text-[1.5rem] 2xl:text-[2rem]">
                    Your profile
                  </h1>
                  <div className="flex flex-col  lg:flex-row justify-around items-center  ">
                    <div className=" flex flex-col w-full sm:w-fit justify-center  md:items-start md:justify-start  mt-8 bg-[#030C15]  p-4 rounded-[1.6rem]">
                      <div className="flex ">
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
                            {initials}
                          </Avatar>
                        </div>
                        <div className="flex  flex-col">
                          <h2 className="text-white text-bold text-base sm:text-[1.5rem]">
                            {username}
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
                                  <p className="text-[1rem] text-white mr-4">
                                    ≈
                                  </p>
                                  <p className="text-bold text-[1rem]   sm:text-[1rem]  text-[#ffffff]">
                                    ${(balance * _icp2Usd).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center">
                            <img src={`calender.svg`} className="m-0" alt="" />
                            <p className="text-bold text-[.7rem] p-[.65rem]  sm:text-[.8rem] sm:p-[.8rem] text-[#9B9B9B]">
                              Member since {date}
                            </p>
                          </div>
                          <div className="flex gap-[.6rem] lg:gap-4">
                            <button
                              onClick={() => setPromptModal(!promptModal)}
                              className="pt-[0.4rem] pb-[.4rem]  px-[.6rem]  sm:px-4 text-[.7rem] sm:text-sm hover:text-black hover:bg-primary-second/70  text-primary-second justify-center border border-solid border-primary-second/70 flex bg-transparent rounded-lg items-center cursor-pointer sm:py-2"
                            >
                              <img
                                src={`withdraw.png`}
                                className="w-6 h-6 m-0"
                                alt=""
                              />
                              <p className="font-semibold ml-2">Deposit </p>
                            </button>
                            <button
                              onClick={() => setTransferModal(!transferModal)}
                              className="pt-[0.4rem] pb-[.4rem]   px-[.6rem]  sm:px-4 text-[.7rem] sm:text-sm hover:text-black hover:bg-primary-second/70  text-primary-second justify-center border border-solid border-primary-second/70 flex bg-transparent rounded-lg items-center cursor-pointer sm:py-2"
                            >
                              <img
                                src={`deposit.png`}
                                className="w-6 h-6 m-0"
                                alt=""
                              />
                              <p className="font-semibold ml-2">Withdraw</p>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="border border-primary-second border-solid w-full mt-[1.5rem] mb-4" />

                      <div className="mt-[.5rem]  gap-6 flex flex-col lg:items-center   md:flex-row md:flex-wrap ">
                        <div className="flex flex-col justify-start">
                          <p className="text-[#E0DFBA] text-[.8rem] sm:text-base text-bold">
                            Principal I.D{" "}
                          </p>
                          <div className=" border-solid border-[#634E6D] mt-[.5rem] flex border  w-full md:w-[15rem] rounded-md">
                            <Copy textToCopy={principalID} />
                            <h2 className="text-white p-[.5rem] ml-4 text-bold text-[.8rem] sm:text-[1rem] ">
                              {principal
                                ? principal.substring(0, 7) +
                                  "......" +
                                  principal.substring(58, 64)
                                : null}
                            </h2>
                          </div>
                        </div>
                        <div className="flex flex-col justify-start">
                          <p className="text-[#E0DFBA] text-[.8rem] sm:text-base text-bold">
                            Wallet Address{" "}
                          </p>
                          <div className=" border-solid border-[#634E6D] mt-[.5rem] flex border rounded-md w-full md:w-[15rem]">
                            <Copy textToCopy={accountId} />
                            <h2 className="text-white p-[.5rem] ml-4 text-bold text-[.8rem] sm:text-[1rem]  whitespace-nowrap overflow-hidden text-ellipsis">
                              {accountId
                                ? accountId.substring(0, 7) +
                                  "......" +
                                  accountId.substring(58, 64)
                                : null}
                            </h2>
                          </div>
                        </div>

                        {squadId !== "" && (
                          <div className="flex flex-col justify-start">
                            <p className="text-[#E0DFBA] text-[.8rem] sm:text-base text-bold">
                              Squad I.D{" "}
                            </p>
                            <div className=" border-solid border-[#634E6D] mt-[.5rem] flex border rounded-md w-full md:w-[15rem]">
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
                        )}
                      </div>
                      <div className="w-full justify-center items-center">
                        {referralCode != "" ? (
                          <div className="flex flex-col justify-start mt-[1.5rem]">
                            <p className="text-[#E0DFBA] text-[.8rem] sm:text-base text-bold">
                              Referral/Unique I.D{" "}
                            </p>
                            <div className=" border-solid border-[#634E6D] mt-[.5rem] flex border rounded-md w-full md:w-[15rem]">
                              <Copy textToCopy={referralCode} />
                              <h2 className="text-white p-[.5rem] ml-4 text-bold text-[.8rem] sm:text-[1rem]  whitespace-nowrap overflow-hidden text-ellipsis">
                                {referralCode}
                              </h2>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              code()
                            }}
                            disabled={gettingCode}
                            className="pt-1 pb-[.15rem]  px-[.6rem] w-full  lg:w-[15rem] sm:px-4 text-[.85rem] sm:text-base text-black justify-center mt-8 sm:mt-[1.5rem] flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3 "
                          >
                            {gettingCode ? (
                              <div className="flex items-center  gap-2">
                                <p className="text-[0.65rem] mr-2  font-bold sm:text-[.85rem]">
                                  Wait
                                </p>
                                <ClipLoader
                                  color={color}
                                  loading={gettingCode}
                                  cssOverride={override}
                                  size={10}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
                              </div>
                            ) : (
                              <p className="font-semibold">
                                Get Referral/Unique Code
                              </p>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    <MyPointCard />
                  </div>

                  <div className="mt-[3rem] ">
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimaryActive: "#F6B8FC",
                          colorPrimary: "#F6B8FC",
                          colorPrimaryHover: "#F6B8FC",
                          colorText: "#fff",
                          colorBgContainer: "#000",
                        },
                      }}
                    >
                      <Tabs
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                      />
                    </ConfigProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {transferModal && (
          <TransferModal
            notification_id={notification_id}
            _principal={_principal}
            modal={handleModal}
          />
        )}
        {promptModal && (
          <DepositPromptModal
            handlePromptModal={handlePromptModal}
            handleQRModal={handleQRModal}
            handleFiatModal={handleFiatModal}
          />
        )}
        {qrModal && <QrModal handleQRModal={handleQRModal} />}
        {fiatModal && (
          <NairaDepositModal
            handlePromptModal={handlePromptModal}
            handleFiatModal={handleFiatModal}
          />
        )}
      </div>
    )
  }
}

export default Profile
