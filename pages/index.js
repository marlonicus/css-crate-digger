import React, { useState, useEffect } from "react";
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
  depth: 150
};

const getWindow = () => (typeof window === "undefined" ? {} : window);

const RECORD_SIZE = 180;

const Record = (record, index) => {
  const transform = `translate3d(
    ${(CRATE_RECT.width - RECORD_SIZE) / 2}px,
    ${-RECORD_SIZE / 2}px,
    -${(index * 4 + 1) * 2}px
  )`;

  return (
    <li key={record.id}>
      <style jsx>
        {`
          li {
            width: ${RECORD_SIZE}px;
            height: ${RECORD_SIZE}px;
            position: absolute;
            transition: transform 400ms;
            top: 0px;
            left: 0px;
            transform: ${transform};
            background: no-repeat ${record.background}
              url(${record.images[0].url});
            background-size: cover;
            background-position: center center;
            list-style: none;
          }

          li:hover {
            transform: ${transform} translateY(-100px);
          }
        `}
      </style>
    </li>
  );
};

const Crate = ({ items }) => (
  <ul>
    <style jsx>
      {`
        ul {
          width: ${CRATE_RECT.width}px;
          height: ${CRATE_RECT.height}px;
          position: relative;
          transform-style: preserve-3d;
          background: darkgrey;
          transform: translateZ(${CRATE_RECT.height / 2}px) rotateX(-90deg);
        }

        ul:nth-child(3) {
          z-index: 3;
        }

        ul:nth-child(4) {
          z-index: 2;
        }

        ul:nth-child(5) {
          z-index: 1;
        }

        ul:before,
        ul:after {
          display: block;
          content: "";
          width: ${CRATE_RECT.depth}px;
          height: ${CRATE_RECT.height}px;
          background: grey;
          transform-origin: 0% 50%;
        }

        ul:before {
          transform: rotateY(90deg);
        }

        ul:after {
          transform: translateX(${CRATE_RECT.width}px)
            translateY(-${CRATE_RECT.height}px) rotateY(90deg);
        }
      `}
    </style>
    {addIndex(map)(Record, items)}
  </ul>
);

const Table = ({ children, mousePosition }) => (
  <section>
    <style jsx>
      {`
        section {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          width: 70vw;
          height: 50vw;
          background: red;
          position: relative;
          transform-style: preserve-3d;
          transform: translateX(${-mousePosition.x * 500 + 250}px)
            rotateX(${55 + mousePosition.y * 5}deg)
            rotateZ(${mousePosition.x * 5 - 2.5}deg);
        }
      `}
    </style>
    {children}
  </section>
);

const Crates = ({ crates, mousePosition }) => (
  <Table mousePosition={mousePosition}>
    {addIndex(map)(
      (crate, index) => (
        <Crate {...crate} index={index} />
      ),
      crates
    )}
  </Table>
);

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

        <Crates crates={data} mousePosition={asPercentage(scenePosition)} />
      </main>
    );

  return <p>...</p>;
};
