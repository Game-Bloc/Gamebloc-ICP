import React from "react";

interface props {
  width?: string;
  height?: string;
  className?: string;
  color?: string;
  fontsize?: any;
  children?: any;
  fontWeight?: number;
  fontFamily?: string;
  fontStyle?: string;
  margin?: string;
  padding?: string;
  textAlign?: string;
  cursor?: string;
  position?: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
  onClick?: any;
  opacity?: string;
  display?: string;
  justifycontent?: string;
  alignItems?: string;
  borderRadius?: string;

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
  backgroundColor?: string;
  hovercolor?: string;
  hoverBgColor?: string;
  smfontSize?: string;
  xmfontSize?: string;
  mdfontSize?: string;
  smtextAlign?: string;
}

export const PageText = ({ className, children, onClick }: props) => {
  return (
    <span className={className} onClick={onClick}>
      {children}
    </span>
  );
};
