import ToggleableLayer from "./shared/ToggleableLayer";

export default function PoliticalLayers() {
  return (
    <>
      <ToggleableLayer
        type="fill"
        id="nato"
        source="countries-10m"
        minzoom={0}
        maxzoom={24}
        filter={[
          "in",
          "name",
          "Albania",
          "Belgium",
          "Bulgaria",
          "Canada",
          "Croatia",
          "Czechia",
          "Denmark",
          "Estonia",
          "Finland",
          "France",
          "Germany",
          "Greece",
          "Hungary",
          "Iceland",
          "Italy",
          "Latvia",
          "Lithuania",
          "Luxembourg",
          "Montenegro",
          "Netherlands",
          "Macedonia",
          "Norway",
          "Poland",
          "Portugal",
          "Romania",
          "Slovakia",
          "Slovenia",
          "Spain",
          "Sweden",
          "Turkey",
          "United Kingdom",
          "United States",
        ]}
        paint={{
          "fill-color": "#004990",
          "fill-opacity": 0.5,
        }}
      />

      <ToggleableLayer
        type="fill"
        id="eu"
        source="countries-10m"
        minzoom={0}
        maxzoom={24}
        filter={[
          "in",
          "name",
          "Austria",
          "Belgium",
          "Bulgaria",
          "Croatia",
          "Cyprus",
          "Czechia",
          "Denmark",
          "Estonia",
          "Finland",
          "France",
          "Germany",
          "Greece",
          "Hungary",
          "Ireland",
          "Italy",
          "Latvia",
          "Lithuania",
          "Luxembourg",
          "Malta",
          "Netherlands",
          "Poland",
          "Portugal",
          "Romania",
          "Slovakia",
          "Slovenia",
          "Spain",
          "Sweden",
        ]}
        paint={{
          "fill-color": "#003399",
          "fill-opacity": 0.5,
        }}
      />
    </>
  );
}
