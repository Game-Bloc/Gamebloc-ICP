import React, { useEffect, useState } from "react"
import Sidebar from "../components/dashboardComps/Sidebar"
import Header from "../components/Header/Header"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useAuth } from "../Auth/use-auth-client"
import { useNavigate } from "react-router-dom"
import { useFetchAllTournaments } from "../Functions/blochooks"
import RecommendedCard from "../components/dashboardComps/Recommended/RecommendedCard"
import ReactPaginate from "react-paginate"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

const Series = () => {
  const tournament = useAppSelector((state) => state.tournamentData)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const [accountModal, setAccountModal] = useState<boolean>(false)

  const crowdfundedTournament = tournament?.filter((list: any) => {
    return list.title.includes("Nova") || list.title.includes("nova")
  })

  const [pageNumber, setPageNumber] = useState<number>(0)
  const [nodata, setNodata] = useState<boolean>(false)
  const tournamentPerPage: number = window.innerWidth >= 1200 ? 15 : 10
  const tournamentViewed: number = pageNumber * tournamentPerPage
  const { loading } = useFetchAllTournaments()

  const pageCount: number = Math.ceil(
    crowdfundedTournament?.length / tournamentPerPage,
  )
  const changePage = ({ selected }: any) => {
    setPageNumber(selected)
  }
  const displayTournaments = crowdfundedTournament
    ?.slice(tournamentViewed, tournamentViewed + tournamentPerPage)
    .map((data: any, index: any) => (
      <RecommendedCard data={data} index={index} key={index} />
    ))

  console.log(tournament)

  useEffect(() => {
    if (crowdfundedTournament.length === 0) {
      setNodata(true)
    } else {
      setNodata(false)
    }
  }, [crowdfundedTournament])

  const handleLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }
  const handleAccModal = () => {
    setAccountModal(!accountModal)
  }
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
                  Super-Nova Codm Series
                </h1>
                <div className="mt-[2rem]">
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                    {displayTournaments}
                  </div>
                  <div className="flex h-[calc(20vh-5rem)] items-end justify-end">
                    {crowdfundedTournament?.length >= 5 && (
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Series
