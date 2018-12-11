import React from "react";
import { unit, Bodies } from "../../utils";

const RECORD_Z_PADDING = 0.5;

const Record = ({
  onFocus,
  onSelect,
  onSave,
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
            backface-visibility: hidden;
            transform-style: preserve-3d;
            transform-origin: 50% 100%;
            width: ${unit(Bodies.Record.width)};
            height: ${unit(Bodies.Record.height)};
            position: absolute;
            transition: transform 220ms cubic-bezier(0.2, 0.23, 0.51, 1.2);
            transform: ${defaultTransform};
            top: ${unit(-(Bodies.Record.width / 2))};
            left: ${unit((Bodies.Crate.width - Bodies.Record.width) / 2)};
            list-style: none;
            background: ${record.background};
          }

          li.selected {
            transition-timing-function: ease-out;
            transition-duration: 150ms;
            transform: ${zTransform} translateY(-10vw);
          }

          .sleeve {
            cursor: pointer;
            border: 0.05vw solid #777;
            width: 100%;
            height: 100%;
            background: url(${record.album.images[1].url});
            background-size: cover;
            background-position: center center;
          }

          .sleeve:focus,
          .sleeve:hover,
          .sleeve:active {
            outline: 0.1vw solid white;
          }

          .control-button {
            position: absolute;
            color: #fff;
            background: transparent;
            text-transform: uppercase;
            cursor: pointer;
            top: -0.3vw;
            transform: translateY(-100%);
            transition: transform 50ms ease-out;
            border-radius: 0.7vw;
            font-size: 0.7vw;
          }

          .control-button:focus,
          .control-button:hover,
          .control-button:active {
            background: white;
            color: black;
            outline: none;
          }

          .close {
            right: 0;
          }
        `}
      </style>
      {isSelected && (
        <>
          <button
            className="control-button save"
            type="button"
            onClick={() => onSave(index)}
          >
            Save
          </button>

          <button
            className="control-button close"
            type="button"
            onClick={() => onSelect(false)}
          >
            X
          </button>
        </>
      )}

      <button
        className="sleeve"
        type="button"
        onClick={() => onSelect(index)}
        onMouseOver={() => onFocus(index)}
        onFocus={() => onFocus(index)}
      />
    </li>
  );
};

export default Record;
