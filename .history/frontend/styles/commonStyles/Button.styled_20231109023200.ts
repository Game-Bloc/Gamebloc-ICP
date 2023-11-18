import styled from "styled-components";
import { ButtonStyled } from "../../helper/ButtonStyle";

export const Button = styled(ButtonStyled)`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#ffffff"};
  color: ${(props) => (props.textColor ? props.textColor : "#000000")};
  position: ${(props) => (props.position ? props.position : "")};
  margin: ${(props) => (props.margin ? props.margin : "0rem 0rem 0rem 0rem")};
  padding: ${(props) =>
    props.padding ? props.padding : "0rem 0rem 0rem 0rem"};
  border: ${(props) => (props.border ? props.border : "none")};
  cursor: ${(props) => props.cursor && "pointer"};
  width: ${(props) => (props.width ? props.width : "initial")};
  height: ${(props) => (props.height ? props.height : "initial")};
  top: ${(props) => (props.top ? props.top : "0rem")};
  bottom: ${(props) => (props.bottom ? props.bottom : "0rem")};
  right: ${(props) => (props.right ? props.right : "0rem")};
  left: ${(props) => (props.left ? props.left : "0rem")};
  display: ${(props) => (props.display ? props.display : "block")};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "initial"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "initial"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "initial")};
  border-width: ${(props) =>
    props.borderWidth ? `${props.borderWidth}` : "unset"};
  border-color: ${(props) =>
    props.borderColor ? `${props.borderColor}` : "unset"};
  border-style: ${(props) =>
    props.borderStyle ? `${props.borderStyle}` : "unset"};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "0rem 0rem 0rem 0rem"};
  border-bottom: ${(props) => props.borderBottom && `${props.borderBottom}`};
  border-top: ${(props) => props.borderTop && `${props.borderTop}`};
  border-left: ${(props) => props.borderLeft && `${props.borderLeft}`};
  border-right: ${(props) => props.borderRight && `${props.borderRight}`};
  z-index: ${(props) => (props.zIndex ? `${props.zIndex}` : "unset")};
  align-self: ${(props) => (props.alignSelf ? `${props.alignSelf}` : "")};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : "14px")};

  &:hover {
    background-color: ${(props) =>
      props.hoverBackground && `${props.hoverBackground}`};
    color: ${(props) => props.hoverColor && `${props.hoverColor}`};
  }

  @media screen and (max-width: 1024px) {
    display: ${(props) => (props.mddisplay ? `${props.mddisplay}` : "")};
    grid-template-columns: ${(props) =>
      props.mdgridcolumn ? `${props.mdgridcolumn}` : ""};
    flex-wrap: ${(props) => props.mdwrap && "wrap"};
    flex-direction: ${(props) =>
      props.mdflexdirection ? `${props.mdflexdirection}` : ""};
    width: ${(props) => (props.mdwidth ? `${props.mdwidth}` : "")};
    height: ${(props) => (props.mdheight ? `${props.mdheight}` : "")};
    row-gap: ${(props) => (props.mdrowgap ? `${props.mdrowgap}` : "")};
    column-gap: ${(props) => (props.mdcolumngap ? `${props.mdcolumngap}` : "")};
    gap: ${(props) => (props.mdgap ? `${props.mdgap}` : "")};
    margin: ${(props) => (props.mdmargin ? `${props.mdmargin}` : "")};
    padding: ${(props) => (props.mdpadding ? `${props.mdpadding}` : "")};
    border-radius: ${(props) => (props.mdradius ? `${props.mdradius}` : "")};
    align-items: ${(props) =>
      props.mdalignitems ? `${props.mdalignitems}` : ""};
    justify-content: ${(props) =>
      props.mdjustifycontent ? `${props.mdjustifycontent}` : ""};
    flex: ${(props) => (props.mdflexratio ? `${props.mdflexratio}` : "")};
    overflow: ${(props) => (props.mdoverflow ? props.mdoverflow : "")};
    top: ${(props) => (props.mdtop ? `${props.mdtop}` : "")};
    left: ${(props) => (props.mdleft ? `${props.mdleft}` : "")};
    right: ${(props) => (props.mdright ? `${props.mdright}` : "")};
    bottom: ${(props) => (props.mdbottom ? `${props.mdbottom}` : "")};
  }

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.xmdisplay ? `${props.xmdisplay}` : "")};
    width: ${(props) => (props.xmdwidth ? `${props.xmdwidth}` : "")};
    grid-template-columns: ${(props) =>
      props.xmdgridcolumn ? `${props.xmdgridcolumn}` : ""};
    flex-wrap: ${(props) => (props.smwrap ? "wrap" : "")};
    grid-template-columns: ${(props) =>
      props.mdgridcolumn ? `${props.mdgridcolumn}` : ""};
    height: ${(props) => (props.xmdheight ? `${props.xmdheight}` : "")};
    flex-direction: ${(props) =>
      props.xmdflexdirection ? `${props.xmdflexdirection}` : ""};
    gap: ${(props) => (props.xmdgap ? `${props.xmdgap}` : "")};
    margin: ${(props) => (props.xmdmargin ? `${props.xmdmargin}` : "")};
    padding: ${(props) => (props.xmdpadding ? `${props.mdpadding}` : "")};
    align-items: ${(props) =>
      props.xmdalignitems ? `${props.xmdalignitems}` : ""};
    justify-content: ${(props) =>
      props.xmdjustifycontent ? `${props.xmdjustifycontent}` : ""};
    overflow: ${(props) => (props.xmdoverflow ? props.xmdoverflow : "")};
    top: ${(props) => (props.xmdtop ? `${props.xmdtop}` : "")};
    left: ${(props) => (props.xmdleft ? `${props.xmdleft}` : "")};
    right: ${(props) => (props.xmdright ? `${props.xmdright}` : "")};
    bottom: ${(props) => (props.xmdbottom ? `${props.xmdbottom}` : "")};
  }

  @media screen and (max-width: 600px) {
    display: ${(props) => (props.smdisplay ? `${props.smdisplay}` : "")};
    grid-template-columns: ${(props) =>
      props.smgridcolumn ? `${props.smgridcolumn}` : ""};
    flex-direction: ${(props) =>
      props.smflexdirection ? `${props.smflexdirection}` : ""};
    width: ${(props) => (props.smwidth ? `${props.smwidth}` : "")};
    align-items: ${(props) =>
      props.smalignitems ? `${props.smalignitems}` : ""};
    height: ${(props) => (props.smheight ? `${props.smheight}` : "")};
    gap: ${(props) => (props.smgap ? `${props.smgap}` : "")};
    margin: ${(props) => (props.smmargin ? `${props.smmargin}` : "")};
    padding: ${(props) => (props.smpadding ? `${props.smpadding}` : "")};
    border-radius: ${(props) => (props.smradius ? `${props.smradius}` : "")};
    overflow: ${(props) => (props.smoverflow ? props.smoverflow : "")};
    top: ${(props) => (props.smtop ? `${props.smtop}` : "")};
    left: ${(props) => (props.smleft ? `${props.smleft}` : "")};
    right: ${(props) => (props.smright ? `${props.smright}` : "")};
    bottom: ${(props) => (props.smbottom ? `${props.smbottom}` : "")};
    font-size: ${(props) =>
      props.smfontsize ? `${props.smfontsize}` : "14px"};
  }
`;
