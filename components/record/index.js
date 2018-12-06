import React from "react";
import { unit, Bodies } from "../../utils";

const RECORD_Z_PADDING = 0.5;

const Record = ({ onFocus, index, isScrolledThrough, ...record }) => (
  <li
    key={record.id}
    onMouseOver={() => onFocus(index)}
    onFocus={() => onFocus(index)}
  >
    <style jsx>
      {`
        li {
          cursor: pointer;
          transform-style: preserve-3d;
          transform-origin: 50% 100%;
          width: ${unit(Bodies.Record.width)};
          height: ${unit(Bodies.Record.height)};
          position: absolute;
          transition: transform 150ms;
          transform: translateZ(${unit((index + 5) * RECORD_Z_PADDING)})
            rotateX(${isScrolledThrough ? "-20deg" : "20deg"})
            translateZ(${isScrolledThrough ? "1vw" : "0"});
          top: ${unit(-(Bodies.Record.width / 2))};
          left: ${unit((Bodies.Crate.width - Bodies.Record.width) / 2)};
          transform: ;
          background-size: cover;
          background-position: center center;
          list-style: none;
          background: ${record.background};
        }

        img {
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

export default Record;
