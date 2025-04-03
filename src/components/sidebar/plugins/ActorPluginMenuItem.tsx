import ListItemText from "@mui/material/ListItemText";

import { IconButton, ListItem } from "@mui/material";

import { LocationSearching, Refresh } from "@mui/icons-material";
import { PluginMenuItemProps } from "../../../interfaces/properties";
import { ActorGossipPlugin } from "../../../features/gossip/pluginSlice";
import { useAppSelector } from "../../../app/hooks";

export function ActorPluginMenuItem({
  plugin,
}: PluginMenuItemProps<ActorGossipPlugin>) {
  const { bounds, viewState } = useAppSelector((state) => state.map);

  const locate = () => {
    chrome.runtime.sendMessage(plugin.id, {
      type: "locate",
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bounds: bounds,
    });
  };

  return (
    <div>
      <ListItem>
        <ListItemText primary={plugin.name} secondary="Current storage: 20.32 GB"/>

        {plugin.locate && (
          <IconButton onClick={locate}>
            <LocationSearching />
          </IconButton>
        )}
        <IconButton>
          <Refresh />
        </IconButton>
      </ListItem>
    </div>
  );
}
