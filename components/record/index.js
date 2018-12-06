import React from "react";
import { unit, Bodies } from "../../utils";

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

export default Record;
