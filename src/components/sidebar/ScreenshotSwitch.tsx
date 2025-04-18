import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ToggleButton } from "@mui/material";
import { toggleScreenshotMode } from "../../features/flags/flagsSlice";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";

export default function ScreenshotSwitch() {
  const { screenshotMode } = useAppSelector((state) => state.flags);
  const dispatch = useAppDispatch();

  const handleChange = () => {
    dispatch(toggleScreenshotMode());
  };

  return (
    <ToggleButton
      title="Turn on Screenshot Mode"
      value="check"
      selected={screenshotMode}
      onChange={handleChange}
      size="small"
    >
      <ScreenshotMonitorIcon />
    </ToggleButton>
  );
}
