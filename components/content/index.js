import randomColor from "randomcolor";
import { map, take, pipe, assoc, lensProp, over, repeat } from "ramda";
import React, { useEffect, useState } from "react";
import mockData from "../../data/mock";

const setBackground = item => assoc("background", randomColor())(item);
const itemLens = lensProp("items");
const transformDataToCrates = pipe(
  over(itemLens, map(setBackground)),
  over(itemLens, take(10))
);
const data = repeat(transformDataToCrates(mockData), 5);

export const ContentContext = React.createContext();

export const Content = props => {
  const [content, setContent] = useState({ loaded: false });

  useEffect(
    () =>
      setContent({
        loaded: true,
        data
      }),
    []
  );

  return <ContentContext.Provider value={content} {...props} />;
};
