import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  capitalize,
  TextField,
  ListItem,
  Slider,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  ActorType,
  TrackColorRangeType,
  updateScale,
  updateTrackColorRange,
  updateTrackColorRangeType,
} from "../../../features/gossip/pluginSettingsSlice";
import { ChangeEvent } from "react";

interface GenericActorPluginSettingsProps {
  type: ActorType;
  name: string;
}

export default function GenericActorPluginSettings(props: GenericActorPluginSettingsProps) {
  const { trackColorRange, scale } = useAppSelector(
    (state) => state.pluginSettings
  );
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

      <ListItem>
        <ListItemText>Scale</ListItemText>

        <Slider
          min={0.1}
          max={5}
          step={0.1}
          sx={{ width: "50%" }}
          size="small"
          value={scale[props.type]}
          marks={[{ value: 1 }]}
          valueLabelDisplay="auto"
          onChange={(_evt, value) => {
            dispatch(
              updateScale({
                scale: value,
                actorType: props.type,
              })
            );
          }}
        />
      </ListItem>
    </List>
  );
}
