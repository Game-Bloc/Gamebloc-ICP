import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/dashboardComps/Sidebar";
import ReactPaginate from "react-paginate";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TournamentCard from "../components/dashboardComps/Recommended/TournamentCard";
import { useAppSelector } from "../redux/hooks";
import {
  useFetchAllTournaments,
  useUpdateTournament,
} from "../Functions/blochooks";
import FallbackLoading from "../components/Modals/FallBackLoader";

const ActiveTournament = () => {
  const tournament = useAppSelector((state) => state.tournamentData);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const tournamentPerPage: number = window.innerWidth >= 1200 ? 15 : 10;
  const tournamentViewed: number = pageNumber * tournamentPerPage;
  const { loading, nodata, fetchAllTournaments } = useFetchAllTournaments();
  const { updateTournament, updating } = useUpdateTournament();

  const pageCount: number = Math.ceil(tournament?.length / tournamentPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  const displayTournaments = tournament
    ?.slice(tournamentViewed, tournamentViewed + tournamentPerPage)
    .map((data: any, index: any) => (
      <TournamentCard data={data} index={index} key={index} />
    ));

  useEffect(() => {
    if (tournament.length > 0) {
      updateTournament();
    } else {
      fetchAllTournaments();
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full mt-8 h-screen flex justify-center items-center">
        <FallbackLoading />
      </div>
    );
  } else {
    return (
      <div className="">
        <section className="flex">
          <Header />
          <Sidebar />
          <div className="flex flex-col w-full">
            <div className="m-4 mt-24  ">
              <div className="sm:ml-4">
                <h1 className="text-primary-second font-bold mt-4 text-base md:text-[1.5rem] 2xl:text-[2rem]">
                  Active Tournaments
                </h1>
                <div className="w-full flex mt-8 justify-end">
                  <button
                    onClick={() => navigate("/game-category")}
                    className="border border-primary-second hover:text-black hover:bg-primary-second border-solid pt-1 pb-[.15rem] ml-4  px-[.6rem]  sm:px-4 text-[.7rem] text-primary-second sm:text-sm rounded-lg items-center justify-center cursor-pointer sm:py-2"
                  >
                    <p className="font-semibold">Create Tournament</p>
                  </button>
                </div>

                <div className=" mt-8 h-full w-full">
                  {nodata ? (
                    <div className="w-full flex flex-col justify-center mt-20 bg-[#040D17] p-8 items-center rounded-[1.5rem] h-[15rem]">
                      <h2 className="font-valorant text-sm text-center sm:text-lg md:text-xl text-white">
                        There is not active tournament yet !
                      </h2>
                      <p className=" mb-4 mt-4 text-[0.7rem] text-center text-white xl:text-[1rem] ">
                        {" "}
                        Be the First to create a tournamnent
                      </p>

                      <button
                        onClick={() => navigate("/game-category")}
                        className="glowing-btn w-[10rem] text-[.8rem] md:text-base md:w-[15rem]"
                      >
                        <span className="glowing-txt text-[.8rem] md:text-base">
                          Create
                          <span className="faulty-letter text-[.8rem] md:text-base">
                            T
                          </span>
                          ournament
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                        {displayTournaments}
                      </div>
                      <div className="flex h-[calc(20vh-5rem)] items-end justify-end">
                        {tournament?.length >= 5 && (
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
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default ActiveTournament;