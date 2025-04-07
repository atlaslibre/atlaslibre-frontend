import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ToggleButton } from "@mui/material";
import { toggleColorMode } from "../../features/flags/flagsSlice";

import { Brightness4, Brightness5, BrightnessAuto } from "@mui/icons-material";

export default function ThemeSwitch() {
  const { colorMode } = useAppSelector((state) => state.flags);
  const dispatch = useAppDispatch();

  const handleChange = () => {
    dispatch(toggleColorMode());
  };

  return (
    <ToggleButton
      title="Change color mode"
      value="check"
      selected={colorMode !== "system"}
      onChange={handleChange}
      size="small"
    >
      {colorMode === "light" && <Brightness5 />}
      {colorMode === "dark" && <Brightness4 />}
      {colorMode === "system" && <BrightnessAuto />}
    </ToggleButton>
  );
}
