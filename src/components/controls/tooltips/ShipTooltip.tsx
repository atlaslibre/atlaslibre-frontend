import ReactCountryFlag from "react-country-flag";
import { Actor } from "../../../interfaces/actor";

interface ShipTooltipProps {
  ship: Actor & { type: "ship" };
}

export default function ShipTooltip(props: ShipTooltipProps) {
  const ship = props.ship;
  return (
    <>
      <p>
        <ReactCountryFlag countryCode={ship.flag} svg />
        {ship.class}
      </p>

      <p className="font-medium">{ship.name}</p>
    </>
  );
}
