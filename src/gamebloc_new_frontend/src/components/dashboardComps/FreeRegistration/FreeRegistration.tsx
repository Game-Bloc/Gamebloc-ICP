import React, { useEffect, useState } from "react";
import RecommendedCard from "../Recommended/RecommendedCard";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import ReactPaginate from "react-paginate";
import "../Recommended/Recommended.css";
import "./color.css";
import { useNavigate } from "react-router-dom";
import {
  useFetchAllTournaments,
  useUpdateTournament,
} from "../../../Functions/blochooks";
import { useAppSelector } from "../../../redux/hooks";
import FallbackLoading from "../../../components/Modals/FallBackLoader";

const FreeRegistration = () => {
  const tournament = useAppSelector((state) => state.tournamentData);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const tournamentPerPage: number = window.innerWidth >= 1200 ? 7 : 5;
  const tournamentViewed: number = pageNumber * tournamentPerPage;
  const { loading, nodata, fetchAllTournaments } = useFetchAllTournaments();
  const { updateTournament, updating } = useUpdateTournament();

  useEffect(() => {
    if (tournament.length > 0) {
      updateTournament();
    } else {
      fetchAllTournaments();
    }
  }, []);

  const pageCount: number = Math.ceil(tournament?.length / tournamentPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const displayTournaments = tournament
    ?.slice(tournamentViewed, tournamentViewed + tournamentPerPage)
    .map((data: any, index: any) => (
      <RecommendedCard data={data} index={index} key={index} />
    ));

  if (loading) {
    return (
      <div className="w-full mt-8 h-[10vh] flex justify-center items-center">
        <FallbackLoading />
      </div>
    );
  } else {
    return (
      <div>
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
          <div className="m-4">
            <div className="mt-4 flex justify-between items-center">
              <h2 className="text-sm text-white sm:text-lg my-6">
                Free Registration
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
        )}
      </div>
    );
  }
};

export default FreeRegistration;
