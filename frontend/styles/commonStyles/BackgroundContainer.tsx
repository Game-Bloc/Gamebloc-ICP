import styled from "styled-components";
import { BackgroundImgStyle as BackContainer } from "../../helper/BackgroundImgStyle";

export const BackgroundContainer = styled(BackContainer)`
width: ${(props) => (props.width ? props.width : "initial")};
  height: ${(props) => (props.height ? props.height : "initial")};
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  margin: ${(props) => (props.margin ? props.margin : '0rem 0rem 0rem 0rem')};
  padding: ${(props) => (props.padding ? props.padding : '0rem 0rem 0rem 0rem')};
  position:  ${(props) => (props.position ? props.position : 'initial')};
  top: ${(props) => (props.top ? props.top : '0rem')};
  bottom: ${(props) => (props.bottom ? props.bottom : '0rem')};
  right: ${(props) => (props.right ? props.right : '0rem')};
  left: ${(props) => (props.left ? props.left : '0rem')};
  display: ${(props) => (props.display ? props.display : 'block')};
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'initial')};
  justify-content:  ${(props) => (props.justifyContent ? props.justifyContent : 'initial')};
  align-items:  ${(props) => (props.alignItems ? props.alignItems : 'initial')};
  background-image: url('${(props) => props.backgroundImg ? props.backgroundImg : 'none' }'); 
`;