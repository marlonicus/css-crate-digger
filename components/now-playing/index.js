import React from "react";
import { map, prop, join } from "ramda";

const NowPlaying = ({ track = "", artists = "", href }) => (
  <aside>
    <style jsx>
      {`
        aside {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
          color: #ccc;
          font-family: Courier;
          padding: 3vw;
          font-size: 20px;
        }

        dl {
        }

        p {
          color: white;
          margin: 10px 0;
        }

        a {
          color: white;
        }
      `}
    </style>
    <dl>
      <h2>{href ? "Now Playing:" : "Have a dig"}</h2>
      <p>{track}</p>
      <p>{join(", ", map(prop("name"), artists))}</p>
      <p>
        {href && (
          <a href={href} target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="link">
              🔗
            </span>
            Spotify
          </a>
        )}
      </p>
    </dl>
  </aside>
);

export default NowPlaying;
