import React from "react"

interface props {
  className?: string
  borderRadius?: string
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  marginBottom?: string
  border?: string
  width?: string
  height?: string
  background?: string
  color?: string
  padding?: string
  borderSize?: string
  noneBorder?: string
  placeHolderColor?: string
  hborder?: string
  lgWidth?: string
  mdWidth?: string
  smWidth?: string
  type: any
  placeholder: string
  onChange?: any
  value?: any

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
  smbottom?: string
  maxdisplay?: string
  smfontSize?: string
}

export const TextFieldStyled = ({
  className,
  type,
  placeholder,
  onChange,
  value,
}: props) => {
  return (
    <input
      className={className}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  )
}
