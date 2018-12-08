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
            background: #090909;
            flex-direction: column;
            color: #aaa;
          }

          h1 {
            font-family: Bungee, cursive;
            font-size: 4vw;
            color: #88b7b5;
          }

          p {
            font-family: Helvetica;
            letter-spacing: 0.04vw;
            font-size: 1vw;
          }

          button {
            border: none;
            color: #ddd;
            outline: none;
            background: none;
            font-size: 4em;
            margin-top: 10vw;
            cursor: pointer;

            font-family: Bungee, cursive;
          }

          button:hover,
          button:active,
          button:focus {
            color: grey;
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
