import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import { map, pipe, assoc, lensProp, over, repeat } from "ramda";
import mockData from "../data/mock";
import Table from "../components/table";
import Crates from "../components/crates";
import { getWindow } from "../utils";

const setBackground = item => assoc("background", randomColor())(item);
const itemLens = lensProp("items");
const transformDataToCrates = pipe(over(itemLens, map(setBackground)));
const data = repeat(transformDataToCrates(mockData), 5);

const mouseMove = hook => event => {
  hook({
    x: event.clientX,
    y: event.clientY
  });
};

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

export default () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scenePosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(
    easeMousePositions({
      hook: setTargetPosition,
      mousePosition,
      scenePosition
    })
  );

  if (mousePosition)
    return (
      <main onMouseMove={mouseMove(setMousePosition, mousePosition)}>
        <style jsx>
          {`
            main {
              width: 100vw;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              background: black;
              position: relative;
              overflow: hidden;
              perspective: 50vw;
            }
          `}
        </style>

        <Table mousePosition={asPercentage(scenePosition)}>
          <Crates crates={data} />
        </Table>
      </main>
    );

  return <p>...</p>;
};
