import { Geoman } from "@geoman-io/maplibre-geoman-free";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";
import { useFilePicker } from "use-file-picker";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  saveActiveCustomMap,
  setActiveMapToInactive,
} from "../../features/map/customMapSlice";
import CustomMapMenuLayer from "./CustomMapMenuLayer";

export default function CustomMapMenu() {
  const { activeCustomMap, inactiveCustomMap } = useAppSelector(
    (state) => state.customMap
  );
  const dispatch = useAppDispatch();

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const { openFilePicker, filesContent } = useFilePicker({
    accept: ".geojson",
  });

  const map = useMap();

  useEffect(() => {
    // GM is GeoMans namespace, which is not visible on the map type
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const innerMap = map.default?.getMap() as any;
    if (innerMap) {
      const geoman = innerMap.gm as Geoman;

      // this seems very complicated, but needed for this to work
      geoman.features.forEach((f) => f.delete());
      geoman.features.featureStore.clear();
      geoman.features.featureCounter = 0;
      geoman.features.importGeoJson(activeCustomMap);
    }
  }, [activeCustomMap]);

  useEffect(() => {
    if (filesContent.length === 0) return;
    const [{ content }] = filesContent;
    const geojson = JSON.parse(content);
    dispatch(saveActiveCustomMap(geojson));
  }, [filesContent]);

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              await dispatch(setActiveMapToInactive(formJson.name));
              setDialogOpen(false);
            },
          },
        }}
      >
        <DialogTitle>Name your custom layer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a name for your custom layer
          </DialogContentText>
          <TextField
            autoFocus
            required
            autoComplete="off"
            margin="dense"
            id="name"
            name="name"
            label="Layer name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>

      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        disablePadding
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            My layers
          </ListSubheader>
        }
      >
        <ListItem
          dense
          secondaryAction={
            <>
              <IconButton onClick={() => openFilePicker()}>
                <FileUploadIcon />
              </IconButton>
              <IconButton
                onClick={() => setDialogOpen(true)}
                edge="end"
                disabled={activeCustomMap.features.length === 0}
              >
                <SaveIcon />
              </IconButton>
            </>
          }
        >
          <ListItemText
            primary="Drawing layer"
            secondary={`Active, ${activeCustomMap.features.length} features`}
          />
        </ListItem>

        {inactiveCustomMap.map((customMap, index) => (
          <CustomMapMenuLayer key={index} map={customMap} index={index} />
        ))}
      </List>
    </>
  );
}
