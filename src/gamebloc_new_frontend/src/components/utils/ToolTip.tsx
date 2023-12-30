import React, { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  tooltip?: string;
}

const ToolTip = ({ children, tooltip }: Props) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();
        tooltipRef.current.style.left = clientX - left + "px";
      }}
      className="group relative "
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="invisible group-hover:visible text-white text-[.6rem] opacity-0 group-hover:opacity-100 bg-white/20 p-1 rounded transition top-full mt-2 whitespace-nowrap"
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export default ToolTip;
