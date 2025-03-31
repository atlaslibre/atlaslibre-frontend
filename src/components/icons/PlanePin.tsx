import * as React from "react";
import { ActorPinProperties } from "../../interfaces/properties";

function PlanePin({
  size = 20,
  color = "#d00",
}: ActorPinProperties) {
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
      <g transform="matrix(4.16667,0,0,4.16667,0,0)">
        <g transform="matrix(1,0,0,1,-0.94369,0.0379957)">
          <path d="M512.942,874.532L707.07,938.068L707.07,859.645L554.825,769.362C554.825,769.362 565.501,722.061 572.508,684.241C578.386,652.516 579.583,577.358 579.583,577.358L946.275,688.2L946.275,606.564L580.883,370.075C580.883,370.075 580.839,371.298 580.883,370.075C591.235,80.109 512.944,57.648 512.944,57.648C512.944,57.648 434.662,80.093 445.014,370.059C445.057,371.282 445.014,370.059 445.014,370.059L79.622,606.547L79.622,688.184L446.314,577.341C446.314,577.341 447.511,652.499 453.389,684.225C460.396,722.045 471.072,769.345 471.072,769.345L318.827,859.629L318.827,938.052L512.942,874.532Z" />
        </g>
      </g>
    </svg>
  );
}

export default React.memo(PlanePin);
