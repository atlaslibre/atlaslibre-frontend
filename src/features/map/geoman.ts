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
  layerStyles: {
    marker: {
      "gm_main": [
        {type: "symbol", "layout": {"icon-size": 0.1}}
      ]
    }
  },
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
