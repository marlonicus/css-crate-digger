import React, { useState } from "react";
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
  const [isSaved, setSaved] = useState(false);

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
            z-index: 12;
            position: absolute;
            color: #fff;
            vertical-align: middle;
            background: transparent;
            text-transform: uppercase;
            cursor: pointer;
            transition: transform 50ms ease-out;
            border-radius: 0.7vw;
            border: none;
            font-size: 0.7vw;
            display: block;
          }

          .control-button:focus,
          .control-button:hover,
          .control-button:active {
            color: #ccc;
            outline: none;
          }

          .control-button {
            transition: transform 50ms ease-out;
          }

          .saved {
            cursor: auto;
            color: limegreen;
          }

          .saved:hover,
          .saved:focus,
          .saved:active {
            color: limegreen;
          }

          .controls {
            display: block;
            position: absolute;
            transform: translateY(-1.2vw);
            width: 100%;
            left: 0;
            right: 0;
          }

          .close {
            right: 0;
          }
        `}
      </style>
      {isSelected && (
        <div className="controls">
          <button
            className={`control-button save ${isSaved ? "saved" : ""}`}
            type="button"
            onClick={() => {
              if (isSaved) return;
              setSaved(true);
              onSave(index);
            }}
          >
            {isSaved ? "Saved!" : "Save"}
          </button>

          <button
            className="control-button close"
            type="button"
            onClick={() => onSelect(false)}
          >
            Close
          </button>
        </div>
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
