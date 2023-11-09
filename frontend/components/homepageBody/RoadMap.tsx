import { Container } from "../../styles/commonStyles/Container.styles";
import { Img } from "../../styles/commonStyles/Img";
import frame from "../../assets/images/frame2.png";
import React from "react";
const RoadMap = () => {
  return (
    <Container margin="8rem 0 0 0">
      <Img src={frame} alt="" width="100%" />
    </Container>
  );
};

export default RoadMap;
