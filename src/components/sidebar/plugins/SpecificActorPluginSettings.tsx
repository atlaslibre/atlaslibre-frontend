import {
  List,
  ListSubheader,
  ListItemText,
  ListItem,
  Slider,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  updateSettingsQueryMaxAge,
  updateSettingsQueryMaxTrack,
} from "../../../features/gossip/pluginSettingsSlice";

import humanizeDuration from "humanize-duration";

interface SpecificActorPluginSettingsProps {
  plugin: string;
}

export default function SpecificActorPluginSettings(
  props: SpecificActorPluginSettingsProps
) {
  const { plugins } = useAppSelector((state) => state.plugin);
  const { settings } = useAppSelector((state) => state.pluginSettings);
  const dispatch = useAppDispatch();

  const plugin = plugins.find((p) => p.id == props.plugin);
  const setting = settings[props.plugin];

  if (!plugin || !setting || setting.type !== "actor" || !setting.enabled)
    return false;

  const secondsToLabel = (seconds: number) => {
    return humanizeDuration(seconds * 1000);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {plugin.name}
        </ListSubheader>
      }
    >
      <ListItem>
        <ListItemText>Max Age</ListItemText>

        <Slider
          min={60}
          max={3600}
          step={60}
          sx={{ width: "50%", zIndex: 10 }}
          size="small"
          value={setting.query.maxAge}
          valueLabelDisplay="auto"
          valueLabelFormat={secondsToLabel}
          onChange={(_evt, value) => {
            dispatch(
              updateSettingsQueryMaxAge({
                plugin: props.plugin,
                value: value,
              })
            );
          }}
        />
      </ListItem>

      <ListItem>
        <ListItemText>Max Track</ListItemText>

        <Slider
          min={600}
          max={3600 * 24 * 7}
          step={600}
          sx={{ width: "50%", zIndex: 10 }}
          size="small"
          value={setting.query.maxTrack}
          valueLabelFormat={secondsToLabel}
          valueLabelDisplay="auto"
          onChange={(_evt, value) => {
            dispatch(
              updateSettingsQueryMaxTrack({
                plugin: props.plugin,
                value: value,
              })
            );
          }}
        />
      </ListItem>
    </List>
  );
}
