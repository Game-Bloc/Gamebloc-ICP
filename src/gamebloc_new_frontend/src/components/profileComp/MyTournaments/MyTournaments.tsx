import React, { useEffect, useState } from "react"
import FallbackLoading from "../../../components/Modals/FallBackLoader"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../redux/hooks"
import {
  useFetchAllTournaments,
  useUpdateTournament,
} from "../../../Functions/blochooks"
import TournamentCard from "../../../components/dashboardComps/Recommended/TournamentCard"
import ReactPaginate from "react-paginate"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

const MyTournaments = () => {
  const creatorHash = useAppSelector((state) => state.userProfile.id_hash)
  const tournament = useAppSelector((state) => state.tournamentData)
  const tour = tournament
    .filter((hash) => hash.creator_id[0] == creatorHash)
    .map((tour) => tour)
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState<number>(0)
  const tournamentPerPage: number = window.innerWidth >= 1200 ? 15 : 10
  const tournamentViewed: number = pageNumber * tournamentPerPage
  const { loading, nodata, fetchAllTournaments } = useFetchAllTournaments()
  const { updateTournament, updating } = useUpdateTournament()

  const pageCount: number = Math.ceil(tour?.length / tournamentPerPage)
  const changePage = ({ selected }: any) => {
    setPageNumber(selected)
  }
  const displayTournaments = tour
    ?.slice(tournamentViewed, tournamentViewed + tournamentPerPage)
    .map((data: any, index: any) => (
      <TournamentCard data={data} index={index} key={index} />
    ))

  console.log(
    "Tour:",
    tournament
      .filter((hash) => hash.creator_id[0] == creatorHash)
      .map((tour) => tour),
  )

  //   useEffect(() => {
  //     if (tour.length > 0) {
  //       updateTournament()
  //     } else {
  //       fetchAllTournaments()
  //     }
  //   }, [])

  if (updating) {
    //   ;
    ;<div className="w-full mt-8 h-[10vh] flex justify-center items-center">
      <FallbackLoading />
    </div>
  } else {
    return (
      <div className=" mt-8 h-full w-full">
        {tour.length == 0 ? (
          <div className="w-full flex justify-center mt-[3rem]">
            <div className="flex flex-col mb-4 ">
              <img src={`empty.svg`} alt="" />
              <p className="text-white text-[.8rem] mt-8 text-center">
                Oops! you don't have any hosted tournament, but you can host
                your first tournament in no time.
              </p>
              <div className=" flex justify-center  items-center mt-[3rem]">
                <p
                  //   onClick={() => setJoinModal(true)}
                  className="text-primary-second rounded-md pt-1 pb-[.15rem]  px-[.6rem]  sm:px-4   border border-solid sm:py-2  border-primary-second hover:text-black hover:bg-primary-second  text-[0.85rem] sm:text-sm cursor-pointer"
                >
                  Host a Tournament
                </p>
                {/* <button
                    //   onClick={() => setModal(true)}
                      className="pt-1 pb-[.15rem] ml-4  px-[.6rem]  sm:px-4 text-[.85rem] sm:text-sm text-black justify-center  flex bg-primary-second rounded-lg items-center cursor-pointer sm:py-2"
                    >
                      <p className="font-semibold">Create Squad</p>
                    </button> */}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {displayTournaments}
            </div>
            <div className="flex h-[calc(20vh-5rem)] items-end justify-end">
              {tour?.length >= 5 && (
                <ReactPaginate
                  previousLabel={
                    <div className="bg-primary-first rounded-md group hover:bg-primary-second flex justify-between items-center p-[0.3rem] cursor-pointer border-primary-second border-solid border-[1px]">
                      <MdChevronLeft className="text-primary-second group-hover:text-primary-first" />
                    </div>
                  }
                  nextLabel={
                    <div className="bg-primary-first rounded-md group hover:bg-primary-second  flex justify-between items-center p-[0.3rem] cursor-pointer border-primary-second border-solid border-[1px]">
                      <MdChevronRight className="text-primary-second group-hover:text-primary-first" />
                    </div>
                  }
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"pagBttns"}
                  activeClassName={"activeBtn"}
                />
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MyTournaments
