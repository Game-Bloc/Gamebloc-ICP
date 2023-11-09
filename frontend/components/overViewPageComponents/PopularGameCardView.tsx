import React, { useState } from "react";
import { TestCodImg } from "../../data/Index";
import { Container } from "../../styles/commonStyles/Container.styles";
import { FlexLayout } from "../../styles/commonStyles/FlexLayout";
import { Img } from "../../styles/commonStyles/Img";
import { Paragraph } from "../../styles/commonStyles/Paragraph";
import { Text } from "../../styles/commonStyles/Text";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import SoonPopUP from "../Popup/SoonPopUp";

const PopularGameCardView = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container margin="3rem 0 0 0">
      <FlexLayout>
        {TestCodImg.map((data, index) => (
          <Container
            key={index}
            borderRadius="8px"
            borderStyle="solid"
            borderColor="rgba(255, 255, 255, 0.2)"
            borderWidth="1px"
            width="13.75rem"
            height="22rem"
            position="relative"
            padding="0.5rem"
            cursor="pointer"
            onClick={() => setOpenModal(true)}
          >
            <Img
              src={data.img}
              alt="img"
              width="12rem"
              height="8.125rem"
              borderRadius="8px"
            />
            <Wrapper
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              margin="1rem 0 0 0"
            >
              <Container display="flex" flexDirection="column">
                <Text color="#F8DBFB" fontWeight={600} fontsize=".8rem">
                  League of Legends
                </Text>

                <Wrapper margin=".5rem 0 0 0">
                  <Paragraph color="#12B76A" fontsize=".6rem" fontWeight={600}>
                    Adventure
                  </Paragraph>
                  <Paragraph
                    color="#12B76A"
                    fontsize=".6rem"
                    fontWeight={600}
                    margin="0 0 0 2rem"
                  >
                    Action
                  </Paragraph>
                </Wrapper>
              </Container>

              <Container
                borderRadius="9999px"
                padding=".4rem .5rem"
                borderWidth="1px"
                borderStyle="solid"
                borderColor="#F6B8FC"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Paragraph color="#F6B8FC" fontsize=".7rem" fontWeight={600}>
                  4.1
                </Paragraph>
              </Container>
            </Wrapper>

            <Wrapper
              borderTop="1px solid #F8DBFB"
              width="100%"
              margin=".5rem 0"
            />

            <Container>
              <Paragraph color="#F8DBFB" fontsize="0.625rem">
                League of Legends is a team-based game where two teams, each
                consisting of five players, compete against each other. The goal
                is to destroy the opponent's Nexus.
              </Paragraph>
            </Container>
          </Container>
        ))}
      </FlexLayout>
      {openModal && <SoonPopUP modal={setOpenModal} />}
    </Container>
  );
};

export default PopularGameCardView;
