/// <reference path="../react-app-env.d.ts" />
import { useEffect, useState } from "react"
import { Container } from "../styles/commonStyles/Container.styles"
import { Text } from "../styles/commonStyles/Text"
import { Wrapper } from "../styles/commonStyles/Wrapper"
import { LeftArrow2 } from "../styles/icon/Icons"
import background from "../assets/images/detail.jpg"
import { Img } from "../styles/commonStyles/Img"
import check from "../assets/images/check2.png"
import { Paragraph } from "../styles/commonStyles/Paragraph"
import { Button } from "../styles/commonStyles/Button.styled"
import dice from "../assets/images/dice.png"
import price from "../assets/images/price.png"
import coin from "../assets/images/coin.png"
import { useNavigate, useParams } from "react-router-dom"
import React from "react"
import { useAppSelector } from "../redux/hooks"
import ClipLoader from "react-spinners/ClipLoader"
import PaymentModal from "../components/Popup/PaymentModal"
import Loader from "../components/Popup/Loader/Loader"
import SideBar from "./SideBar"
import CommonHeader from "../common/CommonHeader"

const ActiveTournamentDetails = () => {
  // const {
  //   joinTournament,
  //   loading,
  //   close,
  //   getTournamentCount,
  //   transferSOL,
  //   confirmPayment,
  // } = useGameblocFunction();
  const navigate = useNavigate()
  const { id } = useParams()
  const tournamentData = useAppSelector((state) => state.tournamentData)
  const owner = useAppSelector((state) => state.userProfile.username)
  const [openModal, setOpenmodal] = useState<boolean>(false)
  const [color, setColor] = useState("#fff")
  const initials = owner!.substring(0, 2).toUpperCase()

  // console.log("payment.:", confirmPayment);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  }
  console.log("Data", tournamentData)

  // useEffect(() => {
  //   getTournamentCount();
  // }, []);

  useEffect(() => {
    if (close) {
      setOpenmodal(false)
    }
  }, [close])

  // updateTournamentCountValue(tournamentCount);

  const makePayment = (money: any) => {
    // transferSOL(
    //   money,
    //   "Payment successful. Close this modal to proceed to join tournament",
    //   "Payment Failed",
    //   ""
    // );
    // console.log("Worked!!", money);
  }

  const joinGameTournament = () => {
    // joinTournament(
    //   +id!,
    //   "You have successfully joined this tournament",
    //   "Something went wrong try again",
    //   "/home"
    // );
  }

  return (
    <>
      <CommonHeader />
      <Container display="flex" flexDirection="row">
        <SideBar />
        <Wrapper
          xmdmargin="7rem 1rem 0 1rem"
          xmdwidth="100%"
          width="79%"
          margin="7rem 0 0 19%"
        >
          <Container smmargin="1rem 0" margin="1rem">
            <Wrapper
              display="flex"
              flexDirection="row"
              alignItems="center"
              cursor="pointer"
              margin="1rem 0 0 0"
              width="fit-content"
              onClick={() => navigate(-1)}
            >
              <LeftArrow2 />
              <Text
                color="#F8DBFB"
                fontWeight={600}
                fontStyle="normal"
                margin="0 0 0 .5rem"
              >
                Go Back
              </Text>
            </Wrapper>
            {tournamentData
              .filter((list: any) => list.tournamentId == id)
              .map((data: any) => (
                <Wrapper
                  key={data.tournamentId}
                  display="grid"
                  gridColumn="repeat( auto-fit, minmax(16rem, 1fr) )"
                  mdgridcolumn="repeat(1, 1fr)"
                  gap="1rem"
                  margin="1.5rem 0 0 0"
                >
                  <Container
                    display="flex"
                    position="relative"
                    flexDirection="column"
                  >
                    <Container position="relative">
                      <Img
                        src={background}
                        alt=""
                        width="100%"
                        borderWidth="1px"
                        borderColor="rgba(255, 255, 255, 0.2)"
                        borderStyle="solid"
                        borderRadius="10px"
                      />
                      <Container
                        position="absolute"
                        top=".7rem"
                        left=".7rem"
                        backgroundColor={
                          data.tournamentType === "crowdfunded"
                            ? "#D1FADF"
                            : "#FEE4E2"
                        }
                        padding=".3rem .7rem"
                        width="fit-content"
                        borderRadius="12px"
                        justifyContent="center"
                        display="flex"
                        alignItems="center"
                      >
                        <Text
                          color={
                            data.tournamentType === "crowdfunded"
                              ? "#039855"
                              : "#D92D20"
                          }
                          fontsize=".8rem"
                          fontWeight={700}
                        >
                          {data.tournamentType.toUpperCase()}
                        </Text>
                      </Container>
                      <Container
                        position="absolute"
                        bottom=".7rem"
                        right=".7rem"
                        backgroundColor="#FFD98F"
                        padding=".3rem .7rem"
                        width="fit-content"
                        borderRadius="12px"
                        justifyContent="center"
                        display="flex"
                        alignItems="center"
                      >
                        <Text color="#B88217" fontsize=".8rem" fontWeight={700}>
                          {data.date}
                        </Text>
                      </Container>
                    </Container>
                    <Container
                      margin="1rem 0 0 0"
                      borderWidth="1px"
                      borderColor="rgba(255, 255, 255, 0.2)"
                      borderStyle="solid"
                      borderRadius="10px"
                      width="100%"
                    >
                      <Container
                        smdisplay="grid"
                        smgridcolumn="repeat(1, 1fr)"
                        smgap="1rem"
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        padding=".8rem"
                      >
                        <Wrapper display="flex" flexDirection="column">
                          <Text
                            fontsize="1.5rem"
                            smfontSize=".8rem"
                            fontWeight={700}
                            color="#ffffff"
                          >
                            {data.gameName}
                          </Text>

                          <Wrapper
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            margin=".5rem 0 0 0"
                          >
                            <Img
                              src={check}
                              alt=""
                              width="1rem"
                              height="1rem"
                            />
                            <Paragraph
                              fontsize="0.8rem"
                              smfontSize=".65rem"
                              color="#fff"
                              fontWeight={400}
                              margin="0 0 0 .3rem"
                            >
                              {data.username}
                            </Paragraph>
                          </Wrapper>
                        </Wrapper>

                        <Wrapper display="flex" flexDirection="row">
                          <Button
                            backgroundColor="#FEE4E2"
                            cursor="pointer"
                            justifyContent="center"
                            alignItems="center"
                            padding="0.3rem 1.2rem 0.4rem 1.2rem"
                            smpadding="0.2rem 1rem 0.4rem 1rem"
                            border="none"
                            borderRadius="4.5rem"
                          >
                            <Text
                              color="#D92D20"
                              fontStyle="normal"
                              fontsize=".8rem"
                              smfontSize=".6rem"
                              fontWeight={600}
                              cursor="pointer"
                            >
                              Action
                            </Text>
                          </Button>
                          <Button
                            backgroundColor="#FFD98F"
                            cursor="pointer"
                            justifyContent="center"
                            alignItems="center"
                            padding="0.3rem 1.2rem 0.4rem 1.2rem"
                            smpadding="0.2rem 1rem 0.4rem 1rem"
                            border="none"
                            borderRadius="4.5rem"
                            margin="0 0 0 1rem"
                          >
                            <Text
                              color="#B88217"
                              fontStyle="normal"
                              fontsize=".8rem"
                              smfontSize=".6rem"
                              fontWeight={600}
                              cursor="pointer"
                            >
                              Adventure
                            </Text>
                          </Button>
                          <Button
                            backgroundColor="#D1FADF"
                            cursor="pointer"
                            justifyContent="center"
                            alignItems="center"
                            padding="0.3rem 1.2rem 0.4rem 1.2rem"
                            smpadding="0.2rem 1rem 0.4rem 1rem"
                            border="none"
                            borderRadius="4.5rem"
                            margin="0 0 0 1rem"
                          >
                            <Text
                              color="#039855"
                              fontStyle="normal"
                              fontsize=".8rem"
                              smfontSize=".6rem"
                              fontWeight={600}
                              cursor="pointer"
                            >
                              Shooting
                            </Text>
                          </Button>
                        </Wrapper>
                      </Container>

                      <Wrapper
                        borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                        width="100%"
                        margin=".5rem 0"
                      />

                      <Wrapper
                        display="flex"
                        smdisplay="grid"
                        smgridcolumn="repeat(2, 1fr)"
                        smgap=".7rem"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        margin="1rem .7rem"
                      >
                        <Wrapper
                          display="flex"
                          flexDirection="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Img src={dice} alt="" />
                          <Wrapper display="flex" flexDirection="column">
                            <Text
                              fontsize="1rem"
                              smfontSize=".7rem"
                              margin="0 0 0 3rem"
                              smmargin="0 0 0 2.5rem"
                              fontStyle="normal"
                              fontWeight={600}
                            >
                              STATUS
                            </Text>
                            <Container
                              backgroundColor="#D1FADF"
                              cursor="pointer"
                              justifyContent="center"
                              alignItems="center"
                              padding="0.3rem 1.2rem 0.4rem 1.2rem"
                              smpadding="0.2rem 1rem 0.4rem 1rem"
                              borderRadius="4.5rem"
                              margin=".7rem 0 0 .4rem"
                            >
                              <Text
                                color="#039855"
                                fontStyle="normal"
                                fontsize=".8rem"
                                smfontSize=".6rem"
                                fontWeight={600}
                                cursor="pointer"
                              >
                                {data.status}
                              </Text>
                            </Container>
                          </Wrapper>
                        </Wrapper>
                        {data.tournamentType === "crowdfunded" ? (
                          <Wrapper
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                            margin="0 0 0 5%"
                          >
                            <Img src={coin} alt="" />
                            <Wrapper
                              display="flex"
                              flexDirection="column"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Text
                                fontsize="1rem"
                                smfontSize=".7rem"
                                fontStyle="normal"
                                fontWeight={600}
                              >
                                ENTRY PRIZE
                              </Text>
                              <Paragraph
                                fontStyle="normal"
                                fontsize="1.3rem"
                                smfontSize=".9rem"
                                fontWeight={700}
                                margin="1rem 0 0 0"
                              >
                                {data.entryPrize} SOL
                              </Paragraph>
                            </Wrapper>
                          </Wrapper>
                        ) : (
                          <Wrapper
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                            margin="0 0 0 5%"
                          >
                            <Img src={price} alt="" />
                            <Wrapper
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              flexDirection="column"
                            >
                              <Text
                                fontsize="1rem"
                                smfontSize=".7rem"
                                fontStyle="normal"
                                fontWeight={600}
                              >
                                POOL PRICE
                              </Text>
                              <Paragraph
                                fontStyle="normal"
                                fontsize="1.3rem"
                                smfontSize=".7rem"
                                fontWeight={700}
                                margin="1rem 0 0 0"
                              >
                                {data.poolPrize} SOL
                              </Paragraph>
                            </Wrapper>
                          </Wrapper>
                        )}
                      </Wrapper>

                      <Container margin="1rem 0">
                        <Text
                          fontsize="1.2rem"
                          smfontSize="1rem"
                          fontWeight={700}
                          margin="1rem"
                        >
                          Participants
                        </Text>

                        <Wrapper
                          display="flex"
                          alignItems="center"
                          margin=" 1rem 0 0 2rem"
                        >
                          {data.participants!.map((list: any, index: any) => (
                            <Container key={index}>
                              {Array.isArray(list)
                                ? list.map((value: any, indexlist: any) => (
                                    <Container
                                      key={indexlist}
                                      display="flex"
                                      flexDirection="row"
                                      alignItems="center"
                                      margin="0 0 0 -20px"
                                      cursor="pointer"
                                    >
                                      <Container
                                        width="3rem"
                                        height="3rem"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        backgroundColor="#374151"
                                        borderRadius="50%"
                                        borderStyle="solid"
                                        borderWidth="1px"
                                        borderColor="#ffffffa2"
                                      >
                                        <Text
                                          fontsize="1.2rem"
                                          fontWeight={400}
                                        >
                                          {value.substring(0, 2).toUpperCase()}
                                        </Text>
                                      </Container>
                                    </Container>
                                  ))
                                : null}
                            </Container>
                          ))}
                        </Wrapper>
                      </Container>
                    </Container>
                  </Container>

                  <Container
                    borderWidth="1px"
                    borderColor="rgba(255, 255, 255, 0.2)"
                    borderStyle="solid"
                    borderRadius="10px"
                    padding="1.5rem"
                    display="flex"
                    width="100%"
                    flexDirection="column"
                    position="relative"
                  >
                    <Wrapper display="flex" flexDirection="column">
                      <Text
                        fontsize="1.1rem"
                        fontWeight={700}
                        fontStyle="normal"
                        color="#fff"
                        margin="1rem 0 0 0"
                      >
                        Tournament Rules
                      </Text>

                      <Paragraph
                        fontStyle="normal"
                        fontsize="1rem"
                        smfontSize=".7rem"
                        margin="1rem 0 0 0"
                      >
                        {data.tournamentRules}
                      </Paragraph>
                    </Wrapper>
                    <Wrapper display="flex" margin="1rem 0 0 0" height="100%">
                      <Wrapper alignSelf="flex-end" width="100%">
                        {/* {!confirmPayment &&
                  data.tournamentType === "crowdfunded" &&
                  !data.participants.some((innerArray: any) =>
                    innerArray.includes(owner)
                  ) ? (
                    <Wrapper margin="0 2rem">
                      <Button
                        backgroundColor="#F6B8FC"
                        borderRadius="10px 10px 10px 10px"
                        padding="0.4rem 1.2rem 0.5rem 1.2rem"
                        justifyContent="center"
                        display="flex"
                        alignItems="center"
                        height="fit-content"
                        width="100%"
                        cursor="pointer"
                        onClick={() => setOpenmodal(true)}
                      >
                        Make Payment
                      </Button>
                    </Wrapper>
                  ) : (
                    <Wrapper width="100%">
                      {data.tournamentType === "prepaid" &&
                      data.username === owner ? (
                        <></>
                      ) : (
                        <Wrapper alignSelf="flex-end" width="100%">
                          {data.participants.some((innerArray: any) =>
                            innerArray.includes(owner)
                          ) ? (
                            <Button
                              backgroundColor="#63aa88"
                              textColor="white"
                              borderRadius="10px 10px 10px 10px"
                              padding="0.3rem 1.2rem 0.4rem 1.2rem"
                              justifyContent="center"
                              display="flex"
                              alignItems="center"
                              height="fit-content"
                              width="100%"
                            >
                              Joined
                            </Button>
                          ) : (
                            <button
                              onClick={() => joinGameTournament()}
                              className="glowing-btn"
                            >
                              {loading ? (
                                <ClipLoader
                                  color={color}
                                  loading={loading}
                                  cssOverride={override}
                                  size={20}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
                              ) : (
                                <span className="glowing-txt">
                                  C<span className="faulty-letter">l</span>ick
                                  me
                                </span>
                              )}
                            </button>
                          )}
                        </Wrapper>
                      )}
                    </Wrapper>
                  )} */}
                      </Wrapper>
                    </Wrapper>
                  </Container>
                  {/* {openModal && (
              <PaymentModal
                addPayment={makePayment}
                modal={setOpenmodal}
                amount={data.entryPrize}
                loading={loading}
              />
            )} */}
                </Wrapper>
              ))}
          </Container>
        </Wrapper>
      </Container>
    </>
  )
}

export default ActiveTournamentDetails

//  <Button
//                               backgroundColor="#F6B8FC"
//                               borderRadius="10px 10px 10px 10px"
//                               padding="0.3rem 1.2rem 0.4rem 1.2rem"
//                               justifyContent="center"
//                               display="flex"
//                               alignItems="center"
//                               height="fit-content"
//                               width="100%"
//                               onClick={() => joinGameTournament()}
//                             >
//                               {loading ? (
//                                 <ClipLoader
//                                   color={color}
//                                   loading={loading}
//                                   cssOverride={override}
//                                   size={20}
//                                   aria-label="Loading Spinner"
//                                   data-testid="loader"
//                                 />
//                               ) : (
//                                 "Join Tournament"
//                               )}
//                             </Button>
