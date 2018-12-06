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
          padding-bottom: 1vw;
          width: ${unit(Bodies.Table.width)};
          height: ${unit(Bodies.Table.depth)};
          background: ${Bodies.Table.color};
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

export default Table;
