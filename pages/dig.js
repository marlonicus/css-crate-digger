import React, { useState, useEffect, useContext } from "react";
import randomColor from "randomcolor";
import { map, take, pipe, assoc, lensProp, over, repeat } from "ramda";
import mockData from "../data/mock";
import Table from "../components/table";
import Crates from "../components/crates";
import { MousePosition } from "../components/mouse";
import { Camera, CameraContext } from "../components/camera";
import { getWindow } from "../utils";

const setBackground = item => assoc("background", randomColor())(item);
const itemLens = lensProp("items");
const transformDataToCrates = pipe(
  over(itemLens, map(setBackground)),
  over(itemLens, take(10))
);
const data = repeat(transformDataToCrates(mockData), 5);

const onSetSelectedRecord = hook => (crateIndex, recordIndex) =>
  hook({ crateIndex, recordIndex });

const asPercentage = ({ x, y }) => ({
  x: x / getWindow().innerWidth,
  y: y / getWindow().innerHeight
});

const App = () => {
  const cameraPosition = useContext(CameraContext) || { x: 0.5, y: 0.5 };

  const [selectedRecord, setSelectedRecord] = useState({
    crateIndex: false,
    recordIndex: false
  });

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
    <Camera>
      <App />
    </Camera>
  </MousePosition>
);
