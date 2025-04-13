import ReactCountryFlag from "react-country-flag";
import { Actor } from "../../../interfaces/actor";
import TooltipFact from "./TooltipFact";

interface ShipTooltipProps {
  ship: Actor & { type: "ship" };
}

export default function ShipTooltip(props: ShipTooltipProps) {
  const ship = props.ship;
  return (
    <>
      {ship.flag && (
        <p>
          <ReactCountryFlag countryCode={ship.flag} svg />
        </p>
      )}

      <p className="font-medium">{ship.name}</p>

      <TooltipFact label="Class">{ship.class}</TooltipFact>
      <TooltipFact label="MMSI">{ship.mmsi}</TooltipFact>
      <TooltipFact label="Speed">{ship.pos.speed?.toFixed(1)}</TooltipFact>

    </>
  );
}
