import React, { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import FallbackLoading from "./components/Modals/FallBackLoader"

interface Prop {
  userAuthState: boolean
}

const Redirect = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timeOut = setInterval(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timeOut)
  }, [])

  const handleLogin = () => {
    navigate("/")
  }

  return (
    <div>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <FallbackLoading />
        </div>
      ) : (
        <div className="">
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full ">
                  <div className="relative bg-primary-first w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                    <div className="bg-primary-first p-[2rem] flex flex-col justify-center items-center">
                      <div className="">
                        <img
                          src={`gamelogo.png`}
                          className="mt-3rem mb-[.3rem] w-[3rem] h-[3rem]"
                          alt=""
                        />
                      </div>
                      <h1 className="font-valorant mt-4 text-primary-second text-[1.1rem] text-semibold">
                        Sign in to gamebloc
                      </h1>
                      <p className="text-[.7rem] lg:text-[.82rem] text-center text-primary-second/80 my-[.2rem]">
                        You need to sign in first to access this page
                      </p>
                      <button
                        onClick={() => handleLogin()}
                        className="  justify-center  w-full px-6 text-[.6rem] sm:text-base text-black  mt-[0.8rem] sm:mt-[1.5rem] flex bg-primary-second hover:bg-primary-second/70 rounded-[9999px] items-center cursor-pointer py-3"
                      >
                        <p className="text-[0.65rem] font-bold sm:text-[.85rem]">
                          Homepage
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const ProtectedRoutes = ({ userAuthState }: Prop) => {
  return <Outlet />
}

export default ProtectedRoutes
