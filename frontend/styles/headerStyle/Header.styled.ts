import styled from "styled-components";
import { PageText as HeaderText } from "../../helper/PageText";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.header};
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2rem, 5rem;
  h1 {
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.01em;
    color: #ffffff;
  }
`;

export const Text = styled(HeaderText)`
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  font-size: ${(props) => (props.fontsize ? props.fontsize : "16px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "300")};
  font-style: ${(props) => (props.fontStyle ? props.fontStyle : "normal")};
`;

export const StyledNavbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
    color: #f8dbfb;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    margin: 0 1rem;
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
