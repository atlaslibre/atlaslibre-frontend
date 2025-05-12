import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ToggleButton } from "@mui/material";
import { toggleDebugging } from "../../features/flags/flagsSlice";
import { PestControl } from "@mui/icons-material";

export default function DebuggingSwitch() {
  const { debuggingEnabled } = useAppSelector((state) => state.flags);
  const dispatch = useAppDispatch();

  const handleChange = () => {
    dispatch(toggleDebugging());
  };

  return (
    <ToggleButton
      title="Show debugging tools"
      value="check"
      selected={debuggingEnabled}
      onChange={handleChange}
      size="small"
    >
      <PestControl />
    </ToggleButton>
  );
}
