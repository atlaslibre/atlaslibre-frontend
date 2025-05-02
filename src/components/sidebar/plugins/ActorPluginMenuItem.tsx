import { LocationSearching, Refresh } from "@mui/icons-material";
import { Checkbox, IconButton, ListItem, ListItemIcon } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {  useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ActorGossipPlugin } from "../../../features/gossip/pluginSlice";
import { PluginMenuItemProps } from "../../../interfaces/properties";
import { toggleEnabled } from "../../../features/gossip/pluginSettingsSlice";

export function ActorPluginMenuItem({
  plugin,
}: PluginMenuItemProps<ActorGossipPlugin>) {
  const dispatch = useAppDispatch();
  const { bounds, viewState } = useAppSelector((state) => state.map);
  const { settings } = useAppSelector(
    (state) => state.pluginSettings
  );

  const [status, setStatus] = useState("TODO");

  const setting = settings[plugin.id];

  if (setting.type !== "actor") return false;

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
            <IconButton edge="end" onClick={() => alert("TODO")}>
              <Refresh />
            </IconButton>
          </>
        }
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={setting.enabled}
            tabIndex={-1}
            disableRipple
            onClick={() => {
              dispatch(toggleEnabled(plugin.id));
            }}
          />
        </ListItemIcon>
        <ListItemText primary={plugin.name} secondary={status} />
      </ListItem>
    </div>
  );
}
