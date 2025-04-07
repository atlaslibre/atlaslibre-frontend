import {
  GmFwdEventNameWithPrefix,
  GmOptionsPartial,
} from "@geoman-io/maplibre-geoman-free";

export const geomanSaveTriggers: GmFwdEventNameWithPrefix[] = [
  "gm:create",
  "gm:dragend",
  "gm:editend",
  "gm:remove",
  "gm:globalshape_markersmodetoggled"
];

export const geomanOptions: GmOptionsPartial = {
  settings: {
    controlsPosition: "top-left",
    throttlingDelay: 10,
  },
  controls: {
    draw: {
      rectangle: {
        uiEnabled: false,
      },
    },
    edit: {
      cut: {
        uiEnabled: false,
      },
      rotate: {
        uiEnabled: false,
      },
    },
    helper: {
      zoom_to_features: {
        uiEnabled: false,
      },
      shape_markers: {
        uiEnabled: false,
      },
    },
  },
};
