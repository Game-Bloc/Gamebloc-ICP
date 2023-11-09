import React from "react";

interface props {
  width?: string;
  height?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  className?: string;
  color?: string;
  margin?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  children?: any;
  padding?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  position?: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
  backgroundColor?: string;
  gridColumn?: string;
  gap?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
  borderTop?: string;
  borderBottom?: string;
  borderRight?: string;
  borderLeft?: string;
  hoverColor?: string;
  hoverBackground?: string;
  zIndex?: string;
  cursor?: string;
  overFlowY?: string;
  onClick?: any;
  hovercolor?: string;
  hoverBgColor?: string;
  flexWrap?: string;

  mddisplay?: string;
  mdgridcolumn?: string;
  mdwrap?: string;
  mdflexdirection?: string;
  mdwidth?: string;
  mdheight?: string;
  mdrowgap?: string;
  mdcolumngap?: string;
  mdgap?: string;
  mdmargin?: string;
  mdpadding?: string;
  mdradius?: string;
  mdalignitems?: string;
  mdjustifycontent?: string;
  mdflexratio?: string;
  mdoverflow?: string;
  mdtop?: string;
  mdleft?: string;
  mdright?: string;
  mdbottom?: string;

  xmdisplay?: string;
  xmdgridcolumn?: string;
  xmdwrap?: string;
  xmdflexdirection?: string;
  xmdwidth?: string;
  xmdheight?: string;
  xmdrowgap?: string;
  xmdcolumngap?: string;
  xmdgap?: string;
  xmdmargin?: string;
  xmdpadding?: string;
  xmdradius?: string;
  xmdalignitems?: string;
  xmdjustifycontent?: string;
  xmdflexratio?: string;
  xmdoverflow?: string;
  xmdtop?: string;
  xmdleft?: string;
  xmdright?: string;
  xmdbottom?: string;

  smdisplay?: string;
  smgridcolumn?: string;
  smwrap?: string;
  smflexdirection?: string;
  smwidth?: string;
  smheight?: string;
  smrowgap?: string;
  smcolumngap?: string;
  smgap?: string;
  smmargin?: string;
  smpadding?: string;
  smradius?: string;
  smalignitems?: string;
  smjustifycontent?: string;
  smflexratio?: string;
  smoverflow?: string;
  smtop?: string;
  smleft?: string;
  smright?: string;
  smbottom?: string;
  maxdisplay?: string;
}
export const ContainerStyle = ({ className, children, onClick }: props) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};
