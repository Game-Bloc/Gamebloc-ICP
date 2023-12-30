import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { useAuth } from "../../Auth/use-auth-client";

interface Props {
  modal: () => void;
}

const LoginModal = ({ modal }: Props) => {
  const { login, loginNFID } = useAuth();

  return (
    <div>
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
                  <RiCloseFill
                    onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
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
                    The future of next gen Web3 gaming at your finger tips
                  </p>
                  <button
                    onClick={() => {
                      modal();
                      login();
                    }}
                    className="  justify-center  w-full px-6 text-[.6rem] sm:text-base text-black  mt-[0.8rem] sm:mt-[1.5rem] flex bg-primary-second hover:bg-primary-second/70 rounded-[9999px] items-center cursor-pointer py-3"
                  >
                    <img
                      src={`internet-computer-logo.png`}
                      alt=""
                      className="m-0 w-[.75rem] sm:w-6"
                    />
                    <p className="text-[0.65rem] ml-4  font-bold sm:text-[.85rem]">
                      Sign in with Internet Identity
                    </p>
                  </button>
                  <button
                    onClick={() => {
                      modal();
                      loginNFID();
                    }}
                    className="   justify-center w-full px-6 text-[.6rem] sm:text-base text-black mt-[0.8rem]  sm:mt-[1.5rem] flex bg-primary-second hover:bg-primary-second/70 rounded-[9999px] items-center cursor-pointer py-3"
                  >
                    <img
                      src={`nfidblack.svg`}
                      alt=""
                      className="m-0 w-[2.5rem] sm:w-[3rem]"
                    />
                    <p className="text-[0.65rem] ml-4  font-bold sm:text-[.85rem]">
                      Sign in with NFID
                    </p>
                  </button>
                  <div className="mt-8">
                    <p className="text-[.7rem] lg:text-[.82rem] text-center text-primary-second/80  my-[.2rem]">
                      Do not have an account ?{" "}
                      <span
                        onClick={() => {
                          modal();
                          loginNFID();
                        }}
                        className="text-white/80 hover:underline cursor-pointer lg:text-[.82rem] text-[.7rem]"
                      >
                        Sign Up
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
