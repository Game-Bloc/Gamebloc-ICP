import React from "react"
import Sidebar from "../components/dashboardComps/Sidebar"
import Header from "../components/Header/Header"
import WinnersBoard from "../components/Result/WinnersBoard"
import ResultTable from "../components/Result/ResultTable"

import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"

const ViewResult = () => {
  const navigate = useNavigate()

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
                <div
                  onClick={() => navigate(-1)}
                  className="flex  items-center cursor-pointer"
                >
                  <IoIosArrowRoundBack className="text-primary-second" />
                  <p className="text-primary-second ml-2 text-[0.8rem]">Back</p>
                </div>
                <WinnersBoard />
                <ResultTable />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ViewResult
