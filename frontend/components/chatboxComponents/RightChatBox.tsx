import { Container } from "../../styles/commonStyles/Container.styles";
import { Img } from "../../styles/commonStyles/Img";
import { Wrapper } from "../../styles/commonStyles/Wrapper";
import { Text } from "../../styles/commonStyles/Text";
import { Paragraph } from "../../styles/commonStyles/Paragraph";
import avatar from "../../assets/images/avatar2.png";
import React from "react";

const RightChatBox = () => {
  return (
    <Wrapper
      width="100%"
      display="flex"
      justifyContent="flex-end"
      margin="1rem 0 0 0"
    >
      <Container
        display="grid"
        gridColumn="repeat(1, 1fr)"
        width="50%"
        margin="0 1rem 0 0"
      >
        <Wrapper display="flex" flexDirection="row">
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
              width="100%"
              justifyContent="flex-end"
            >
              <Paragraph
                color="#98A2B3"
                fontStyle="normal"
                fontsize=".7rem"
                fontWeight={400}
                margin="0 1rem 0 1rem"
              >
                10:00pm
              </Paragraph>

              <Text fontStyle="normal" fontsize="1.1rem" fontWeight={600}>
                You
              </Text>

              <Img
                src={avatar}
                alt=""
                width="2.5rem"
                height="2.5rem"
                margin="0 0 0 1rem"
              />
            </Wrapper>

            <Wrapper
              backgroundColor="#F6B8FC"
              padding="1rem"
              borderRadius="10px 0 10px 10px"
            >
              <Text color="#01070E" fontsize=".8rem">
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

export default RightChatBox;
