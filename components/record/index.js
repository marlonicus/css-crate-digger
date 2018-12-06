import React from "react";
import { unit, Bodies } from "../../utils";

const RECORD_Z_PADDING = 0.4;

const Record = (record, index) => {
  const transform = ``;

  // translate3d(
  //   ${unit((Bodies.Crate.width - Bodies.Record.width) / 2)},
  //   ${unit(-(Bodies.Record.width / 2))},
  //   ${unit(-((index + 1) * RECORD_Z_PADDING))}
  // )

  /**

  @TODO:

  Need to apply the hover effect to sibling children *without*
  the transform. Might need to nest multiple elements to do this.

  */
  return (
    <li key={record.id}>
      <style jsx>
        {`
          li {
            transform-style: preserve-3d;
            transform-origin: 50% 100%;
            width: ${unit(Bodies.Record.width)};
            height: ${unit(Bodies.Record.height)};
            position: absolute;
            transition: transform 200ms;
            transform: rotateX(10deg);
            top: ${unit(-(Bodies.Record.width / 2))};
            left: ${unit((Bodies.Crate.width - Bodies.Record.width) / 2)};
            transform: ;
            background-size: cover;
            background-position: center center;
            list-style: none;
          }

          li:hover ~ :global(li) {
            transform: rotateX(-20deg);
          }

          img {
            transform-origin: 50% 100%;
            transform: translateZ(${unit((index + 10) * RECORD_Z_PADDING)});
            transition: transform 200ms ease-out;
            width: 100%;
            height: 100%;
            background: ${record.background};
          }
        `}
      </style>
      <img src={`${record.images[0].url}`} alt="" />
    </li>
  );
};

export default Record;
