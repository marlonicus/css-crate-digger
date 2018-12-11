import React from "react";
import Footer from "../components/footer";
import spotify from "../utils/spotify";

const Login = () => (
  <>
    <main>
      <style jsx>
        {`
          main {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #010101;
            flex-direction: column;
            font-family: Courier;
            color: #aaa;
          }

          h1 {
            font-size: 4vw;
            color: #88b7b5;
          }

          p {
            letter-spacing: 0.04vw;
            font-size: 1vw;
          }

          button {
            border: none;
            color: #ddd;
            outline: none;
            background: none;
            font-size: 4em;
            margin-top: 12vw;
            font-family: Courier;
            cursor: pointer;
          }

          button:hover,
          button:active,
          button:focus {
            color: grey;
          }

          button:hover .emoji,
          button:active .emoji,
          button:focus .emoji {
            transform: translateX(1vw);
          }

          footer {
            position: absolute;
            bottom: 20px;
            color: #777;
          }

          a {
            color: #333;
          }

          .emoji {
            display: inline-block;
            transition: transform 200ms ease-out;
            margin-left: 0.5vw;
          }
        `}
      </style>
      <h1>Crate Digger</h1>
      <p>
        Connect with your Spotify account and discover some gems
        <span className="emoji" role="img" aria-label="diamond">
          💎
        </span>
      </p>
      <button onClick={spotify.login} type="button">
        GO
        <span className="emoji" role="img" aria-label="pointing right">
          👉🏽
        </span>
      </button>
    </main>
    <Footer />
  </>
);

export default Login;
