import { LocationSearching, Refresh } from "@mui/icons-material";
import { Checkbox, IconButton, ListItem, ListItemIcon } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  clearValidatedGossip,
  updateValidatedGossip,
} from "../../../features/gossip/gossipSlice";
import { ActorGossipPlugin } from "../../../features/gossip/pluginSlice";
import { pluginActorQueryResponseSchema } from "../../../interfaces/plugins";
import { PluginMenuItemProps } from "../../../interfaces/properties";
import { toggleEnabled } from "../../../features/gossip/pluginSettingsSlice";

export function ActorPluginMenuItem({
  plugin,
}: PluginMenuItemProps<ActorGossipPlugin>) {
  const dispatch = useAppDispatch();
  const { bounds, viewState, fixedTime } = useAppSelector((state) => state.map);
  const { tracked } = useAppSelector((state) => state.gossip);
  const { settings } = useAppSelector((state) => state.pluginSettings);

  const [status, setStatus] = useState("Connecting");
  const [updating, setUpdating] = useState(false);

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

  const update = () => {
    if (updating) return;
    if (!setting.enabled) {
      dispatch(clearValidatedGossip(plugin.id));
      return;
    }

    setUpdating(true);

    const ts: dayjs.Dayjs = fixedTime ? dayjs(fixedTime) : dayjs.utc();

    chrome.runtime.sendMessage(
      plugin.id,
      {
        type: "query",
        tracks: tracked[plugin.id] ?? [],
        ts: ts.utc().unix(),
        maxDelta: setting.query.maxAge,
        maxDeltaTrack: setting.query.maxTrack,
        limit: 10_000,
        bounds: bounds,
      },
      (response) => {
        const parseResult = pluginActorQueryResponseSchema.safeParse(response);

        if (!parseResult.success) {
          console.error(
            "Failed to parse query response from plugin",
            parseResult.error,
            response
          );
          setUpdating(false);
          return;
        }

        dispatch(
          updateValidatedGossip({
            plugin: plugin.id,
            actors: parseResult.data.actors,
            tracks: parseResult.data.tracks,
          })
        );
        setUpdating(false);
      }
    );
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
    const interval = setInterval(() => {
      updateStatus();

      if (!fixedTime) update();
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    update();
  }, [
    fixedTime,
    viewState,
    tracked,
    setting.enabled,
    setting.query.maxAge,
    setting.query.maxTrack,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

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
            <IconButton edge="end" onClick={update} disabled={updating}>
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
