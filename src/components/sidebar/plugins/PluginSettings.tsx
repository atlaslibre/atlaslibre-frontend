import { Divider, Drawer } from "@mui/material";
import { drawerWidth } from "../../../App";
import GenericActorPluginSettings from "./GenericActorPluginSettings";
import { useAppSelector } from "../../../app/hooks";
import SpecificActorPluginSettings from "./SpecificActorPluginSettings";

interface PluginSettingsProps {
  open: boolean;
  handleClose: () => void;
}

export default function PluginSettings(props: PluginSettingsProps) {
  const { plugins } = useAppSelector((state) => state.plugin);
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
      <GenericActorPluginSettings type="aircraft" name="Aircraft" />
      <GenericActorPluginSettings type="ship" name="Ships" />

      <Divider />

      {plugins.map((plugin) => (
        <SpecificActorPluginSettings key={plugin.id} plugin={plugin.id} />
      ))}
    </Drawer>
  );
}
