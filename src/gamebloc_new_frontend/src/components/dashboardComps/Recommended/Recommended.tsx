import React, { useState } from "react";
import RecommendedCard from "./RecommendedCard";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import ReactPaginate from "react-paginate";
import "./Recommended.css";
import { useNavigate } from "react-router-dom";

const Recommended = () => {
  const navigate = useNavigate();
  const tournament = [1, 2, 3, 4, 5, 6, 7, 8];
  const [pageNumber, setPageNumber] = useState<number>(0);
  const tournamentPerPage: number = window.innerWidth >= 1200 ? 7 : 5;
  const tournamentViewed: number = pageNumber * tournamentPerPage;

  const pageCount: number = Math.ceil(tournament?.length / tournamentPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const displayTournaments = tournament
    ?.slice(tournamentViewed, tournamentViewed + tournamentPerPage)
    .map((data: any, index: any) => (
      <RecommendedCard data={data} index={index} key={index} />
    ));

  return (
    <div className="m-4">
      <div className="mt-4 flex justify-between items-center">
        <h2 className="text-sm text-white sm:text-lg my-6">Recommended</h2>

        <div className="flex justify-center items-center gap-4">
          {tournament?.length >= 2 && (
            <ReactPaginate
              previousLabel={
                <div className="bg-primary-first rounded-md group hover:bg-primary-second hidden sm:flex justify-between items-center p-[0.3rem] cursor-pointer border-primary-second border-solid border-[1px]">
                  <MdChevronLeft className="text-primary-second group-hover:text-primary-first" />
                </div>
              }
              nextLabel={
                <div className="bg-primary-first rounded-md group hover:bg-primary-second  hidden sm:flex justify-between items-center p-[0.3rem] cursor-pointer border-primary-second border-solid border-[1px]">
                  <MdChevronRight className="text-primary-second group-hover:text-primary-first" />
                </div>
              }
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              activeClassName={"activeBttn"}
            />
          )}

          <div
            onClick={() => navigate("/active-tournament")}
            className="py-[0.4rem] h-fit px-[1rem] bg-primary-first hover:bg-primary-second hover:text-primary-first text-primary-second justify-center rounded-md text-sm  items-center cursor-pointer border-primary-second border-solid border-[1px]"
          >
            See All
          </div>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {displayTournaments}
      </div>
    </div>
  );
};

export default Recommended;
