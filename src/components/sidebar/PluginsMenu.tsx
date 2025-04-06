import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";

import { useAppSelector } from "../../app/hooks";
import { ActorPluginMenuItem } from "./plugins/ActorPluginMenuItem";

export default function PluginsMenu() {
  const { plugins } = useAppSelector((state) => state.plugin);

  if (plugins.length === 0) return <></>;

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      disablePadding
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Plugins
        </ListSubheader>
      }
    >
      {plugins.map((plugin) => (
        <div key={plugin.id}>
          {plugin.type == "actor" && <ActorPluginMenuItem plugin={plugin} />}
        </div>
      ))}
    </List>
  );
}
