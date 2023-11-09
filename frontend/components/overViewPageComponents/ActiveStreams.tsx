/// <reference path="../../react-app-env.d.ts"/>
import { Streams } from "../../data/Index";
import { Button } from "../../styles/commonStyles/Button.styled";
import { Container } from "../../styles/commonStyles/Container.styles";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { CustomButtom } from "../../styles/custom/ CustomButton";
import { Eye, LeftArrow, RightArrow } from "../../styles/icon/Icons";
import { Text } from "../../styles/commonStyles/Text";
import StreamStyle from "../../styles/custom/StreamStyle";
import { Img } from "../../styles/commonStyles/Img";
import avatar from "../../assets/images/avatar.png";
import { Paragraph } from "../../styles/commonStyles/Paragraph";
import React, { useState } from "react";
import SoonPopUP from "../Popup/SoonPopUp";

const ActiveStreams = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Container margin="3rem 0 0 0">
      <Wrapper
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight={700}>Active Streams</Text>

        <Container display="flex" flexDirection="row" alignItems="center">
          <Wrapper display="block" smdisplay="none">
            <CustomButtom
              backgroundColor="#01070E"
              hoverBackground="#F6B8FC"
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              padding="0.5rem"
              borderRadius="8px"
              cursor="pointer"
              borderWidth="1px"
              borderColor="#F6B8FC"
              borderStyle="solid"
              margin="0 .5rem 0 0"
            >
              <LeftArrow className="icon" />
            </CustomButtom>
          </Wrapper>

          <Wrapper display="block" smdisplay="none">
            <CustomButtom
              backgroundColor="#01070E"
              hoverBackground="#F6B8FC"
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              padding="0.5rem"
              borderRadius="8px"
              cursor="pointer"
              borderWidth="1px"
              borderColor="#F6B8FC"
              borderStyle="solid"
              margin="0 .5rem 0 1rem"
            >
              <RightArrow className="icon" />
            </CustomButtom>
          </Wrapper>

          <Button
            backgroundColor="#01070E"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            padding="0.5rem 1.2rem"
            borderRadius="8px"
            cursor="pointer"
            borderWidth="1px"
            borderColor="#F6B8FC"
            borderStyle="solid"
            textColor="#F6B8FC"
            margin="0 2.5rem 0 1rem"
          >
            See All
          </Button>
        </Container>
      </Wrapper>

      <Wrapper margin="3rem 2rem 0 0">
        <Container
          display="grid"
          gap="2.5rem"
          gridColumn="repeat(3, 1fr)"
          mdgridcolumn="repeat(2, 1fr)"
          xmdgridcolumn="repeat(2, 1fr)"
          smgridcolumn="repeat(1, 1fr)"
        >
          {Streams.map((data, index) => (
            <StreamStyle onClick={() => setOpenModal(true)} key={index}>
              <video autoPlay loop muted>
                <source src={data.video} type="video/mp4" />
              </video>
              <div>
                <Wrapper
                  flexDirection="row"
                  display="flex"
                  alignItems="center"
                  height="fit-content"
                  position="absolute"
                  top=".5rem"
                  left=".5rem"
                >
                  <Img src={avatar} alt="" width="1.3rem" height="1.3rem" />
                  <Wrapper
                    margin="0 0 0 .5rem"
                    padding=".2rem .9rem"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="#fff"
                    backgroundColor="#F04438"
                    height="fit-content"
                    borderRadius="50px"
                  >
                    <Text fontsize=".6rem">Live</Text>
                  </Wrapper>

                  <Wrapper
                    margin="0 0 0 .5rem"
                    display="flex"
                    alignItems="center"
                    height="fit-content"
                  >
                    <Eye />
                    <Paragraph margin="0 0 0 .5rem" fontsize="12px">
                      2000
                    </Paragraph>
                  </Wrapper>
                </Wrapper>
              </div>
              <Container
                display="flex"
                flexDirection="column"
                position="absolute"
                top="75%"
                padding="0 0 .5rem .5rem"
              >
                <Text color="#F8DBFB" fontWeight={600} fontsize=".8rem">
                  Elden Rings
                </Text>

                <Wrapper margin=".5rem 0 0 0">
                  <Paragraph color="#D92D20" fontsize=".8rem" fontWeight={600}>
                    Adventure
                  </Paragraph>
                  <Paragraph
                    color="#D92D20"
                    fontsize=".8rem"
                    fontWeight={600}
                    margin="0 0 0 2rem"
                  >
                    Action
                  </Paragraph>
                </Wrapper>
              </Container>
            </StreamStyle>
          ))}
        </Container>
      </Wrapper>
      {openModal && <SoonPopUP modal={setOpenModal} />}
    </Container>
  );
};
export default ActiveStreams;
