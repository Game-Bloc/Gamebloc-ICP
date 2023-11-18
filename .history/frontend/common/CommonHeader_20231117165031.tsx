/// <reference path="../react-app-env.d.ts" />
import { useState } from "react"
import { Container } from "../styles/commonStyles/Container.styles"
import { Img } from "../styles/commonStyles/Img"
import { Text } from "../styles/commonStyles/Text"
import { Wrapper } from "../styles/commonStyles/Wrapper"
import {
  ArrowDown,
  Close,
  ArrowUp,
  Person,
  SignOut,
  Menu,
  MobileGameIcon,
  MobileOverViewIcon,
  MobileTournamentIcon,
} from "../styles/icon/Icons"
import { CustomContainer } from "../styles/custom/CustomContainer"
import { MobileCustomContainer } from "../styles/custom/MobileCustomContainer"
import { NavLink, useNavigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import styled from "styled-components"
import logo from "../assets/images/gamelogo2.png"
import logo2 from "../assets/images/gameIcon.png"
import React from "react"

const CommonHeader = ({ wallet }: any) => {
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const navigate = useNavigate()
  const signOut = () => {
    wallet.signOut()
  }

  const username = useAppSelector((state) => state.userProfile.username)
  const initials = username?.substring(0, 2).toUpperCase()
  return (
    <Container
      backgroundColor="#01070E"
      padding="1.5rem 1rem"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid #F6B8FC"
      position="fixed"
      width="100%"
      height="fit-content"
      top="0px"
      zIndex="1"
    >
      <Menu onClick={() => setOpenMenu(!openMenu)} />
      <div onClick={() => navigate("/")}>
        <LogoImg src={logo} alt="" />
      </div>

      <Container
        display="flex"
        flexDirection="row"
        alignItems="center"
        xmdisplay="none"
      >
        <Container
          display="flex"
          flexDirection="row"
          alignItems="center"
          position="relative"
        >
          <Wrapper margin="0 0 0 0">
            {/* <ConnectButton
              style={{
                backgroundColor: "#F6B8FC",
                color: "#000",
                fontWeight: "800",
              }}
              dark={false}
            />

            <ConnectDialog /> */}
          </Wrapper>
          <Container
            display="flex"
            flexDirection="row"
            alignItems="center"
            margin="0 0 0 1rem"
            cursor="pointer"
            onClick={() => navigate("/profile")}
          >
            <Container
              width="3rem"
              height="3rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor="#374151"
              borderRadius="50%"
            >
              <Text fontsize="1.2rem" fontWeight={400}>
                {initials}
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>

      {/* MOBILE VIEW */}

      <Container
        xmdisplay="flex"
        flexDirection="row"
        display="none"
        justifyContent="center"
        alignItems="center"
      >
        {/* <WalletMultiButton /> */}
      </Container>
      {openMenu && (
        <Container
          xmdisplay="flex"
          display="none"
          backgroundColor="#F6B8FC"
          width="70%"
          height="100vh"
          position="absolute"
          padding=".5rem"
          top="0rem"
          left="0"
        >
          <Wrapper position="relative" width="100%">
            <Container
              position="absolute"
              top=".5rem"
              right=".5rem"
              onClick={() => setOpenMenu(false)}
            >
              <Close />
            </Container>

            <Wrapper
              justifyContent="center"
              display="flex"
              alignItems="center"
              flexDirection="column"
              margin="3rem 0"
              width="100%"
            >
              <Img src={logo2} alt="" width="4.5rem" />
              <Img
                cursor="pointer"
                src={logo}
                alt=""
                mdwidth="45%"
                margin="1rem 0 0 0"
              />
            </Wrapper>

            <Container>
              <MobileCustomContainer
                display="flex"
                flexDirection="row"
                alignItems="center"
                height="fit-content"
                width="100%"
                margin="1rem"
                cursor="pointer"
              >
                <Wrapper
                  padding=".4rem .5rem"
                  className="wrapper"
                  borderRadius="8px"
                  margin="0 1rem 0 0"
                >
                  <MobileOverViewIcon className="icon" />
                </Wrapper>

                <NavBarLink1
                  onClick={() => setOpenMenu(false)}
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Overview
                </NavBarLink1>
              </MobileCustomContainer>
              <MobileCustomContainer
                display="flex"
                flexDirection="row"
                alignItems="center"
                height="fit-content"
                width="100%"
                margin="1rem"
                cursor="pointer"
              >
                <Wrapper
                  padding=".4rem .5rem"
                  className="wrapper"
                  borderRadius="8px"
                  margin="0 1rem 0 0"
                >
                  <MobileTournamentIcon className="icon" />
                </Wrapper>

                <NavBarLink2
                  onClick={() => setOpenMenu(false)}
                  to="/active-tournament"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Tournament
                </NavBarLink2>
              </MobileCustomContainer>
              <MobileCustomContainer
                display="flex"
                flexDirection="row"
                alignItems="center"
                height="fit-content"
                width="100%"
                margin="1rem"
                cursor="pointer"
              >
                <Wrapper
                  padding=".4rem .5rem"
                  className="wrapper"
                  borderRadius="8px"
                  margin="0 1rem 0 0"
                >
                  <MobileGameIcon className="icon" />
                </Wrapper>

                <NavBarLink3
                  onClick={() => setOpenMenu(false)}
                  to="/profile"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  Profile
                </NavBarLink3>
              </MobileCustomContainer>
            </Container>

            {/* <Container
              display="flex"
              alignItems="flex-end"
              justifyContent="center"
              height="50%"
              width="100%"
            >
              <CustomContainer
                display="flex"
                flexDirection="row"
                width="100%"
                cursor="pointer"
                borderRadius="10px"
                padding=".5rem"
                alignItems="center"
                margin="0rem 0rem 1rem 17%"
                onClick={() => {
                  navigate("/");
                  signOut();
                }}
              >
                <SignOut className="icon" />
                <Text
                  fontWeight={400}
                  margin="0 0 0 1.5rem"
                  className=""
                  color=" #F97066"
                >
                  Sign Out
                </Text>
              </CustomContainer>
            </Container> */}
          </Wrapper>
        </Container>
      )}
    </Container>
  )
}
export default CommonHeader

const LogoImg = styled.img`
  cursor: pointer;
  width: 6.5rem;
  display: none;
  @media screen and (min-width: 769px) {
    display: flex;
  }
  @media screen and (max-width: 1024px) {
    width: 25%;
  }
`

const NavBarLink1 = styled(NavLink)`
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  color: #01070e;
  &:hover {
    font-weight: 700;
    text-decoration: none;
    font-size: large;
    color: #01070e;
  }
  &.active {
    color: #01070e;
    font-weight: 700;
    font-size: large;
    text-decoration: none;
  }
`
const NavBarLink2 = styled(NavLink)`
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  color: #01070e;
  &:hover {
    font-weight: 700;
    text-decoration: none;
    font-size: large;
    color: #01070e;
  }
  &.active {
    color: #01070e;
    font-weight: 700;
    font-size: large;
    text-decoration: none;
  }
`
const NavBarLink3 = styled(NavLink)`
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  color: #01070e;
  &:hover {
    font-weight: 700;
    text-decoration: none;
    font-size: large;
    color: #01070e;
  }
  &.active {
    color: #01070e;
    font-weight: 700;
    font-size: large;
    text-decoration: none;
  }
`
const NavBarLink4 = styled(NavLink)`
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  color: #01070e;
  &:hover {
    font-weight: 700;
    text-decoration: none;
    font-size: large;
    color: #01070e;
  }
  &.active {
    color: #01070e;
    font-weight: 700;
    font-size: large;
    text-decoration: none;
  }
`
const NavBarLink5 = styled(NavLink)`
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  color: #01070e;
  &:hover {
    font-weight: 700;
    text-decoration: none;
    font-size: large;
    color: #01070e;
  }
  &.active {
    color: #01070e;
    font-weight: 700;
    font-size: large;
    text-decoration: none;
  }
`
