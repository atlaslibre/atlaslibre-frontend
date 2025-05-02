import ReactCountryFlag from "react-country-flag";
import { Actor } from "../../../interfaces/actor";
import TooltipFact from "./TooltipFact";

interface ShipTooltipProps {
  ship: Actor & { type: "ship" };
}

export default function ShipTooltip(props: ShipTooltipProps) {
  const ship = props.ship;
  const ccMatch = /^[A-Za-z]{2}$/;
  return (
    <>
      {ship.flag && ccMatch.test(ship.flag) && (
        <p>
          <ReactCountryFlag countryCode={ship.flag} svg />
        </p>
      )}

      <p className="font-medium">{ship.name}</p>
      <TooltipFact label="MMSI">{ship.mmsi}</TooltipFact>
      <TooltipFact label="Speed">{ship.pos.speed?.toFixed(1)}</TooltipFact>

    </>
  );
}
