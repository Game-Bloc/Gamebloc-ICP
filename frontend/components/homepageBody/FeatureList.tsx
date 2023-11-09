import { Container } from "../../styles/commonStyles/Container.styles";
import { Img } from "../../styles/commonStyles/Img";
import frame from "../../assets/images/frame1.png";
import React from "react";
const FeatureList = () => {
  return (
    <Container margin="15rem 0 0 0">
      <Img src={frame} alt="" width="100%" />
    </Container>
  );
};

export default FeatureList;
