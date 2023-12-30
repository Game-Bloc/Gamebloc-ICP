import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
import LoginModal from "../Modals/LoginModal";

const CircleIndicator = ({ isActive }) => (
  <span
    className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 h-[0.4rem] w-[0.4rem] bg-primary-second rounded-full ${
      isActive ? "opacity-100" : "opacity-0"
    } transition-opacity duration-300`}
  ></span>
);

interface Props {
  setModal: any;
}

const Hero = ({ setModal }: Props) => {
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Manually determine the active link based on scroll position
      const aboutSection = document.getElementById("about");
      const featuresSection = document.getElementById("features");
      const socialSection = document.getElementById("social");

      if (
        aboutSection &&
        scrollY >= aboutSection.offsetTop &&
        scrollY < featuresSection.offsetTop
      ) {
        setActiveLink("about");
      } else if (
        featuresSection &&
        scrollY >= featuresSection.offsetTop &&
        scrollY < socialSection.offsetTop
      ) {
        setActiveLink("features");
      } else if (socialSection && scrollY >= socialSection.offsetTop) {
        setActiveLink("social");
      }
    };

    Events.scrollEvent.register("begin", (to) => {
      setActiveLink(to);
    });

    scrollSpy.update();

    // Listen for scroll events and update the active link dynamically
    window.addEventListener("scroll", handleScroll);

    return () => {
      Events.scrollEvent.remove("begin");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSetActive = (to) => {
    console.log(to);
  };

  return (
    <div className=" fixed top-0 left-0 w-full h-[72px] flex bg-[#08010E] z-10  py-8 px-4 sm:p-8 justify-between items-center">
      <img src={`logo.png`} alt="" className="w-[5rem] md:w-32 m-0 " />
      <div className="hidden md:flex  justify-between items-center gap-4">
        <Link
          activeClass="active"
          to="about"
          spy={true}
          smooth={true}
          offset={-20}
          duration={500}
          onSetActive={handleSetActive}
          className="text-primary-second relative text-sm cursor-pointer"
        >
          About
          <CircleIndicator isActive={activeLink === "about"} />
        </Link>
        <Link
          activeClass="active"
          to="features"
          spy={true}
          smooth={true}
          offset={-20}
          duration={500}
          onSetActive={handleSetActive}
          className="text-primary-second relative text-sm cursor-pointer"
        >
          Features
          <CircleIndicator isActive={activeLink === "features"} />
        </Link>
        <Link
          activeClass="active"
          to="social"
          spy={true}
          smooth={true}
          offset={-20}
          duration={500}
          onSetActive={handleSetActive}
          className="text-primary-second relative text-sm cursor-pointer"
        >
          Social
          <CircleIndicator isActive={activeLink === "social"} />
        </Link>
      </div>
      <div className=" flex justify-between items-center">
        <p
          onClick={() => setModal(true)}
          className="text-primary-second hover:text-primary-second/70  text-[0.85rem] sm:text-sm cursor-pointer"
        >
          Login
        </p>
        <button
          onClick={() => setModal(true)}
          className="pt-1 pb-[.15rem] ml-4  px-[.6rem]  sm:px-4 text-[.7rem] sm:text-sm text-black justify-center hover:bg-primary-second/70   flex bg-primary-second rounded-lg items-center cursor-pointer sm:py-2"
        >
          <p className="font-semibold">Create Account</p>
        </button>
      </div>
    </div>
  );
};

export default Hero;
