import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Checkbox, ListItemIcon } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { hideLayer, showLayer } from "../../features/map/mapSlice";
import { sidebarConfiguration } from "../../configuration/sidebarLayers";

export interface SidebarLayerGroup {
  type: "group";
  title: string;
  layers: (SidebarLayerGroup | SidebarLayer)[];
}

export interface SidebarLayer {
  type: "layer";
  id: string;
  title: string;
}

interface ExpandableHeaderProps {
  layer: SidebarLayerGroup;
  nesting: number;
}

interface LayerListItemProps {
  item: SidebarLayerGroup | SidebarLayer;
  nesting: number;
}

function LayerListItem({ item, nesting }: LayerListItemProps) {
  const { layerVisiblity } = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();

  if (item.type == "group")
    return <ExpandableHeader layer={item} nesting={nesting + 1}></ExpandableHeader>;

  const currentlyVisible = layerVisiblity[item.id] ?? false;

  const handleToggle = () => {
    if (currentlyVisible) dispatch(hideLayer(item.id));
    else dispatch(showLayer(item.id));
  };

  return (
    <ListItemButton role={undefined} onClick={handleToggle} dense>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={currentlyVisible}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": item.id }}
        />
      </ListItemIcon>
      <ListItemText id={item.id} primary={item.title} />
    </ListItemButton>
  );
}

function ExpandableHeader({ layer, nesting }: ExpandableHeaderProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div style={{paddingLeft: nesting * 55}}>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={layer.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {layer.layers.map((layer) => (
            <LayerListItem item={layer} key={layer.title} nesting={nesting}/>
          ))}
        </List>
      </Collapse>
    </div>
  );
}

export default function StaticLayersMenu() {
  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      disablePadding
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Static layers
        </ListSubheader>
      }
    >
      {sidebarConfiguration.map((layer) => (
        <LayerListItem item={layer} key={layer.title} nesting={-1}/>
      ))}
    </List>
  );
}
