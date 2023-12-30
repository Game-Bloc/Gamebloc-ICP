import React, { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/dashboardComps/Sidebar";
import RecommendedCard from "../components/dashboardComps/Recommended/RecommendedCard";
import ReactPaginate from "react-paginate";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ActiveTournament = () => {
  const tournament = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const tournamentPerPage: number = window.innerWidth >= 1200 ? 15 : 10;
  const tournamentViewed: number = pageNumber * tournamentPerPage;

  const pageCount: number = Math.ceil(tournament?.length / tournamentPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  const displayTournaments = tournament
    ?.slice(tournamentViewed, tournamentViewed + tournamentPerPage)
    .map((data: any, index: any) => <RecommendedCard key={index} />);

  return (
    <div className="">
      <section className="flex">
        <Header />
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="m-4 mt-24  ">
            <div className="sm:ml-4">
              <h1 className="text-primary-second font-bold mt-4 text-base md:text-[1.5rem] 2xl:text-[2.5rem]">
                Active Tournaments
              </h1>
              <div className="w-full flex mt-8 justify-end">
                <button
                  onClick={() => navigate("/createtournament")}
                  className="border border-primary-second hover:text-black hover:bg-primary-second border-solid pt-1 pb-[.15rem] ml-4  px-[.6rem]  sm:px-4 text-[.7rem] text-primary-second sm:text-sm rounded-lg items-center justify-center cursor-pointer sm:py-2"
                >
                  <p className="font-semibold">Create Tournament</p>
                </button>
              </div>

              <div className=" mt-8 h-full w-full">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActiveTournament;
