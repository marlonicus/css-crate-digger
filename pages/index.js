import React, { useState } from "react";
import randomColor from "randomcolor";
import { map, pipe, assoc, addIndex, lensProp, over, repeat } from "ramda";
import mockData from "../data/mock";

const setBackground = item => assoc("background", randomColor())(item);

const itemLens = lensProp("items");
const transformDataToCrates = pipe(over(itemLens, map(setBackground)));

const crates = repeat(transformDataToCrates(mockData), 5);

const Record = (record, index) => (
  <li key={record.id}>
    <style jsx>
      {`
        li {
          width: 200px;
          height: 200px;
          position: absolute;
          top: ${index}px;
          left: ${index}px;
          background: ${record.background};
          list-style: none;
        }
      `}
    </style>
  </li>
);

const Crate = ({ items, mousePosition, index }) => (
  <ul>
    <style jsx>
      {`
        ul {
          width: 200px;
          height: 200px;
          position: absolute;
          top: 50%;
          left: calc(${index * 20}vw);
          background: grey;
        }
      `}
    </style>
    {addIndex(map)(Record, items)}
  </ul>
);

const mouseMove = hook => event => {
  hook({
    x: event.clientX,
    y: event.clientY
  });
};

export default () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <main onMouseMove={mouseMove(setMousePosition)}>
      <style jsx>
        {`
          main {
            width: 100vw;
            height: 100vh;
            display: block;
            background: ${randomColor()};
            position: relative;
          }
        `}
      </style>

      {addIndex(map)(
        (crate, index) => (
          <Crate {...crate} mousePosition={mousePosition} index={index} />
        ),
        crates
      )}
    </main>
  );
};
