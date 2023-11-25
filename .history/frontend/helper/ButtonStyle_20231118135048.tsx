import React from "react"

interface props {
  className?: string
  backgroundColor?: string
  children?: any
  textColor?: string
  border?: string
  position?: string
  padding?: string
  margin?: string
  borderRadius?: string
  width?: string
  height?: string
  cursor?: string
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  marginBottom?: string
  paddingLeft?: string
  paddingRight?: string
  paddingTop?: string
  paddingBottom?: string
  top?: string
  bottom?: string
  right?: string
  left?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderTop?: string
  borderBottom?: string
  borderRight?: string
  borderLeft?: string
  hoverColor?: string
  hoverBackground?: string
  zIndex?: string
  flexDirection?: string
  display?: string
  justifyContent?: string
  alignItems?: string
  alignSelf?: string
  onClick?: any
  fontSize?: string
  fontWeight?: string

  mddisplay?: string
  mdgridcolumn?: string
  mdwrap?: string
  mdflexdirection?: string
  mdwidth?: string
  mdheight?: string
  mdrowgap?: string
  mdcolumngap?: string
  mdgap?: string
  mdmargin?: string
  mdpadding?: string
  mdradius?: string
  mdalignitems?: string
  mdjustifycontent?: string
  mdflexratio?: string
  mdoverflow?: string
  mdtop?: string
  mdleft?: string
  mdright?: string
  mdbottom?: string

  xmdisplay?: string
  xmdgridcolumn?: string
  xmdwrap?: string
  xmdflexdirection?: string
  xmdwidth?: string
  xmdheight?: string
  xmdrowgap?: string
  xmdcolumngap?: string
  xmdgap?: string
  xmdmargin?: string
  xmdpadding?: string
  xmdradius?: string
  xmdalignitems?: string
  xmdjustifycontent?: string
  xmdflexratio?: string
  xmdoverflow?: string
  xmdtop?: string
  xmdleft?: string
  xmdright?: string
  xmdbottom?: string

  smdisplay?: string
  smgridcolumn?: string
  smwrap?: string
  smflexdirection?: string
  smwidth?: string
  smheight?: string
  smrowgap?: string
  smcolumngap?: string
  smgap?: string
  smmargin?: string
  smpadding?: string
  smradius?: string
  smalignitems?: string
  smjustifycontent?: string
  smflexratio?: string
  smoverflow?: string
  smtop?: string
  smleft?: string
  smright?: string
  smfontsize?: string
  smbottom?: string
  maxdisplay?: string
}

export const ButtonStyled = ({ className, children, onClick }: props) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
