import { Container } from "../../styles/commonStyles/Container.styles";
import { Img } from "../../styles/commonStyles/Img";
import avatar from "../../assets/images/avatar.png";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { Text } from "../../styles/headerStyle/Header.styled";
import { Paragraph } from "../../styles/commonStyles/Paragraph";
import React from "react";

const LeftChatBox = () => {
  return (
    <Wrapper
      width="100%"
      display="flex"
      justifyContent="flex-start"
      margin="1rem 0 0 0"
    >
      <Container
        display="grid"
        gridColumn="repeat(1, 1fr)"
        width="50%"
        margin="0 0 0 1rem"
      >
        <Wrapper display="flex" flexDirection="row">
          <Img src={avatar} alt="" width="2.5rem" height="2.5rem" />

          <Container
            display="flex"
            flexDirection="column"
            margin=".3rem 0 0 1rem"
          >
            <Wrapper
              display="flex"
              flexDirection="row"
              alignItems="center"
              margin="0 0 1rem 0"
            >
              <Text fontStyle="normal" fontsize="1.1rem" fontWeight={600}>
                Deonorla
              </Text>

              <Paragraph
                color="#98A2B3"
                fontStyle="normal"
                fontsize=".7rem"
                fontWeight={400}
                margin="0 0 0 1rem"
              >
                10:00pm
              </Paragraph>
            </Wrapper>

            <Wrapper
              backgroundColor="#344054"
              padding="1rem"
              borderRadius="0 10px 0 10px"
            >
              <Text fontsize=".8rem">
                Lorem ipsum dolor sit amet consectetur. Nisi placerat euismod
                luctus neque risus viverra ultricies. Porttitor volutpat velit
                dolor bibendum amet justo urna orci.
              </Text>
            </Wrapper>
          </Container>
        </Wrapper>
      </Container>
    </Wrapper>
  );
};

export default LeftChatBox;
