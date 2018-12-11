import React from "react";
import { Bodies, unit } from "../../utils";

const SIZE_MULTIPLIER = 1;

const Loading = () => (
  <div className="container">
    <style jsx>
      {`
        @keyframes spin {
          0% {
            transform: scaleX(1);
          }

          100% {
            transform: scaleX(-1);
          }
        }

        .container {
          background: #010101;
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        p {
          text-transform: uppercase;
          top: ${unit(Bodies.Disc.diameter * SIZE_MULTIPLIER)};
          font-size: 2vw;
          letter-spacing: 0.06vw;
          color: white;
          margin-top: 1vw;
          font-family: Courier;
        }

        .record {
          animation: spin 750ms infinite;
        }

        span,
        span:after,
        span:before {
          text-align: center;
          display: block;
          content: "";
          border-radius: 50%;
          position: absolute;
          background: #303030;
        }

        span:after {
          width: ${unit(Bodies.Disc.diameter * (SIZE_MULTIPLIER / 20))};
          height: ${unit(Bodies.Disc.diameter * (SIZE_MULTIPLIER / 20))};
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0.5);
        }

        span:before {
          display: block;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: #eee;
          width: ${unit((Bodies.Disc.diameter * SIZE_MULTIPLIER) / 3)};
          height: ${unit((Bodies.Disc.diameter * SIZE_MULTIPLIER) / 3)};
        }

        span {
          display: inline-block;
          position: relative;
          width: ${unit(Bodies.Disc.diameter * SIZE_MULTIPLIER)};
          height: ${unit(Bodies.Disc.diameter * SIZE_MULTIPLIER)};
        }
      `}
    </style>
    <div className="record">
      <span />
    </div>
    <p>loading </p>
  </div>
);

export default Loading;
