import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "../../styles/commonStyles/Text";
import { RiCloseFill } from "react-icons/ri";
import { Container } from "../../styles/commonStyles/Container.styles";
import { Img } from "../../styles/commonStyles/Img";
import img from "../../assets/images/display.png";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { FaUserFriends } from "react-icons/fa";
import { Button } from "../../styles/commonStyles/Button.styled";
import { PiPowerBold } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";

type model = {
  modal: () => void;
  name: any;
  gameName: any;
  startDate: any;
  entryPrize: any;
  gameType: any;
  playersCount: any;
};

const NewModal = ({
  modal,
  name,
  gameName,
  startDate,
  entryPrize,
  gameType,
  playersCount,
}: model) => {
  return (
    <Wrapper1 aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <Container1>
        <Container2>
          <Container3>
            <Container4>
              <Modal>
                <Close onClick={modal} />
                <Container width="100%" display="flex" flexDirection="row">
                  <Img src={img} alt="" />
                  <Wrapper margin="4rem  0 1rem 1rem">
                    <Text fontsize=".8rem" color="#E49A83">
                      {name}
                    </Text>

                    <Wrapper
                      display="flex"
                      flexDirection="column"
                      margin="1rem 0 "
                    >
                      <Text
                        fontsize="1.2rem"
                        fontFamily="Oswald"
                        margin=".5rem 0 0 0"
                        color="#F8DBFB"
                      >
                        {gameName}
                      </Text>
                      <Wrapper
                        display="flex"
                        padding="0px, 12px, 0px, 12px"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="#686868"
                        width="3rem"
                      >
                        <Text fontsize=".7rem">mobile</Text>
                      </Wrapper>
                    </Wrapper>

                    <Wrapper
                      display="flex"
                      flexDirection="column"
                      margin="1rem 0 0 0"
                    >
                      <Text
                        fontsize=".8rem"
                        fontFamily="Oswald"
                        margin=".5rem 0 0 0"
                      >
                        Registraion:{" "}
                        <span style={{ color: "#549C30" }}>Ongoing</span>
                      </Text>
                      <Wrapper
                        display="flex"
                        padding="0px, 12px, 0px, 12px"
                        flexDirection="row"
                        margin=".5rem 0 1rem 0 "
                        alignItems="center"
                      >
                        <Users />
                        <Text color="#f8dbfb" margin="0 0 0 .5rem">
                          {playersCount} Participants
                        </Text>
                      </Wrapper>
                    </Wrapper>

                    <Wrapper display="flex" flexDirection="column">
                      <Text fontWeight={500} fontsize="1.1rem">
                        {gameType}
                      </Text>

                      <Wrapper margin=".8rem 0 0 0" display="flex">
                        <Wrapper display="flex" flexDirection="column">
                          <Text fontsize=".8rem" fontWeight={400}>
                            Prize
                          </Text>
                          <Text
                            fontsize="1.1rem"
                            margin=".2rem 0 0 0"
                            color="#F8DBFB"
                            fontWeight={400}
                          >
                            $20000
                          </Text>
                        </Wrapper>
                        <Wrapper
                          display="flex"
                          margin="0 0 0 2rem"
                          flexDirection="column"
                        >
                          <Text fontsize=".8rem" fontWeight={400}>
                            Registration
                          </Text>
                          <Text
                            fontsize="1.1rem"
                            margin=".2rem 0 0 0"
                            color="#F8DBFB"
                            fontWeight={400}
                          >
                            ${entryPrize}
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>

                    <Wrapper
                      display="flex"
                      margin="1rem 0 0 0"
                      flexDirection="column"
                    >
                      <Text fontsize=".8rem" fontWeight={400}>
                        Start Date
                      </Text>
                      <Text
                        fontsize="1.1rem"
                        margin=".2rem 0 0 0"
                        color="#F8DBFB"
                        fontWeight={400}
                      >
                        {startDate}
                      </Text>
                    </Wrapper>

                    <Wrapper
                      margin="1rem"
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="cennter"
                      width="100%"
                    >
                      <Button
                        backgroundColor="#549C30"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="7px"
                        padding=".5rem 1rem .5rem 1rem"
                        cursor="pointer"
                      >
                        <StartButtonIcon />
                        <Text margin=" 0 0 0 .4rem" fontsize=".8rem">
                          Start
                        </Text>
                      </Button>
                      <Button
                        backgroundColor="#BB1E10"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="7px"
                        padding=".5rem 1rem .5rem 1rem"
                        cursor="pointer"
                      >
                        <EndButtonIcon />
                        <Text margin=" 0 0 0 .4rem" fontsize=".8rem">
                          End
                        </Text>
                      </Button>
                      <Button
                        backgroundColor="#A309B1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="7px"
                        padding=".5rem 1rem .5rem 1rem"
                        cursor="pointer"
                      >
                        <PayButtonIcon />
                        <Text margin=" 0 0 0 .4rem" fontsize=".8rem">
                          Pay
                        </Text>
                      </Button>
                    </Wrapper>
                  </Wrapper>
                </Container>
              </Modal>
            </Container4>
          </Container3>
        </Container2>
      </Container1>
    </Wrapper1>
  );
};

const Wrapper1 = styled.div`
  position: relative;
  z-index: 10;
`;

const Container1 = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(128, 128, 128, 0.2);
`;

const Container2 = styled.div`
  position: fixed;
  z-index: 10;
  inset: 0;
  overflow-y: auto;
`;

const Container3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

const Container4 = styled.div`
  position: relative;
  background-color: white;
  width: 55%;
  border-radius: 25px;
  overflow: hidden;
`;

const Modal = styled.div`
  background-color: #01070e;
  /* padding: 1rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    color: white;
  }
`;

const Close = styled(RiCloseFill)`
  position: absolute;
  color: white;
  right: 1rem;
  font-size: 2rem;
  top: 1rem;
  cursor: pointer;
`;

const Users = styled(FaUserFriends)`
  color: #f8dbfb;
  font-size: 1.5rem;
`;
const StartButtonIcon = styled(PiPowerBold)`
  color: #fff;
  font-size: 1.5rem;
`;
const PayButtonIcon = styled(GiMoneyStack)`
  color: #fff;
  font-size: 1.5rem;
`;
const EndButtonIcon = styled(PiPowerBold)`
  color: #fff;
  font-size: 1.5rem;
  transform: rotate(180deg);
`;

export default NewModal;
