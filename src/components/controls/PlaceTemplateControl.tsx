import { GeoJsonImportFeature } from "@geoman-io/maplibre-geoman-free";
import { IControl, Map, MapMouseEvent, Subscription } from "maplibre-gl";
import { useEffect, useState } from "react";
import { useControl } from "react-map-gl/maplibre";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addFeatureToActiveMap,
  setActiveTemplate,
} from "../../features/map/customMapSlice";
import { drawerWidth } from "../../App";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Radio,
  TextField,
} from "@mui/material";
import {
  applyTemplate,
  CustomTemplate,
  TEMP_TEMPLATES,
} from "../../features/map/template";

class PlaceTemplateControlImpl implements IControl {
  private _map?: Map;
  private _container?: HTMLDivElement;
  private _button;
  private _active: boolean;
  private _onClickSubscription?: Subscription;
  private _setActive: (active: boolean) => void;
  private _featurePlaced: (features: GeoJsonImportFeature[]) => void;
  private _template?: CustomTemplate;

  constructor(
    featurePlaced: (features: GeoJsonImportFeature[]) => void,
    setActive: (active: boolean) => void
  ) {
    this._active = false;
    this._setActive = setActive;
    this._featurePlaced = featurePlaced;
    this._button = document.createElement("button");
    this._button.className = "maplibregl-ctrl-icon";
    this._button.title = "Place Template";
    this._button.innerHTML = `
        <svg style="padding: 4px" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11m-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2M5 20v2h14v-2z"></path>
        </svg>`;
    this._button.addEventListener("click", () => this._onToggle());
  }

  onAdd(map: Map): HTMLElement {
    this._map = map;
    this._onClickSubscription = this._map.on("click", this._onMapClick);
    this._container = document.createElement("div");
    this._container.className =
      "maplibregl-ctrl maplibregl-ctrl-group maplibregl-place-template";
    this._container.appendChild(this._button);
    return this._container;
  }

  onRemove(): void {
    if (this._container?.parentNode)
      this._container.parentNode.removeChild(this._container);
    if (this._onClickSubscription) this._onClickSubscription.unsubscribe();
    this._map = undefined;
  }

  showControls(): void {
    if (this._container !== undefined) this._container.style.display = "block";
  }

  hideControls(): void {
    if (this._container !== undefined) this._container.style.display = "none";
  }

  setTemplate(template: CustomTemplate) {
    this._template = template;
  }

  disable(): void {
    if (this._active) this._onToggle(false);
  }

  enable(): void {
    if (!this._active) this._onToggle(false);
  }

  private _onToggle = (user: boolean = true) => {
    this._active = !this._active;

    if(user)
      this._setActive(this._active);

    if (this._active) this._button.classList.add("active");
    else this._button.classList.remove("active");
  };

  private _onMapClick = (evt?: MapMouseEvent) => {
    if (!this._active) return;

    if (evt && this._template) {
      const features = applyTemplate(this._template, evt.lngLat);
      this._featurePlaced(features);
    }
  };

  getDefaultPosition?: () => "top-left";
}

function PlaceTemplateList(props: { open: boolean; handleClose: () => void }) {
  const dispatch = useAppDispatch();
  const { activeTemplate } = useAppSelector((state) => state.customMap);
  const [search, setSearch] = useState("");

  return (
    <Drawer
      open={props.open}
      onClose={props.handleClose}
      anchor="right"
      variant="temporary"
      sx={{
        minWidth: drawerWidth,
        display: { xs: "none", lg: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          minWidth: drawerWidth,
        },
      }}
    >
      <TextField
        label="Search"
        type="search"
        variant="filled"
        value={search}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);
        }}
      />

      <List
        dense
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Choose a template to place
          </ListSubheader>
        }
        sx={{
          width: "100%",
          maxWidth: drawerWidth,
          bgcolor: "background.paper",
        }}
      >
        {TEMP_TEMPLATES.filter((t) => {
          if (search === undefined || search == null || search.length == 0)
            return true;

          const s = search.toLocaleLowerCase();
          return (
            t.name.toLocaleLowerCase().indexOf(s) >= 0 ||
            (t.description &&
              t.description?.toLocaleLowerCase().indexOf(search) >= 0)
          );
        }).map((template) => (
          <ListItem key={`template-${template.id}`} sx={{ padding: 0 }}>
            <ListItemButton
              onClick={() => {
                dispatch(setActiveTemplate(template));
                props.handleClose();
              }}
            >
              <Radio checked={activeTemplate?.id == template.id} />
              <ListItemText
                primary={template.name}
                secondary={template.description}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

interface PlaceTemplateControlProps {
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

export default function PlaceTemplateControl(props: PlaceTemplateControlProps) {
  const dispatch = useAppDispatch();
  const { screenshotMode } = useAppSelector((state) => state.flags);
  const [open, setOpen] = useState(false);
  const { activeTemplate } = useAppSelector((state) => state.customMap);

  const setActive = (active: boolean) => {
    setOpen(active);

    if(active)
      props.onActivate();
    else
    props.onDeactivate();
  };

  const templatePlaced = (features: GeoJsonImportFeature[]) => {
    for (let index = 0; index < features.length; index++) {
      const feature = features[index];
      dispatch(addFeatureToActiveMap(feature));
    }
  };

  const control = useControl(
    () => new PlaceTemplateControlImpl(templatePlaced, setActive),
    {
      position: "top-left",
    }
  );

  useEffect(() => {
    if (screenshotMode) control.hideControls();
    else control.showControls();
  }, [screenshotMode]);

  useEffect(() => {
    if (activeTemplate) control.setTemplate(activeTemplate);
  }, [activeTemplate]);

  useEffect(() => {
    if (!props.active) {
      control.disable();
    } else {
      control.enable();
    }
  }, [props.active]);

  return <PlaceTemplateList open={open} handleClose={() => setOpen(false)} />;
}
