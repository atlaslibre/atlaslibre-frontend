import { Drawer } from "@mui/material";
import { drawerWidth } from "../../../App";
import ActorPluginSettings from "./ActorPluginSettings";

interface PluginSettingsProps {
  open: boolean;
  handleClose: () => void;
}

export default function PluginSettings(props: PluginSettingsProps) {
  return (
    <Drawer
      open={props.open}
      onClose={props.handleClose}
      anchor="right"
      variant="temporary"
      sx={{
        minWidth: drawerWidth,
        display: { xs: "none", lg: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          minWidth: drawerWidth,
        },
      }}
    >
      <ActorPluginSettings type="aircraft" name="Aircraft" />
      <ActorPluginSettings type="ship" name="Ships" />

    </Drawer>
  );
}
