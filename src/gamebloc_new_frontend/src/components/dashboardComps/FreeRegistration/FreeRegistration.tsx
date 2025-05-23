import React, { useEffect, useState } from "react"
import RecommendedCard from "../Recommended/RecommendedCard"
import { MdChevronLeft } from "react-icons/md"
import { MdChevronRight } from "react-icons/md"
import ReactPaginate from "react-paginate"
import "../Recommended/Recommended.css"
import "./color.css"
import { useNavigate } from "react-router-dom"
import {
  useFetchAllTournaments,
  useUpdateTournament,
} from "../../../Functions/blochooks"
import { useAppSelector } from "../../../redux/hooks"
import Loader from "../../../components/Modals/Loader"
import { useAuth } from "../../../Auth/use-auth-client"
import LoginModal from "../../../components/Modals/LoginModal"
import WelcomeModal from "../../../components/Modals/WelcomeModal"
import LoginModal2 from "../../../components/Modals/LoginModal2"

const FreeRegistration = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const noTournamentData = sessionStorage.getItem("noTournament")
  const tournament = useAppSelector((state) => state.tournamentData)
  const [pageNumber, setPageNumber] = useState<number>(0)
  const tournamentPerPage: number = window.innerWidth > 1440 ? 10 : 6
  const tournamentViewed: number = pageNumber * tournamentPerPage
  const { loading, nodata, fetchAllTournaments } = useFetchAllTournaments()
  const { updateTournament, updating } = useUpdateTournament()
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const [accountModal, setAccountModal] = useState<boolean>(false)

  useEffect(() => {
    // const intervalId = setInterval(() => {
    if (tournament.length > 0) {
      updateTournament()
    } else {
      fetchAllTournaments()
    }
    // }, 2000)

    // Clean up the interval on component unmount
    // return () => clearInterval(intervalId)
  }, [isAuthenticated])

  const handleLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }
  const handleAccModal = () => {
    setAccountModal(!accountModal)
  }
  const newTournament = tournament
    .filter(
      (tour: any) =>
        Object.keys(tour.status)[0].toUpperCase() === "ACCEPTINGPLAYERS" ||
        Object.keys(tour.status)[0].toUpperCase() === "GAMEINPROGRESS",
    )
    .map((tour: any) => tour)

  const pageCount: number = Math.ceil(tournament?.length / tournamentPerPage)
  const changePage = ({ selected }: any) => {
    setPageNumber(selected)
  }
  // console.log("active-tour", newTournament)

  const displayTournaments = newTournament
    ?.slice(tournamentViewed, tournamentViewed + tournamentPerPage)
    .map((data: any, index: any) => (
      <RecommendedCard data={data} index={index} key={index} />
    ))

  if (loading) {
    return (
      <div className="w-full mt-8 h-[10vh] flex justify-center items-center">
        <Loader />
      </div>
    )
  } else {
    return (
      <div>
        {newTournament.length === 0 ? (
          <div className="w-full flex flex-col justify-center mt-20 bg-[#040D17] p-8 items-center rounded-[1.5rem] h-[15rem]">
            <h2 className="font-valorant text-sm text-center sm:text-lg md:text-xl text-white">
              No active tournament yet !
            </h2>
            <p className=" mb-4 mt-4 text-[0.7rem] text-center text-white xl:text-[1rem] ">
              {" "}
              Create a tournament
            </p>

            <button
              onClick={
                !isAuthenticated
                  ? () => handleLoginModal()
                  : () => navigate("/game-category")
              }
              className="glowing-btn w-[10rem] text-[.8rem] md:text-base md:w-[15rem]"
            >
              <span className="glowing-txt text-[.8rem] md:text-base">
                Create <span> </span>
                <span className="faulty-letter text-[.8rem] md:text-base">
                  T
                </span>
                ournament
              </span>
            </button>
          </div>
        ) : (
          <div className="m-4">
            <div className="mt-4 flex justify-between items-center">
              <h2 className="text-sm text-white sm:text-lg my-6">
                Active Tournament
              </h2>

              <div className="flex justify-center items-center gap-4">
                {tournament?.length >= 2 && (
                  <ReactPaginate
                    previousLabel={
                      <div className="bg-primary-first rounded-md group hover:bg-primary-second hidden sm:flex justify-between items-center p-[0.3rem] cursor-pointer border-primary-second border-solid border-[1px]">
                        <MdChevronLeft className="text-primary-second group-hover:text-primary-first" />
                      </div>
                    }
                    nextLabel={
                      <div className="bg-primary-first rounded-md group hover:bg-primary-second ml-4 hidden sm:flex justify-between items-center p-[0.3rem] cursor-pointer border-primary-second border-solid border-[1px]">
                        <MdChevronRight className="text-primary-second group-hover:text-primary-first" />
                      </div>
                    }
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    activeClassName={"activeBttn"}
                  />
                )}

                {/* <div
                  onClick={() => navigate("/active-tournament")}
                  className="py-[0.4rem] h-fit px-[1rem] bg-primary-first hover:bg-primary-second hover:text-primary-first text-primary-second justify-center rounded-md text-sm  items-center cursor-pointer border-primary-second border-solid border-[1px]"
                >
                  See All
                </div> */}
              </div>
            </div>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {displayTournaments}
            </div>
          </div>
        )}
        {openLoginModal && <LoginModal2 modal={handleLoginModal} />}
        {accountModal && <WelcomeModal modal={handleAccModal} />}
      </div>
    )
  }
}

export default FreeRegistration
