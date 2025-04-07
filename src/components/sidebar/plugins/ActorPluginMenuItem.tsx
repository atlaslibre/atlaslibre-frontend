import ListItemText from "@mui/material/ListItemText";

import { IconButton, ListItem } from "@mui/material";

import { LocationSearching, Refresh } from "@mui/icons-material";
import { PluginMenuItemProps } from "../../../interfaces/properties";
import { ActorGossipPlugin } from "../../../features/gossip/pluginSlice";
import { useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";

export function ActorPluginMenuItem({
  plugin,
}: PluginMenuItemProps<ActorGossipPlugin>) {
  const { bounds, viewState } = useAppSelector((state) => state.map);
  const [status, setStatus] = useState("Connecting");

  const locate = () => {
    chrome.runtime.sendMessage(plugin.id, {
      type: "locate",
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bounds: bounds,
    });
  };

  const updateStatus = () => {
    chrome.runtime.sendMessage(
      plugin.id,
      {
        type: "status",
      },
      (response) => setStatus(response)
    );
  };

  useEffect(() => {
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <ListItem
        secondaryAction={
          <>
            {plugin.locate && (
              <IconButton onClick={locate}>
                <LocationSearching />
              </IconButton>
            )}
            <IconButton edge="end">
              <Refresh />
            </IconButton>
          </>
        }
      >
        <ListItemText primary={plugin.name} secondary={status} />
      </ListItem>
    </div>
  );
}
