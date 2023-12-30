import React from "react";

interface Props {
  setModal: any;
}

const About = ({ setModal }: Props) => {
  return (
    <div className="my-[5rem] mx-4 lg:mx-[2rem] ">
      <p
        className="text-primary-second text-center text-[1.1rem] sm:text-[2rem] flex w-full justify-center lg:text-[3rem] 
              xl:text-[3rem] h-fit  2xl:text-[3rem] font-valorant mt-4 "
      >
        STILL THINKING ABOUT GAMBLOC?
      </p>
      <p className="text-primary-second text-center text-[0.6rem] sm:text-[0.8rem] 2xl:text-base flex w-full  mt-[0.5rem] md:mb-[1rem]">
        Game_bloc have the potential to draw the attention of gamers to web3
        games as clear net games like COD, Fortnite, PUBG, Free fire,
        minimilitia, e.t.c will be supported alongside web3 games that will put
        these games in the limelight for gamers to checkout.
      </p>

      <div className="flex w-full justify-center items-center">
        <button
          onClick={() => setModal(true)}
          className="pt-1 pb-[.15rem] hover:bg-primary-second/70  px-[.6rem] mt-[3rem]  sm:px-4 text-[.7rem] sm:text-sm text-black justify-center  flex bg-primary-second rounded-lg items-center cursor-pointer sm:py-2"
        >
          <p className="font-semibold">Create Account</p>
        </button>
      </div>
    </div>
  );
};

export default About;
