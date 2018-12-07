import React, { useState, useEffect, useContext } from "react";
import randomColor from "randomcolor";
import { map, take, pipe, assoc, lensProp, over, repeat } from "ramda";
import mockData from "../data/mock";
import Table from "../components/table";
import Crates from "../components/crates";
import { MousePositionContext, MousePosition } from "../components/mouse";
import { getWindow } from "../utils";

const setBackground = item => assoc("background", randomColor())(item);
const itemLens = lensProp("items");
const transformDataToCrates = pipe(
  over(itemLens, map(setBackground)),
  over(itemLens, take(10))
);
const data = repeat(transformDataToCrates(mockData), 5);

const MOUSE_EASE = 0.1;
const easeMousePositions = ({ hook, mousePosition, cameraPosition }) => () => {
  const xDist = mousePosition.x - cameraPosition.x;
  const yDist = mousePosition.y - cameraPosition.y;

  if (Math.abs(xDist + yDist) >= 2) {
    hook({
      x: cameraPosition.x + xDist * MOUSE_EASE,
      y: cameraPosition.y + yDist * MOUSE_EASE
    });
  }
};

const asPercentage = ({ x, y }) => ({
  x: x / getWindow().innerWidth,
  y: y / getWindow().innerHeight
});

const onSetSelectedRecord = hook => (crateIndex, recordIndex) =>
  hook({ crateIndex, recordIndex });

const App = () => {
  const mousePosition = useContext(MousePositionContext) || { x: 0.5, y: 0 };
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });

  const [selectedRecord, setSelectedRecord] = useState({
    crateIndex: false,
    recordIndex: false
  });

  useEffect(
    easeMousePositions({
      hook: setCameraPosition,
      mousePosition,
      cameraPosition
    })
  );

  return (
    <Table
      selectedRecord={selectedRecord}
      cameraPosition={asPercentage(cameraPosition)}
    >
      <Crates
        crates={data}
        selectedRecord={selectedRecord}
        setSelectedRecord={onSetSelectedRecord(setSelectedRecord)}
      />
    </Table>
  );
};

export default () => (
  <MousePosition>
    <App />
  </MousePosition>
);
