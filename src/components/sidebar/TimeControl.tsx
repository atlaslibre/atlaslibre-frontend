import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppSelector } from "../../app/hooks";

export default function TimeControl() {
  const mapState = useAppSelector((state) => state.map);
  const [time, setTime] = useState(dayjs.utc());
  const [tz, setTz] = useState("UTC");

  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs.utc()), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="p-4">
      <Stack spacing={2}>
        <DateTimePicker
          label={`Date and time (${tz})`}
          value={time}
          timezone={tz}
          onChange={(newValue) => setTime(newValue!)}
          format="YYYY-MM-DD HH:mm:ss"
          ampm={false}
        />

        <ToggleButtonGroup
          value={tz}
          exclusive
          fullWidth
          size="small"
          onChange={(_event, newTimezone) => {
            if (newTimezone != null) {
              setTz(newTimezone);
            }
          }}
        >
          <ToggleButton value={"UTC"}>UTC</ToggleButton>
          <ToggleButton value={mapState.timezone}>Map</ToggleButton>
          <ToggleButton value={"system"}>System</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </div>
  );
}
