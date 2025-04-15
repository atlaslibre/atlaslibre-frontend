import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";

import { useAppSelector } from "../../app/hooks";
import { ActorPluginMenuItem } from "./plugins/ActorPluginMenuItem";
import { IconButton, Stack } from "@mui/material";
import { Settings } from "@mui/icons-material";
import PluginSettings from "./plugins/PluginSettings";
import { useState } from "react";

export default function PluginsMenu() {
  const [openSettings, setOpenSettings] = useState(false);
  const { plugins } = useAppSelector((state) => state.plugin);

  if (plugins.length === 0) return <></>;

  return (
    <>
      <PluginSettings
        open={openSettings}
        handleClose={() => setOpenSettings(false)}
      />
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        disablePadding
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Stack direction="row" justifyContent="space-between">
              <div>Plugins</div>
              <div>
                <IconButton
                  edge="end"
                  onClick={() => setOpenSettings(!openSettings)}
                >
                  <Settings />
                </IconButton>
              </div>
            </Stack>
          </ListSubheader>
        }
      >
        {plugins.map((plugin) => (
          <div key={plugin.id}>
            {plugin.type == "actor" && <ActorPluginMenuItem plugin={plugin} />}
          </div>
        ))}
      </List>
    </>
  );
}
