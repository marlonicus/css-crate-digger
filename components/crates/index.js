import React, { useState } from "react";
import { addIndex, map, partial } from "ramda";
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

const Crate = ({
  items,
  genre,
  selectedRecord,
  setSelectedRecord,
  saveSong
}) => {
  const [focussedIndex, setFocus] = useState(10);
  return (
    <article>
      <style jsx>
        {`
          article {
            background: ${Bodies.Crate.color1};
            display: flex;
            flex-direction: column;
            height: ${unit(Bodies.Crate.height)};
            justify-content: center;
            position: relative;
            transform-style: preserve-3d;
            transform-origin: 50% 100%;
            transform: rotateX(-90deg);
            width: ${unit(Bodies.Crate.width)};
            border-top: 1px solid ${Bodies.Crate.color1}; /* Fixes a pixel graphical glitch */
            margin-bottom: 3vw;
          }

          article:before,
          article:after {
            background: ${Bodies.Crate.color1};
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
            background: ${Bodies.Crate.color1};
            display: flex;
            position: absolute;
            top: 0;
            width: ${unit(Bodies.Crate.width)};
            height: ${unit(Bodies.Crate.height)};
            transform-style: preserve-3d;
            transform: translateZ(${unit(-Bodies.Crate.depth)});
            transform-origin: 50% 0%;
          }

          /* Border around the top of the crate to give a thicc illusion */
          ul:before {
            border: ${unit(Bodies.Crate.thickness)} solid ${Bodies.Crate.color2};
            pointer-events: none;
            content: "";
            display: block;
            transform: rotateX(90deg);
            transform-origin: 50% 0%;
            position: absolute;
            top: 0;
            width: ${unit(Bodies.Crate.width)};
            height: ${unit(Bodies.Crate.depth)};
          }
        `}
      </style>
      <Label text={genre} />
      <ul>
        {addIndex(map)(
          (data, index) => (
            <Record
              {...data}
              index={index}
              key={index}
              isScrolledThrough={index > focussedIndex}
              isSelected={selectedRecord === index}
              onSelect={setSelectedRecord}
              onSave={saveSong}
              onFocus={setFocus}
            />
          ),
          items
        )}
      </ul>
    </article>
  );
};

const Crates = ({ crates, selectedRecord, setSelectedRecord, saveSong }) => (
  <>
    {addIndex(map)(
      (crate, index) => (
        <Crate
          selectedRecord={
            selectedRecord.crateIndex === index
              ? selectedRecord.recordIndex
              : false
          }
          saveSong={partial(saveSong, [index])}
          setSelectedRecord={partial(setSelectedRecord, [index])}
          {...crate}
          genre={crate.genre}
          items={crate.content.tracks}
          key={index}
        />
      ),
      crates
    )}
  </>
);

export default Crates;
