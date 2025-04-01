import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ToggleButton, useMediaQuery } from "@mui/material";
import { toggleColorMode } from "../../features/flags/flagsSlice";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeSwitch() {
  const { colorMode } = useAppSelector((state) => state.flags);
  const dispatch = useAppDispatch();

  const handleChange = () => {
    dispatch(toggleColorMode());
  };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <ToggleButton
      title="Change color mode"
      value="check"
      selected={colorMode !== "system"}
      onChange={handleChange}
      size="small"
    >
      {colorMode === "light" && <LightModeIcon />}
      {colorMode === "dark" && <DarkModeIcon />}

      {colorMode === "system" && !prefersDarkMode && <LightModeIcon />}
      {colorMode === "system" && prefersDarkMode && <DarkModeIcon />}
    </ToggleButton>
  );
}
