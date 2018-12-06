import React, { useState, useEffect, useContext } from "react";
import randomColor from "randomcolor";
import { map, take, pipe, assoc, lensProp, over, repeat } from "ramda";
import mockData from "../data/mock";
import Table from "../components/table";
import Crates from "../components/crates";
import { getWindow, Bodies } from "../utils";

const setBackground = item => assoc("background", randomColor())(item);
const itemLens = lensProp("items");
const transformDataToCrates = pipe(
  over(itemLens, map(setBackground)),
  over(itemLens, take(10))
);
const data = repeat(transformDataToCrates(mockData), 5);

const MOUSE_EASE = 0.05;
const easeMousePositions = ({ hook, mousePosition, scenePosition }) => () => {
  const xDist = mousePosition.x - scenePosition.x;
  const yDist = mousePosition.y - scenePosition.y;

  if (Math.abs(xDist + yDist) >= 2) {
    hook({
      x: scenePosition.x + xDist * MOUSE_EASE,
      y: scenePosition.y + yDist * MOUSE_EASE
    });
  }
};

const asPercentage = ({ x, y }) => ({
  x: x / getWindow().innerWidth,
  y: y / getWindow().innerHeight
});

const mouseMove = hook => event => {
  hook({
    x: event.clientX,
    y: event.clientY
  });
};

const MousePositionContext = React.createContext();

const MousePosition = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

const App = () => {
  const mousePosition = useContext(MousePositionContext) || { x: 0, y: 0 };

  const [scenePosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(
    easeMousePositions({
      hook: setTargetPosition,
      mousePosition,
      scenePosition
    })
  );

  return (
    <Table mousePosition={asPercentage(scenePosition)}>
      <Crates crates={data} />
    </Table>
  );
};

export default () => (
  <MousePosition>
    <App />
  </MousePosition>
);
