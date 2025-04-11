import { useGetPhotosByHexQuery } from "../../../features/gossip/planespotterSlice";
import { Actor } from "../../../interfaces/actor";
import TooltipFact from "./TooltipFact";

interface AircraftTooltipProps {
  aircraft: Actor & { type: "aircraft" };
}

export default function AircraftTooltip(props: AircraftTooltipProps) {
  const ac = props.aircraft;
  const photos = useGetPhotosByHexQuery(ac.hex);

  return (
    <>

      {photos.isSuccess && photos.data.photos.length > 0 &&  <img src={photos.data.photos[0].thumbnail.src} />}
     

      <p className="font-medium">{ac.name}</p>
      
      <TooltipFact label="Hex">{ac.hex.toUpperCase()}</TooltipFact>
      <TooltipFact label="Registration">{ac.reg}</TooltipFact>
      <TooltipFact label="Squawk">{ac.squawk}</TooltipFact>
      <TooltipFact label="Speed">{ac.pos.speed}</TooltipFact>
      <TooltipFact label="Altitude">{ac.pos.alt}</TooltipFact>
    </>
  );
}
