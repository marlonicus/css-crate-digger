import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import { map, pipe, assoc, addIndex, lensProp, over, repeat } from "ramda";
import mockData from "../data/mock";

const setBackground = item => assoc("background", randomColor())(item);

const itemLens = lensProp("items");
const transformDataToCrates = pipe(over(itemLens, map(setBackground)));

const data = repeat(transformDataToCrates(mockData), 5);

const Bodies = {
  Crate: {
    width: 10,
    height: 5,
    depth: 7.5
  },

  Record: {
    width: 9,
    height: 9
  },

  unit: "vw"
};

const unit = val => `${val}${Bodies.unit}`;

const getWindow = () => (typeof window === "undefined" ? {} : window);

const RECORD_Z_PADDING = 0.3;
const Record = (record, index) => {
  const transform = `translate3d(
    ${unit((Bodies.Crate.width - Bodies.Record.width) / 2)},
    ${unit(-(Bodies.Record.width / 2))},
    ${unit(-(index * RECORD_Z_PADDING + 1))}
  )`;

  return (
    <li key={record.id}>
      <style jsx>
        {`
          li {
            width: ${unit(Bodies.Record.width)};
            height: ${unit(Bodies.Record.height)};
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
          width: ${unit(Bodies.Crate.width)};
          height: ${unit(Bodies.Crate.height)};
          position: relative;
          transform-style: preserve-3d;
          background: darkgrey;
          transform: translateZ(${unit(Bodies.Crate.height / 2)})
            rotateX(-90deg);
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
          width: ${unit(Bodies.Crate.depth)};
          height: ${unit(Bodies.Crate.height)};
          background: grey;
          transform-origin: 0% 50%;
        }

        ul:before {
          transform: rotateY(90deg);
        }

        ul:after {
          transform: translateX(${unit(Bodies.Crate.width)})
            translateY(${unit(-Bodies.Crate.height)}) rotateY(90deg);
        }
      `}
    </style>
    {addIndex(map)(Record, items)}
  </ul>
);

const TABLE_MOUSE_MOVE_AMOUNT = 50;
const TABLE_MOUSE_ROTATE_AMOUNT = 5;
const TABLE_INITIAL_X_ROTATION = 55;
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
          background: sienna;
          position: relative;
          transform-style: preserve-3d;
          transform: translateX(
              ${unit(
                -mousePosition.x * TABLE_MOUSE_MOVE_AMOUNT +
                  TABLE_MOUSE_MOVE_AMOUNT / 2
              )}
            )
            rotateX(
              ${TABLE_INITIAL_X_ROTATION +
                mousePosition.y * TABLE_MOUSE_ROTATE_AMOUNT}deg
            )
            rotateZ(
              ${mousePosition.x * TABLE_MOUSE_ROTATE_AMOUNT -
                TABLE_MOUSE_ROTATE_AMOUNT / 2}deg
            );
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
