import React, { useState } from "react";
import randomColor from "randomcolor";
import { map, pipe, assoc, addIndex, lensProp, over, repeat } from "ramda";
import mockData from "../data/mock";

const setBackground = item => assoc("background", randomColor())(item);

const itemLens = lensProp("items");
const transformDataToCrates = pipe(over(itemLens, map(setBackground)));

const data = repeat(transformDataToCrates(mockData), 5);

const CRATE_RECT = {
  width: 200,
  height: 100,
  depth: 100
};

const getWindow = () => (typeof window === "undefined" ? {} : window);

const RECORD_SIZE = 180;

const Record = (record, index) => {
  const [isPeeking, peek] = useState(false);
  const transform = `translate3d(
    ${(CRATE_RECT.width - RECORD_SIZE) / 2}px,
    ${-RECORD_SIZE / 2}px,
    -${(index * 3 + 1) * 2}px
  )`;
  return (
    <li key={record.id}>
      <style jsx>
        {`
          li {
            width: ${RECORD_SIZE}px;
            height: ${RECORD_SIZE}px;
            position: absolute;
            top: 0px;
            left: 0px;
            transform: ${transform};
            background: ${record.background};
            list-style: none;
          }

          li:hover {
            transform: ${transform} translateY(-10px);
          }
        `}
      </style>
    </li>
  );
};

const Crate = ({ items, mousePosition, index }) => {
  const yRotation = 360 - 0 * 20;
  return (
    <ul>
      <style jsx>
        {`
          ul {
            width: ${CRATE_RECT.width}px;
            height: ${CRATE_RECT.height}px;
            position: absolute;
            top: 50%;
            transform-style: preserve-3d;
            left: calc(${index * 20}vw);
            background: grey;
            transform: rotateX(${-25 + mousePosition.y * 10}deg)
              rotateY(${yRotation + mousePosition.x * 10}deg);
          }

          ul:before,
          ul:after {
            display: block;
            content: "";
            width: ${CRATE_RECT.depth}px;
            height: ${CRATE_RECT.height}px;
            position: absolute;
            background: darkgrey;
          }

          ul:before {
            transform: translate3d(${-CRATE_RECT.depth / 2}px, 0, 0)
              rotateY(-90deg) translate3d(${-CRATE_RECT.depth / 2}px, 0, 0);
          }

          ul:after {
            transform: translate3d(${CRATE_RECT.depth * 1.5}px, 0, 0)
              rotateY(-90deg) translate3d(${-CRATE_RECT.depth / 2}px, 0, 0);
          }
        `}
      </style>
      {addIndex(map)(Record, items)}
    </ul>
  );
};

const Crates = ({ crates, mousePosition }) => (
  <div>
    <style jsx>
      {`
        div {
        }
      `}
    </style>
    {addIndex(map)(
      (crate, index) => (
        <Crate {...crate} mousePosition={mousePosition} index={index} />
      ),
      crates
    )}
  </div>
);

const mouseMove = hook => event => {
  hook({
    x: event.clientX,
    y: event.clientY
  });
};

const asPercentage = ({ x, y }) => ({
  x: x / getWindow().innerWidth,
  y: y / getWindow().innerHeight
});

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
            background: black;
            position: relative;
            perspective: 800px;
          }
        `}
      </style>

      <Crates crates={data} mousePosition={asPercentage(mousePosition)} />
    </main>
  );
};
