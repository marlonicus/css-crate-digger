import React from "react";
import { addIndex, map } from "ramda";
import Record from "../record";
import { unit, Bodies } from "../../utils";

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
            rotateX(-90deg) rotateY(180deg)
            translateZ(${unit(Bodies.Crate.depth * 0.8)});
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

const Crates = ({ crates }) => (
  <>
    {addIndex(map)(
      (crate, index) => (
        <Crate {...crate} index={index} />
      ),
      crates
    )}
  </>
);

export default Crates;
