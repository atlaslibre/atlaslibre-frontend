import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleProjection } from "../../features/map/mapSlice";
import { ToggleButton } from "@mui/material";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import PublicIcon from "@mui/icons-material/Public";

export default function ProjectionSwitch() {
  const { projection } = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();

  const handleChange = () => {
    dispatch(toggleProjection());
  };

  return (
    <ToggleButton
      title="Change projection"
      value="check"
      selected={projection === "globe"}
      onChange={handleChange}
      size="small"
    >
      {projection === "globe" && <PublicIcon />}
      {projection !== "globe" && <PublicOffIcon />}
    </ToggleButton>
  );
}
