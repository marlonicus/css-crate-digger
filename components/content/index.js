// import { map, take, pipe, assoc, lensProp, over, repeat } from "ramda";
import React, { useEffect, useState } from "react";
// import mockData from "../../data/mock";
import spotify from "../../utils/spotify";
import { checkUserIsLoggedIn } from "../../utils";

spotify.connect();

// const setBackground = item => assoc("background", randomColor())(item);
// const itemLens = lensProp("items");
// const transformDataToCrates = pipe(
//   over(itemLens, map(setBackground)),
//   over(itemLens, take(10))
// );
// const data = repeat(transformDataToCrates(mockData), 5);

const loadContent = async ({ setContent, accessToken }) => {
  await spotify.connect();
  spotify.setAccessToken(accessToken);
  const data = await spotify.getCrates();

  setContent({
    loaded: true,
    data
  });
};

export const ContentContext = React.createContext();

export const Content = props => {
  const [content, setContent] = useState({ loaded: false });

  useEffect(() => {
    const accessToken = checkUserIsLoggedIn(window);

    // User is logged in
    if (accessToken) {
      loadContent({ setContent, accessToken });
    }
    // User is not logged in
    else {
      window.location.href = "/";
    }
  }, []);

  return <ContentContext.Provider value={content} {...props} />;
};
