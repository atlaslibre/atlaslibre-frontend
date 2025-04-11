import { Actor } from "../../../interfaces/actor";

interface AircraftTooltipProps {
  aircraft: Actor & { type: "aircraft" };
}

export default function AircraftTooltip(props: AircraftTooltipProps) {
  const ac = props.aircraft;
  return (
    <>
      <p className="font-medium">{ac.name}</p>

      <p>Hex: {ac.hex.toUpperCase()}</p>

      {ac.reg && <p>Registration: {ac.reg}</p>}
      {ac.squawk && <p>Squawk: {ac.squawk}</p>}
      {ac.flight && <p>Flight: {ac.flight}</p>}

      {ac.pos.speed && ac.pos.speed > 0 && <p>Speed: {ac.pos.speed}</p>}
      {ac.pos.alt  && ac.pos.alt > 0 && <p>Altitude: {ac.pos.alt}</p>}
    </>
  );
}
