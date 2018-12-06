import React from "react";
import { unit, Bodies } from "../../utils";

const RECORD_Z_PADDING = 0.4;

const Record = (record, index) => {
  const transform = `translate3d(
    ${unit((Bodies.Crate.width - Bodies.Record.width) / 2)},
    ${unit(-(Bodies.Record.width / 2))},
    ${unit(-((index + 1) * RECORD_Z_PADDING))}
  ) rotateY(180deg)`;

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
            transform-origin: 50% 100%;
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

          li:hover ~ :global(li) {
            top: 20px;
          }
        `}
      </style>
    </li>
  );
};

export default Record;
