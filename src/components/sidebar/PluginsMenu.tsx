import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ActorPluginMenuItem } from "./plugins/ActorPluginMenuItem";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { Settings, FilterAlt, FilterAltOff } from "@mui/icons-material";
import PluginSettings from "./plugins/PluginSettings";
import { useState } from "react";
import { setFilter } from "../../features/gossip/pluginSettingsSlice";

export default function PluginsMenu() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const { plugins } = useAppSelector((state) => state.plugin);
  const { filter } = useAppSelector((state) => state.pluginSettings);
  const dispatch = useAppDispatch();

  if (plugins.length === 0) return <></>;

  return (
    <>
      <Dialog
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              await dispatch(setFilter(formJson.filter));
              setOpenFilter(false);
            },
          },
        }}
      >
        <DialogTitle>Filter plugin results</DialogTitle>
        <DialogContent>
          <DialogContentText>
            TODO: Help text on how filters work.
          </DialogContentText>
          <TextField
            autoFocus
            required
            autoComplete="off"
            margin="dense"
            id="name"
            name="filter"
            label="Filter"
            type="text"
            fullWidth
            multiline
            variant="standard"
            defaultValue={filter}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFilter(false)} color="secondary">
            Cancel
          </Button>
          <Button
            color="warning"
            onClick={() => {
              dispatch(setFilter(undefined));
              setOpenFilter(false);
            }}
          >
            Clear
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
                <IconButton onClick={() => setOpenFilter(!openFilter)}>
                  {filter !== undefined && <FilterAlt />}
                  {filter === undefined && <FilterAltOff />}
                </IconButton>
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
