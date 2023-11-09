import React from "react";
import { Paragraph } from "../../styles/commonStyles/Paragraph";
import { StyledNavbar } from "../../styles/headerStyle/Header.styled";

const Navbar = () => {
  return (
    <StyledNavbar>
      <Paragraph margin="0 2rem 0 0" color="#F8DBFB" fontWeight={400} fontsize="1rem"  cursor="pointer">About</Paragraph>
      <Paragraph margin="0 2rem" color="#F8DBFB" fontWeight={400} fontsize="1rem" cursor="pointer">Features</Paragraph>
      <Paragraph margin="0 0 0 2rem" color="#F8DBFB" fontWeight={400} fontsize="1rem" cursor="pointer">Social</Paragraph>
          
    </StyledNavbar> 
  );
};

export default Navbar;
