import React from "react";
import spotify from "../utils/spotify";

const Login = () => (
  <main>
    <style jsx>
      {`
        main {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
        }

        button {
          border: none;
          outline: none;
          background: none;
          color: #333;
          font-size: 4em;
          cursor: pointer;
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
      `}
    </style>
    <button onClick={spotify.login} type="button">
      go dig.
    </button>

    <footer>
      <a href="https://marlonic.us">marlonicus</a>
    </footer>
  </main>
);

export default Login;
