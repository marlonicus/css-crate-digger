import React from "react";

const Footer = () => (
  <footer>
    <style jsx>
      {`
        footer {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }

        p, a {
          font-family: Helvetica;
          text-decoration: none;
          color: #aaa;
        }
      `}
    </style>
    <p>
      <a href="https://marlonic.us" target="_blank" rel="noopener noreferrer">
        marlonic.us
      </a>
    </p>
  </footer>
);

export default Footer;
