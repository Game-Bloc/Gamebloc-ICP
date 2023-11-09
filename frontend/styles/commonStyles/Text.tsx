import styled from "styled-components";
import { PageText as HeaderText } from "../../helper/PageText";

export const Text = styled(HeaderText)`
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  font-size: ${(props) => (props.fontsize ? props.fontsize : "16px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "300")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "unset")};
  width: ${(props) => (props.width ? `${props.width}` : "unset")};
  height: ${(props) => (props.height ? `${props.height}` : "unset")};
  margin: ${(props) => (props.margin ? `${props.margin}` : "unset")};
  cursor: ${(props) => props.cursor && "pointer"};
  position: ${(props) => (props.position ? props.position : "initial")};
  top: ${(props) => (props.top ? props.top : "unset")};
  bottom: ${(props) => (props.bottom ? props.bottom : "unset")};
  right: ${(props) => (props.right ? props.right : "unset")};
  left: ${(props) => (props.left ? props.left : "unset")};
  opacity: ${(props) => (props.opacity ? props.opacity : "unset")};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "unset"};

  &:hover {
    color: ${(props) => (props.hovercolor ? `${props.hovercolor}` : "")};
    background-color: ${(props) =>
      props.hoverBgColor && `${props.hoverBgColor}`};
  }

  &:hover {
    color: ${(props) => (props.hovercolor ? `${props.hovercolor}` : "")};
    background-color: ${(props) =>
      props.hoverBgColor ? `${props.hoverBgColor}` : ""};
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
    font-size: ${(props) => (props.mdfontSize ? `${props.mdfontSize}` : "")};
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
    font-size: ${(props) => (props.xmfontSize ? `${props.xmfontSize}` : "")};
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
    font-size: ${(props) => (props.smfontSize ? `${props.smfontSize}` : "")};
    text-align: ${(props) => (props.smtextAlign ? `${props.smtextAlign}` : "")};
  }
`;
