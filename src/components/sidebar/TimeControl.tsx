import UpdateIcon from "@mui/icons-material/Update";
import {
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearFixedTime,
  setFixedTime,
  setMapTimezone,
  setMapTimezoneObjectId,
  setTimezoneType,
} from "../../features/map/mapSlice";
import { useMap } from "react-map-gl/maplibre";

export default function TimeControl() {
  const { timezoneType, mapTimezone, fixedTime, viewState } = useAppSelector(
    (state) => state.map
  );

  const [nowTime, setNowTime] = useState(dayjs.utc());
  const [effectiveTimezone, setEffectiveTimezone] = useState<string>();
  const [effectiveTimezoneLabel, setEffectiveTimezoneLabel] =
    useState<string>(mapTimezone);

  const dispatch = useAppDispatch();
  const map = useMap();

  const updateTimezoneType = (tz: string) => {
    if (tz === null) return;

    dispatch(setTimezoneType(tz));

    if (tz !== "map") {
      if (tz === "utc") setEffectiveTimezoneLabel("UTC");
      else if (tz === "system") setEffectiveTimezoneLabel("System time");
      setEffectiveTimezone(tz);
      return;
    }

    setEffectiveTimezone(mapTimezone);
  };

  useEffect(() => {
    updateTimezoneType(timezoneType);
    const interval = setInterval(() => setNowTime(dayjs.utc()), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (!map.default) return;

    const { clientWidth, clientHeight } = map.default.getContainer();
    const features = map.default?.queryRenderedFeatures(
      [clientWidth / 2, clientHeight / 2],
      { layers: ["timezones_lookup"] }
    );

    if (features.length === 0) return;
    const mapTzName = features[0].properties.tz_name1st;
    const mapTzAlt = features[0].properties.time_zone;
    const objectId = features[0].properties.objectid;

    dispatch(setMapTimezoneObjectId(objectId))

    if (mapTzName) {
      dispatch(setMapTimezone(mapTzName));
      if (timezoneType === "map")
        setEffectiveTimezoneLabel(mapTimezone.replace("_", " "));
    } else {
      dispatch(setMapTimezone(mapTzAlt.replace("UTC", "")));
      if (timezoneType === "map") setEffectiveTimezoneLabel(mapTzAlt);
    }
  }, [viewState, timezoneType]); 

  return (
    <div className="p-4">
      <Stack spacing={1.5}>
        <Stack
          direction="row"
          spacing={2}
          style={{ justifyContent: "space-between" }}
        >
          <DateTimePicker
            label={effectiveTimezoneLabel}
            value={fixedTime ? dayjs(fixedTime) : nowTime}
            timezone={effectiveTimezone}
            onChange={(newValue) => dispatch(setFixedTime(newValue?.toISOString()))}
            format="YYYY-MM-DD HH:mm:ss"
            disableFuture={true}
            ampm={false}
          />

          <div className="flex flex-col justify-center">
            <IconButton
              title="Reset to live clock"
              onClick={() => dispatch(clearFixedTime())}
              disabled={!fixedTime}
            >
              <UpdateIcon />
            </IconButton>
          </div>
        </Stack>

        <ToggleButtonGroup
          value={timezoneType}
          exclusive
          fullWidth
          size="small"
          onChange={(_e, t) => updateTimezoneType(t)}
        >
          <ToggleButton value={"utc"}>UTC</ToggleButton>
          <ToggleButton
            value={"map"}
            title="Timezone determined by the center of the map"
          >
            Map
          </ToggleButton>
          <ToggleButton value={"system"}>System</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </div>
  );
}