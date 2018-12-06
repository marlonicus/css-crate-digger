import React from "react";
import { addIndex, map } from "ramda";
import Record from "../record";
import { unit, Bodies } from "../../utils";

const Label = ({ text }) => (
  <h2>
    <style>
      {`
        h2 {
          background: white;
          color: #333;
          display: inline-block;
          font-family: 'Boogaloo', cursive;
          font-size: ${unit(Bodies.Label.fontSize)};
          left: 50%;
          padding: ${unit(Bodies.Label.padding)};
          position: absolute;
          text-align: center;
          text-transform: uppercase;
          transform: translateX(-50%);
        }
      `}
    </style>
    {text}
  </h2>
);

const Crate = ({ items }) => (
  <article>
    <style jsx>
      {`
        * > :global(h2) {
        }

        article {
          background: ${Bodies.Crate.color};
          display: flex;
          flex-direction: column;
          height: ${unit(Bodies.Crate.height)};
          justify-content: center;
          position: relative;
          transform-style: preserve-3d;
          transform-origin: 50% 100%;
          transform: rotateX(-90deg);
          width: ${unit(Bodies.Crate.width)};
        }

        article:before,
        article:after {
          background: ${Bodies.Crate.color};
          content: "";
          display: block;
          filter: brightness(0.8);
          height: ${unit(Bodies.Crate.height)};
          left: ${unit(-Bodies.Crate.depth)};
          position: absolute;
          transform-origin: 100% 50%;
          transform: rotateY(-90deg);
          width: ${unit(Bodies.Crate.depth)};
        }

        article:after {
          transform-origin: 0% 50%;
          left: ${unit(Bodies.Crate.width)};
          transform: rotateY(90deg);
        }

        ul {
          background: ${Bodies.Crate.color};
          display: block;
          position: absolute;
          top: 0;
          width: ${unit(Bodies.Crate.width)};
          height: ${unit(Bodies.Crate.height)};
          filter: brightness(0.9);
          transform-style: preserve-3d;
          transform: translateZ(${unit(-Bodies.Crate.depth)});
          transform-origin: 50% 0%;
        }
      `}
    </style>
    <Label text="Hip-Hop" />
    <ul>{addIndex(map)(Record, items)}</ul>
  </article>
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
