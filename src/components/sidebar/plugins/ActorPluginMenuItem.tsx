import { LocationSearching, Refresh } from "@mui/icons-material";
import { IconButton, ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateValidatedGossip } from "../../../features/gossip/gossipSlice";
import { ActorGossipPlugin } from "../../../features/gossip/pluginSlice";
import { pluginActorQueryResponseSchema } from "../../../interfaces/plugins";
import { PluginMenuItemProps } from "../../../interfaces/properties";

export function ActorPluginMenuItem({
  plugin,
}: PluginMenuItemProps<ActorGossipPlugin>) {
  const dispatch = useAppDispatch();
  const { bounds, viewState, fixedTime } = useAppSelector((state) => state.map);
  const { tracked } = useAppSelector((state) => state.gossip);

  const [status, setStatus] = useState("Connecting");

  const locate = () => {
    chrome.runtime.sendMessage(plugin.id, {
      type: "locate",
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bounds: bounds,
    });
  };

  const update = () => {
    const ts: dayjs.Dayjs = fixedTime ? dayjs(fixedTime) : dayjs.utc();

    chrome.runtime.sendMessage(
      plugin.id,
      {
        type: "query",
        tracks: tracked[plugin.id] ?? [],
        ts: ts.utc().unix(),
        maxDelta: 300000,
        limit: 10000,
        bounds: bounds,
      },
      (response) => {

        const parseResult = pluginActorQueryResponseSchema.safeParse(response);

        if (!parseResult.success) {
          console.error(
            "Failed to parse query response from plugin",
            parseResult.error, response
          );
          return;
        }

        dispatch(
          updateValidatedGossip({
            plugin: plugin.id,
            actors: parseResult.data.actors,
            tracks: parseResult.data.tracks
          })
        );
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

      if(!fixedTime)
        update();
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    update();
  }, [fixedTime]);

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
            <IconButton edge="end" onClick={update}>
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
