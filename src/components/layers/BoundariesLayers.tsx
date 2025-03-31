import ToggleableLayer from "./shared/ToggleableLayer";

export default function BoundariesLayers() {
  return (
    <>
      <ToggleableLayer
              type="line"
              id="boundary_country_outline_water"
              source-layer="boundary"
              source="carto"
              minzoom={0}
              maxzoom={24}
              filter={["all", ["==", "admin_level", 2], ["==", "maritime", 1]]}
              layout={{ "line-cap": "round", "line-join": "round" }}
              paint={{
                "line-color": "rgb(101, 101, 101)",
                "line-width": {
                  type: "interval",
                  stops: [
                    [3, 1],
                    [6, 1.5],
                  ],
                },
                "line-offset": 0,
              }}
            />
    </>
  );
}
