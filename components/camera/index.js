import React, { useState, useContext, useEffect } from "react";
import { MousePositionContext } from "../mouse";

const CAMERA_EASE = 0.1;

const easeMousePositions = ({ hook, mousePosition, cameraPosition }) => () => {
  const xDist = mousePosition.x - cameraPosition.x;
  const yDist = mousePosition.y - cameraPosition.y;

  if (Math.abs(xDist + yDist) >= 2) {
    hook({
      x: cameraPosition.x + xDist * CAMERA_EASE,
      y: cameraPosition.y + yDist * CAMERA_EASE
    });
  }
};

export const CameraContext = React.createContext();

export const Camera = props => {
  const mousePosition = useContext(MousePositionContext) || { x: 0.5, y: 0 };
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });

  useEffect(
    easeMousePositions({
      hook: setCameraPosition,
      mousePosition,
      cameraPosition
    })
  );

  return <CameraContext.Provider value={cameraPosition} {...props} />;
};
