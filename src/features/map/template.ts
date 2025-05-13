import { GeoJsonImportFeature } from "@geoman-io/maplibre-geoman-free";
import { circle } from "@turf/turf";

export const TEMP_TEMPLATES: CustomTemplate[] = [
  {
    id: "3M54E",
    name: "Kalibr 3M54E",
    description: "Export anti-ship version, 220 km range",
    components: [
      {
        type: "circle",
        radius: 220_000,
      },
      { type: "center" },
      {
        type: "text",
      },
    ],
  },
  {
    id: "3M54E1",
    name: "Kalibr 3M54E1 / 3M14E",
    description: "Export anti-ship version, 300 km range",
    components: [
      {
        type: "circle",
        radius: 300_000,
      },
      { type: "center" },
      {
        type: "text",
      },
    ],
  },
  {
    id: "3M54K",
    name: "Kalibr 3M54K/3M54T",
    description: "Domestic anti-ship version, estimated 660 km range",
    components: [
      {
        type: "circle",
        radius: 660_000,
      },
      { type: "center" },
      {
        type: "text",
      },
    ],
  },
  {
    id: "3M14K",
    name: "Kalibr 3M14K/3M14T",
    description: "Domestic land-attack version, estimated 2000 km range",
    components: [
      {
        type: "circle",
        radius: 2_000_000,
      },
      { type: "center" },
      {
        type: "text",
      },
    ],
  },
];

export interface CustomTemplate {
  id: string;
  name: string;
  description?: string;
  components: Component[];
}

type Component = CircleRadiusComponent | TextComponent | CenterComponent;

interface CircleRadiusComponent {
  type: "circle";
  radius: number;
}

const applyCircleRadiusComponent = (
  component: CircleRadiusComponent,
  center: {
    lng: number;
    lat: number;
  }
): GeoJsonImportFeature => {
  return circle([center.lng, center.lat], component.radius, {
    steps: 64,
    units: "meters",
    properties: {
      shape: "circle",
    },
  });
};

interface TextComponent {
  type: "text";
  text?: string;
}

const applyTextComponent = (
  component: TextComponent,
  center: {
    lng: number;
    lat: number;
  },
  name: string
): GeoJsonImportFeature => ({
  type: "Feature",
  properties: {
    shape: "text_marker",
    text: component.text ?? name,
  },
  geometry: { type: "Point", coordinates: [center.lng, center.lat] },
});

interface CenterComponent {
  type: "center";
}

const applyCenterComponent = (center: {
  lng: number;
  lat: number;
}): GeoJsonImportFeature => ({
  type: "Feature",
  properties: {
    shape: "circle_marker",
  },
  geometry: { type: "Point", coordinates: [center.lng, center.lat] },
});

export const applyTemplate = (
  template: CustomTemplate,
  center: {
    lng: number;
    lat: number;
  }
): GeoJsonImportFeature[] => {
  const accumulator: GeoJsonImportFeature[] = [];

  for (let i = 0; i < template.components.length; i++) {
    const component = template.components[i];

    let feature: GeoJsonImportFeature;

    switch (component.type) {
      case "text":
        feature = applyTextComponent(component, center, template.name);
        break;
      case "circle":
        feature = applyCircleRadiusComponent(component, center);
        break;
      case "center":
        feature = applyCenterComponent(center);
        break;
    }

    accumulator.push(feature);
  }

  return accumulator;
};
