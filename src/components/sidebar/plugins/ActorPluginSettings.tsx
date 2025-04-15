import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  capitalize,
  TextField,
  ListItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  TrackColorRangeType,
  updateTrackColorRange,
  updateTrackColorRangeType,
} from "../../../features/gossip/pluginSettingsSlice";
import { ChangeEvent } from "react";

interface ActorPluginSettingsProps {
  type: "aircraft" | "ship";
  name: string;
}

export default function ActorPluginSettings(props: ActorPluginSettingsProps) {
  const { trackColorRange } = useAppSelector((state) => state.pluginSettings);
  const dispatch = useAppDispatch();

  const tcr = trackColorRange[props.type];

  const handleValueChange =
    (valueType: "max" | "min") => (event: ChangeEvent<HTMLInputElement>) => {
      let newValue = parseInt(event.target.value);

      if (Number.isNaN(newValue)) newValue = 0;

      dispatch(
        updateTrackColorRange({
          actorType: props.type,
          min: valueType == "min" ? newValue : tcr.min,
          max: valueType == "max" ? newValue : tcr.max,
        })
      );
    };

  const toggleTrackColorType = () => {
    let updated: TrackColorRangeType;

    if (tcr.type == "altitude") updated = "speed";
    else if (tcr.type == "speed") updated = "altitude";
    else throw new Error("Not implemented");

    dispatch(
      updateTrackColorRangeType({
        parameterType: updated,
        actorType: props.type,
      })
    );
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {props.name}
        </ListSubheader>
      }
    >
      <ListItemButton onClick={toggleTrackColorType}>
        <ListItemText primary="Track color" secondary={capitalize(tcr.type)} />
      </ListItemButton>
      <ListItem>
        <ListItemText>Minimum {tcr.type}</ListItemText>
        <TextField
          variant="standard"
          value={tcr.min}
          size="small"
          onChange={handleValueChange("min")}
        />
      </ListItem>

      <ListItem>
        <ListItemText>Maximum {tcr.type}</ListItemText>
        <TextField
          variant="standard"
          value={tcr.max}
          size="small"
          onChange={handleValueChange("max")}
        />
      </ListItem>
    </List>
  );
}
