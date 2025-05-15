import { Geoman } from "@geoman-io/maplibre-geoman-free";
import Coordinates from 'coordinate-parser';
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton, ListItem, ListItemText, Stack } from "@mui/material";
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
  addFeatureToActiveMap,
  saveActiveCustomMap,
  setActiveMapToInactive,
} from "../../features/map/customMapSlice";
import CustomMapMenuLayer from "./CustomMapMenuLayer";

export default function CustomMapMenu() {
  const { activeCustomMap, inactiveCustomMap } = useAppSelector(
    (state) => state.customMap
  );
  const dispatch = useAppDispatch();

  const [layerNameDialogOpen, setLayerNameDialogOpen] = React.useState(false);
  const [importCoordinatesDialogOpen, setImportCoordinatesDialogOpen] =
    React.useState(false);
  const [coordinateParseError, setCoordinateParseError] = React.useState<
    string | undefined
  >(undefined);

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
  }, [activeCustomMap]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (filesContent.length === 0) return;
    const [{ content }] = filesContent;
    const geojson = JSON.parse(content);
    dispatch(saveActiveCustomMap(geojson));
  }, [filesContent]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Dialog
        open={layerNameDialogOpen}
        onClose={() => setLayerNameDialogOpen(false)}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              await dispatch(setActiveMapToInactive(formJson.name));
              setLayerNameDialogOpen(false);
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
          <Button onClick={() => setLayerNameDialogOpen(false)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={importCoordinatesDialogOpen}
        onClose={() => setImportCoordinatesDialogOpen(false)}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const coordinates = formJson.coords.split("\n") as string[];
              let parsedCoordinates: number[][] = [];
              const allParsedCoordinates = [parsedCoordinates];

              const replacer = /(?<=\d)[-](?=\d)/g;

              for (let i = 0; i < coordinates.length; i++) {
                let coord = coordinates[i].trim();

                if (coord.length === 0) {
                  parsedCoordinates = [];
                  allParsedCoordinates.push(parsedCoordinates);
                  continue;
                }

                try {
                  coord = coord.replace(replacer, " ");
                  const parsed = new Coordinates(coord);
                  parsedCoordinates.push([
                    parsed.getLongitude(),
                    parsed.getLatitude(),
                  ]);
                } catch (e: any) {
                  console.error(e);
                  setCoordinateParseError(
                    `Line ${i + 1}: ${e.toString()}: ${coord}`
                  );
                  return;
                }
              }

              for (let j = 0; j < allParsedCoordinates.length; j++) {
                parsedCoordinates = allParsedCoordinates[j];

                if (parsedCoordinates.length < 3) {
                  for (let i = 0; i < parsedCoordinates.length; i++) {
                    dispatch(
                      addFeatureToActiveMap({
                        type: "Feature",
                        geometry: {
                          type: "Point",
                          coordinates: parsedCoordinates[i],
                        },
                        properties: {
                          shape: "marker",
                        },
                      })
                    );
                  }
                } else {
                  parsedCoordinates.push(parsedCoordinates[0]);
                  dispatch(
                    addFeatureToActiveMap({
                      type: "Feature",
                      geometry: {
                        type: "Polygon",
                        coordinates: [parsedCoordinates],
                      },
                      properties: {
                        shape: "polygon",
                      },
                    })
                  );
                }
              }

              setCoordinateParseError(undefined);
              setImportCoordinatesDialogOpen(false);
            },
          },
        }}
      >
        <DialogTitle>Add coordinates</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add coordinates to the map, must be latitude first if not specified
            otherwise. One coordinate pair per line only. Blank lines will
            create new polygons. Less than 3 points will generate singular
            markers.
          </DialogContentText>

          <TextField
            autoFocus
            required
            autoComplete="off"
            margin="dense"
            id="coords"
            name="coords"
            label={coordinateParseError ?? "Coordinates"}
            type="text"
            multiline
            minRows={10}
            fullWidth
            variant="standard"
            error={!!coordinateParseError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImportCoordinatesDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>

      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        disablePadding
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Stack direction="row" justifyContent="space-between">
              <div>My layers</div>
              <div>
                <IconButton onClick={() => openFilePicker()} edge="end">
                  <FileUploadIcon />
                </IconButton>
              </div>
            </Stack>
          </ListSubheader>
        }
      >
        <ListItem
          dense
          secondaryAction={
            <>
              <IconButton onClick={() => setImportCoordinatesDialogOpen(true)}>
                <AddLocationAltIcon />
              </IconButton>

              <IconButton
                onClick={() => setLayerNameDialogOpen(true)}
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
