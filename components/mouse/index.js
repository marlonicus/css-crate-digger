import React, { useState } from "react";
import { Bodies } from "../../utils";

const mouseMove = hook => event => {
  hook({
    x: event.clientX,
    y: event.clientY
  });
};

export const MousePositionContext = React.createContext();

export const MousePosition = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0.5,
    y: 0.5
  });

  return (
    <MousePositionContext.Provider value={mousePosition}>
      <style jsx>
        {`
          main {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: ${Bodies.Wall.color2};
            position: relative;
            overflow: hidden;
            perspective: 50vw;
          }
        `}
      </style>
      <main onMouseMove={mouseMove(setMousePosition)}>{children}</main>
    </MousePositionContext.Provider>
  );
};
