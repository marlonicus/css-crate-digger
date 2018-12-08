import React from "react";
import { unit, Bodies } from "../../utils";

const RECORD_Z_PADDING = 0.5;

const Record = ({
  onFocus,
  onSelect,
  index,
  isSelected,
  isScrolledThrough,
  ...record
}) => {
  const zTransform = `translateZ(${unit((index + 5) * RECORD_Z_PADDING)})`;

  const defaultTransform = `${zTransform}
    rotateX(${isScrolledThrough ? "-20deg" : "20deg"})
    translateZ(${isScrolledThrough ? "1vw" : "0"})`;

  return (
    <li key={record.id} className={isSelected && "selected"}>
      <style jsx>
        {`
          li {
            transform-style: preserve-3d;
            transform-origin: 50% 100%;
            width: ${unit(Bodies.Record.width)};
            height: ${unit(Bodies.Record.height)};
            position: absolute;
            transition: transform 150ms;
            transform: ${defaultTransform};
            top: ${unit(-(Bodies.Record.width / 2))};
            left: ${unit((Bodies.Crate.width - Bodies.Record.width) / 2)};
            list-style: none;
            background: ${record.background};
          }

          li.selected {
            transform: ${zTransform} translateY(-10vw);
          }

          button {
            cursor: pointer;
            border: 0.05vw solid #777;
            width: 100%;
            height: 100%;
            background: url(${record.album.images[1].url});
            background-size: cover;
            background-position: center center;
          }

          button:focus,
          button:hover,
          button:active {
            outline: 0.1vw solid white;
          }
        `}
      </style>
      <button
        type="button"
        onClick={() => onSelect(index)}
        onMouseOver={() => onFocus(index)}
        onFocus={() => onFocus(index)}
      />
    </li>
  );
};

export default Record;
