import React from "react";
import { Container } from "../../styles/commonStyles/Container.styles";
import Login from "./Login";
import logo from "../../assets/images/gamelogo2.png";
import Navbar from "./Navbar";
import { Img } from "../../styles/commonStyles/Img";

interface Props {
  isSignedIn: any;
  wallet: any;
  gamebloc: any;
}
const Header = () => {
  return (
    <Container
      margin="2.75rem 6.25rem 1.5rem 6.25rem"
      xmdmargin="1rem 1rem 1.5rem 1rem"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Img src={logo} alt="" width="9rem" mdwidth="25%" smwidth="6.5rem" />

      {/* <Navbar /> */}
      <Login />
    </Container>
  );
};

export default Header;
