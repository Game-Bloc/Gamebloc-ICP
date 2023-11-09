import { Container } from "../styles/commonStyles/Container.styles";
import { Wrapper } from "../styles/commonStyles/Wrapper";
import { LeftArrow2 } from "../styles/icon/Icons";
import { Text } from "../styles/commonStyles/Text";
import { Img } from "../styles/commonStyles/Img";
import img from "../assets/images/framebg.png";
import { Paragraph } from "../styles/commonStyles/Paragraph";
import coin from "../assets/images/coin.png";
import check from "../assets/images/check-circle.png";
import { Button } from "../styles/commonStyles/Button.styled";
import dice from "../assets/images/dice.png";
import price from "../assets/images/price.png";
import ChatBox from "./ChatBox";
import React from "react";

const CrowdFunded = () => {
  return (
    <Container margin="1rem">
      <Wrapper
        display="flex"
        flexDirection="row"
        alignItems="center"
        cursor="pointer"
        margin="1rem 0 0 0"
        width="fit-content"
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

      <Wrapper display="flex" flexDirection="column">
        <Img src={img} alt="" margin="2rem 0 1rem 0" />

        <Container display="grid" gridColumn="repeat(2, 1fr)">
          <Container
            margin="1rem 0 0 0"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.2)"
            borderStyle="solid"
            borderRadius="10px"
          >
            <Container
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              padding=".8rem"
            >
              <Wrapper display="flex" flexDirection="column">
                <Text fontsize="1.5rem" fontWeight={700} color="#ffffff">
                  Call of Duty
                </Text>

                <Wrapper
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  margin=".5rem 0 0 0"
                >
                  <Img src={check} alt="" width="1rem" height="1rem" />
                  <Paragraph
                    fontsize="0.8rem"
                    color="#fff"
                    fontWeight={400}
                    margin="0 0 0 .3rem"
                  >
                    Deonorla
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
                  border="none"
                  borderRadius="4.5rem"
                >
                  <Text
                    color="#D92D20"
                    fontStyle="normal"
                    fontsize=".8rem"
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
                  border="none"
                  borderRadius="4.5rem"
                  margin="0 0 0 1rem"
                >
                  <Text
                    color="#B88217"
                    fontStyle="normal"
                    fontsize=".8rem"
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
                  border="none"
                  borderRadius="4.5rem"
                  margin="0 0 0 1rem"
                >
                  <Text
                    color="#039855"
                    fontStyle="normal"
                    fontsize=".8rem"
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
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              margin="1rem 0"
            >
              <Wrapper
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <Img src={dice} alt="" />
                <Wrapper display="flex" flexDirection="column">
                  <Text fontsize="1rem" fontStyle="normal" fontWeight={600}>
                    Participants
                  </Text>
                  <Paragraph
                    fontStyle="normal"
                    fontsize="1.3rem"
                    fontWeight={700}
                    margin="1rem 0 0 0"
                  >
                    10
                  </Paragraph>
                </Wrapper>
              </Wrapper>

              <Wrapper
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                margin="0 0 0 5%"
              >
                <Img src={price} alt="" />
                <Wrapper display="flex" flexDirection="column">
                  <Text fontsize="1rem" fontStyle="normal" fontWeight={600}>
                    Pool Price
                  </Text>
                  <Paragraph
                    fontStyle="normal"
                    fontsize="1.3rem"
                    fontWeight={700}
                    margin="1rem 0 0 0"
                  >
                    $200
                  </Paragraph>
                </Wrapper>
              </Wrapper>

              <Wrapper
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                margin="0 0 0 5%"
              >
                <Img src={coin} alt="" />
                <Wrapper display="flex" flexDirection="column">
                  <Text fontsize="1rem" fontStyle="normal" fontWeight={600}>
                    Entry Prize
                  </Text>
                  <Paragraph
                    fontStyle="normal"
                    fontsize="1.3rem"
                    fontWeight={700}
                    margin="1rem 0 0 0"
                  >
                    $20
                  </Paragraph>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Container>

          <Container
            padding="1rem"
            margin="1rem 0 0 1rem"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.2)"
            borderStyle="solid"
            borderRadius="10px"
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <Text fontStyle="normal" fontWeight={700} fontsize="1rem">
              About
            </Text>

            <Paragraph fontsize=".8rem" margin="2rem 0 0 0">
              Lorem ipsum dolor sit amet consectetur. Nisi placerat euismod
              luctus neque risus viverra ultricies. Porttitor volutpat velit
              dolor bibendum amet justo urna orci. Lorem faucibus sagittis eu
              mauris fringilla id. Nisi placerat euismod luctus neque risus
            </Paragraph>
          </Container>
        </Container>

        <ChatBox />
      </Wrapper>
    </Container>
  );
};

export default CrowdFunded;
