import {
  SidebarLayer,
  SidebarLayerGroup,
} from "../components/sidebar/StaticLayersMenu";

export const sidebarConfiguration: (SidebarLayerGroup | SidebarLayer)[] = [
  {
    type: "group",
    title: "Basemap",
    layers: [
      {
        type: "layer",
        id: "landcover",
        title: "Landcover",
      },
      {
        type: "layer",
        id: "waterway",
        title: "Waterways",
      },
      {
        type: "layer",
        id: "satellite_basemap",
        title: "Satellite basemap",
      },
      {
        type: "layer",
        id: "osm_basemap",
        title: "OpenStreetMap basemap",
      },
    ],
  },

  {
    type: "group",
    title: "Boundaries",
    layers: [
      {
        type: "layer",
        id: "borders",
        title: "Borders between countries, states, etc.",
      },
      {
        type: "layer",
        id: "labels_regions",
        title: "Names for continents, countries, states",
      },
      {
        type: "layer",
        id: "labels_water",
        title: "Names for bodies of water",
      },
      {
        type: "layer",
        id: "boundary_country_outline_water",
        title: "Extend country borders into water",
      },
      {
        type: "layer",
        id: "timezones",
        title: "Timezones",
      },
    ],
  },
  {
    type: "group",
    title: "Urban",
    layers: [
      {
        type: "layer",
        id: "labels_cities",
        title: "Larger cities",
      },
      {
        type: "layer",
        id: "labels_small_towns",
        title: "Towns, suburbs and smaller settlements",
      },
      {
        type: "layer",
        id: "buildings",
        title: "Buildings",
      },
      {
        type: "layer",
        id: "labels_poi",
        title: "Local places",
      },
    ],
  },

  {
    type: "group",
    title: "Transportation",
    layers: [
      {
        type: "layer",
        id: "roads",
        title: "Roads",
      },
      {
        type: "layer",
        id: "labels_roads",
        title: "Street names",
      },
      {
        type: "layer",
        id: "rail",
        title: "Rail",
      },
      {
        type: "layer",
        id: "airports",
        title: "Airports",
      },
    ],
  },
  {
    type: "group",
    title: "Communication",
    layers: [
      {
        type: "layer",
        id: "infrastructure_telecoms_data_center",
        title: "Datacenters and exchanges",
      },
      {
        type: "layer",
        id: "infrastructure_terrestrial_communication",
        title: "Terrestrial communication cables",
      },
      {
        type: "layer",
        id: "infrastructure_underwater_communication",
        title: "Underwater communication cables",
      },
      {
        type: "layer",
        id: "infrastructure_telecoms_mast",
        title: "Communication masts",
      },
    ],
  },
  {
    type: "group",
    title: "Power",
    layers: [
      {
        type: "layer",
        id: "infrastructure_power_generation",
        title: "Power generation",
      },
      {
        type: "layer",
        id: "infrastructure_terrestrial_powerline",
        title: "Terrestrial power cables",
      },
      {
        type: "layer",
        id: "infrastructure_underwater_powerline",
        title: "Underwater power cables",
      },
    ],
  },
  {
    type: "group",
    title: "Oil and gas",
    layers: [
      {
        type: "layer",
        id: "infrastructure_petroleum_site",
        title: "Processing facilities",
      },
      {
        type: "layer",
        id: "infrastructure_terrestrial_pipeline",
        title: "Terrestrial pipelines",
      },
      {
        type: "layer",
        id: "infrastructure_underwater_pipeline",
        title: "Underwater pipelines",
      },
      {
        type: "layer",
        id: "infrastructure_petroleum_wells",
        title: "Wells",
      },
    ],
  },
  {
    type: "group",
    title: "Water",
    layers: [
      {
        type: "layer",
        id: "infrastructure_water_reservoir",
        title: "Reservoirs",
      },
      {
        type: "layer",
        id: "infrastructure_water_production",
        title: "Water production",
      },
      {
        type: "layer",
        id: "infrastructure_water_pipeline",
        title: "Pipelines",
      },
      {
        type: "layer",
        id: "infrastructure_sewage",
        title: "Wastewater",
      },
    ],
  },
];
