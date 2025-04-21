import { LineLayer } from "deck.gl";

export default function actorTooltipLine(trackedCoordinates: {
  [id: string]: {
    actor: { lat: number; lon: number; alt: number };
    tooltip: { lat: number; lon: number };
  };
}, colorMode: "light" | "dark") {
  type TooltipLine = {
    id: string;
    start: [longitude: number, latitude: number, altitude: number];
    end: [longitude: number, latitude: number, altitude: number];
  };

  const tooltipLines: TooltipLine[] = [];
  const trackedCoordinateIds = Object.keys(trackedCoordinates);

  for (let i = 0; i < trackedCoordinateIds.length; i++) {
    const id = trackedCoordinateIds[i];
    const { actor, tooltip } = trackedCoordinates[id];

    tooltipLines.push({
      id: id,
      start: [actor.lon, actor.lat, actor.alt],
      end: [tooltip.lon, tooltip.lat, 0]
    })
  }

  const actorPaths = new LineLayer<TooltipLine>({
    id: "actor-tooltip-paths",
    data: tooltipLines,
    opacity: 1,
    getSourcePosition: (d) => d.start,
    getTargetPosition: (d) => d.end,
    getColor: (_d) => colorMode === "light" ? [190, 190, 190] : [128, 128, 128],
    getWidth: 1.5,
  });

  return actorPaths;
}
