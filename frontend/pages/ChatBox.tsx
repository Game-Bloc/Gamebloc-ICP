import { Container } from "../styles/commonStyles/Container.styles";
import { Img } from "../styles/commonStyles/Img";
import { Wrapper } from "../styles/commonStyles/Wrapper";
import avatar1 from "../assets/images/avatar4.png";
import { Text } from "../styles/commonStyles/Text";
import groupImg from "../assets/images/groupImg.png";
import { Paragraph } from "../styles/commonStyles/Paragraph";
import LeftChatBox from "../components/chatboxComponents/LeftChatBox";
import RightChatBox from "../components/chatboxComponents/RightChatBox";
import { InputField } from "../styles/commonStyles/InputField";
import { Emoji, Image, Location, Mic } from "../styles/icon/Icons";
import { Button } from "../styles/commonStyles/Button.styled";
import React from "react";

const ChatBox = () => {
  return (
    <Container
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.2)"
      borderStyle="solid"
      borderRadius="10px"
      margin="1rem 0 0 0"
      display="flex"
      flexDirection="column"
    >
      <Wrapper
        backgroundColor="#344054"
        borderRadius="10px 10px 0 0"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
      >
        <Wrapper
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Img src={avatar1} alt="" width="2.7rem" height="2.7rem" />
          <Text
            fontsize="1.2rem"
            fontStyle="normal"
            fontWeight={700}
            margin="0 0 0 1rem"
          >
            Superbowl Chatroom
          </Text>
        </Wrapper>

        <Wrapper
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
        >
          <Img src={groupImg} alt="" />
          <Paragraph margin="0 0 0 1rem" fontWeight={600}>
            6+ more
          </Paragraph>
        </Wrapper>
      </Wrapper>

      <Container
        display="flex"
        flexDirection="column"
        className="chatboxLayout"
        margin="0 0 1rem 0"
        overFlowY="scroll"
        height="20rem"
      >
        <Wrapper
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          margin="1rem"
        >
          <Text color="#98A2B3" fontsize="1rem">
            Today, January 14
          </Text>
        </Wrapper>

        <LeftChatBox />
        <LeftChatBox />
        <RightChatBox />
      </Container>

      <Container
        backgroundColor="#344054"
        borderRadius="0 0 10px 10px"
        display="flex"
        flexDirection="row"
        padding="1rem"
        justifyContent="space-between"
        alignItems="center"
      >
        <Wrapper
          backgroundColor="#01070E"
          borderRadius="10px"
          width="70%"
          display="flex"
        >
          <Container
            display="flex"
            flexDirection="row"
            alignItems="center"
            padding="0rem 2rem 0rem 1.5rem"
            width="100%"
          >
            <Mic />
            <InputField
              type="text"
              noneBorder="none"
              color="#fff"
              placeHolderColor="#ffffff"
              placeholder="Add a comment"
            />
            <Wrapper display="flex" flexDirection="row" alignItems="center">
              <Location />
              <Image />
              <Emoji />
            </Wrapper>
          </Container>
        </Wrapper>

        <Button
          backgroundColor="#F6B8FC"
          borderRadius="10px"
          padding=".6rem 1rem .5rem 1rem"
          textColor="#01070E"
        >
          Send Message
        </Button>
      </Container>
    </Container>
  );
};

export default ChatBox;
