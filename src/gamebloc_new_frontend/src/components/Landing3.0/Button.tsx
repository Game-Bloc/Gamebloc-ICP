import React from "react"

interface Props {
  text: string | undefined
  style?: string
}
function Button({ text, style }: Props) {
  return (
    <button
      className={`bg-button px-3 py-2 md:px-10 md:py-3 rounded-sm font-opsans text-[10px] md:text-xs transition-colors duration-500 hover:bg-gradient-to-r hover:from-[#F6B8FC] hover:to-[#E875FC] ${style}`}
    >
      {text}
    </button>
  )
}

export default Button
