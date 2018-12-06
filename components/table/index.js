import React from "react";
import { unit, Bodies } from "../../utils";

const TABLE_MOUSE_MOVE_AMOUNT = 50;
const TABLE_MOUSE_ROTATE_AMOUNT = 10;
const TABLE_INITIAL_X_ROTATION = 55;

const Table = ({ children, mousePosition }) => (
  <section>
    <style jsx>
      {`
        section {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          width: ${unit(Bodies.Table.width)};
          height: ${unit(Bodies.Table.depth)};
          background: ${Bodies.Table.color};
          position: relative;
          margin-bottom: 5vw;
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

        /* Back wall */
        section:before {
          display: block;
          content: "";
          background: ${Bodies.Wall.color1};
          width: 90vw;
          height: 100vw;
          position: absolute;
          transform: rotateX(90deg) translateZ(-25vw);
        }

        /* Table front */
        section:after {
          display: block;
          content: "";
          background: ${Bodies.Table.color2};
          width: ${unit(Bodies.Table.width)};
          height: ${unit(Bodies.Table.thickness)};
          position: absolute;
          bottom: 0;
          transform-origin: 50% 100%;
          transform: rotateX(90deg);
        }
      `}
    </style>
    {children}
  </section>
);

export default Table;
