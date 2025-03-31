import * as React from "react";
import { ActorPinProperties } from "../../interfaces/properties";

function ShipPin({ size = 20, color = "#0d0" }: ActorPinProperties) {
  const pinStyle = {
    cursor: "pointer",
    fill: color,
    stroke: "none",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 4267 4267"
      version="1.1"
      style={pinStyle}
    >
      <g transform="matrix(9.12901,0.00129108,-0.00282276,4.17546,-2536.81,-4.97359)">
        <path d="M512.036,959.881C556.49,959.873 589.764,948.703 589.764,948.703C589.764,948.703 613.125,564.647 610.284,398.512C607.444,232.376 511.815,39.192 511.815,39.192L511.819,39.138C511.819,39.138 416.31,232.431 413.543,398.565C410.775,564.699 434.305,948.737 434.305,948.737C434.305,948.737 477.531,959.989 512.036,959.881Z" />
      </g>
    </svg>
  );
}

export default React.memo(ShipPin);
