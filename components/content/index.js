import React, { useEffect, useState } from "react";
import spotify from "../../utils/spotify";
import { checkUserIsLoggedIn } from "../../utils";

const loadContent = async ({ setContent, accessToken }) => {
  spotify.setAccessToken(accessToken);
  await spotify.connect();
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
