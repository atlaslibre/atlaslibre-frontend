import { LocationSearching } from "@mui/icons-material";
import { Checkbox, IconButton, ListItem, ListItemIcon } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ActorGossipPlugin } from "../../../features/gossip/pluginSlice";
import { PluginMenuItemProps } from "../../../interfaces/properties";
import { toggleEnabled } from "../../../features/gossip/pluginSettingsSlice";
import { useGetStatusQuery } from "../../../features/gossip/gossipSlice";

export function ActorPluginMenuItem({
  plugin,
}: PluginMenuItemProps<ActorGossipPlugin>) {
  const dispatch = useAppDispatch();
  const { bounds, viewState } = useAppSelector((state) => state.map);
  const { settings } = useAppSelector(
    (state) => state.pluginSettings
  );

  const status = useGetStatusQuery({pluginId: plugin.id});

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

  return (
    <div>
      <ListItem
        secondaryAction={
          <>
            {plugin.locate && (
              <IconButton edge="end"  onClick={locate}>
                <LocationSearching />
              </IconButton>
            )}
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
        <ListItemText primary={plugin.name} secondary={status.data} />
      </ListItem>
    </div>
  );
}
