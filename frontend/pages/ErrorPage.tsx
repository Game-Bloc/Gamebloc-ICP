import { Img } from "../styles/commonStyles/Img";
import { Wrapper } from "../styles/commonStyles/Wrapper";
import errorImg from "../assets/images/error.png";
import { Text } from "../styles/commonStyles/Text";
import { Paragraph } from "../styles/commonStyles/Paragraph";
import React from "react";

const ErrorPage = () => {
  return (
    <Wrapper
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Img src={errorImg} alt="" />
      <Text
        fontStyle="normal"
        fontWeight={700}
        fontsize="2.2rem"
        margin="0 0 0 1rem"
      >
        No Result Found
      </Text>

      <Paragraph
        fontStyle="normal"
        fontWeight={300}
        fontsize="1rem"
        textAlign="center"
      >
        We couldn’t find what you searched for.
        <br />
        Try searching again
      </Paragraph>
    </Wrapper>
  );
};

export default ErrorPage;
