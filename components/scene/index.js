import React from "react";
import { unit, Bodies } from "../../utils";

const SCENE_MOUSE_MOVE_AMOUNT = 45;
const SCENE_MOUSE_ROTATE_AMOUNT = 5;
const SCENE_INITIAL_X_ROTATION = 50;

const Scene = ({ children, cameraPosition }) => (
  <section>
    <style jsx>
      {`
        section {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          width: ${unit(Bodies.Table.width)};
          height: ${unit(Bodies.Table.depth)};
          background: ${Bodies.Table.color2};
          position: relative;
          margin-bottom: 2vw;
          transform-style: preserve-3d;
          transform: translateX(
              ${unit(
                -cameraPosition.x * SCENE_MOUSE_MOVE_AMOUNT +
                  SCENE_MOUSE_MOVE_AMOUNT / 2
              )}
            )
            rotateX(
              ${SCENE_INITIAL_X_ROTATION +
                cameraPosition.y * SCENE_MOUSE_ROTATE_AMOUNT}deg
            )
            rotateZ(
              ${cameraPosition.x * SCENE_MOUSE_ROTATE_AMOUNT -
                SCENE_MOUSE_ROTATE_AMOUNT / 2}deg
            );
        }

        /* Back wall */
        section:before {
          display: block;
          content: "";
          background: ${Bodies.Wall.color1};
          width: 90vw;
          height: 90vw;
          position: absolute;
          transform: rotateX(90deg) translateZ(-25vw);
        }

        /* Table front */
        section:after {
          display: block;
          content: "";
          background: ${Bodies.Table.color1};
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

export default Scene;
