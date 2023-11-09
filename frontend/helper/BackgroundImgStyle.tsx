import React from "react"

interface props {
  width?: string
  backgroundImg?: any
  height?: string
  display?: string
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
  className?: string
  color?: string
  margin?: string
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  marginBottom?: string
  children?: any
  padding?: string
  paddingLeft?: string
  paddingRight?: string
  paddingTop?: string
  paddingBottom?: string
  position?: string
  top?: string
  bottom?: string
  right?: string
  left?: string
}
export const BackgroundImgStyle = ({ className, children }: props) => {
  return <div className={className}>{children}</div>
}
