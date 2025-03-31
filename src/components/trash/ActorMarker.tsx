import { Marker } from "react-map-gl/maplibre";

import ShipPin from "./../icons/ShipPin";
import PlanePin from "./../icons/PlanePin";
import { IActor } from "../../interfaces/schemas";

interface ActorMarkerProperties {
  actor: IActor;
}

function renderSwitch(actor: IActor) {
  switch (actor.type) {
    case "ship":
      return <ShipPin />;
    case "aircraft":
      return <PlanePin />;
  }
}

const ActorMarker = ({ actor }: ActorMarkerProperties) => {
  const lastPos = actor.pos;
  return (
    <Marker
      key={`marker-${actor.id}`}
      longitude={lastPos.lon}
      latitude={lastPos.lat}
      anchor="center"
      pitchAlignment="map"
      rotation={lastPos.course}
      rotationAlignment="map"
    >
      {renderSwitch(actor)}
    </Marker>
  );
};

export default ActorMarker;
