/// <reference path="../../react-app-env.d.ts" />
import { Container } from "../../styles/commonStyles/Container.styles";
import { Img } from "../../styles/commonStyles/Img";
import img1 from "../../assets/images/heroImg.png";
import img2 from "../../assets/images/img.png";
import img3 from "../../assets/images/img1.png";
import { Text } from "../../styles/commonStyles/Text";
import { Paragraph } from "../../styles/commonStyles/Paragraph";
import React from "react";
const Hero = () => {
  return (
    <Container
      backgroundColor="#01070E"
      width="100%"
      position="relative"
      smmargin="2rem 0 0 0"
    >
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          smmargin="1rem 0 .2rem 0"
          margin="5rem 0 0 0"
          className="heroHeading"
          width="60%"
          smwidth="80%"
          textAlign="center"
          fontWeight={400}
          smfontSize="1.5rem"
          xmfontSize="2rem"
          mdfontSize="3.5rem"
          fontsize="4.5rem"
          color="#F6B8FC"
        >
          Unlock the future of web3 gaming
        </Text>
        <Paragraph
          width="45%"
          smwidth="90%"
          smfontSize=".8rem"
          fontWeight={400}
          color="#F8DBFB"
          textAlign="center"
          margin=".5rem 0 0 0"
          smmargin="0"
        >
          Your Hub for Next-Gen Gaming! Join Crowdfunded Tournaments, Win
          Prizes, and Empower Developers by Hosting Game Launch Events. The
          Ultimate Social Platform for Gamers Awaits.
        </Paragraph>
      </Container>
      <Img
        src={img1}
        alt="img"
        width="100%"
        blend="overlay"
        margin="-10rem 0 0 0"
      />
      <Img
        src={img2}
        alt="img"
        position="absolute"
        left="0px"
        top="8%"
        smtop="80%"
        width="35%"
      />
      <Img
        src={img3}
        alt="img"
        position="absolute"
        right="0px"
        top="21%"
        smtop="90%"
        width="35%"
      />
    </Container>
  );
};
export default Hero;
