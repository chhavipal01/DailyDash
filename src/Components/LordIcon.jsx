import React from "react";
import { Player } from "@lordicon/react";

const LordIcon = ({ src, width, height, trigger = "loop" }) => {


  return (
    <Player
      src={src}
      trigger={trigger}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default LordIcon;
