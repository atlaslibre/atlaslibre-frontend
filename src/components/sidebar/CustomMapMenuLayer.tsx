import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import ColorizeIcon from "@mui/icons-material/Colorize";

import {
  CustomMap,
  deleteInactiveMap,
  setInactiveMapColor,
  setInactiveMapToActive,
  toggleVisibilityOfInactiveMap,
} from "../../features/map/customMapSlice";

interface CustomMapMenuLayerProps {
  index: number;
  map: CustomMap;
}

export default function CustomMapMenuLayer({
  index,
  map,
}: CustomMapMenuLayerProps) {
  const dispatch = useAppDispatch();

  const id = `inactiveCustomMap-${index}`;

  const downloadJsonFile = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(map.geoJson)], {
      type: "application/geo+json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${map.name}.geojson`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  if (map === undefined) return false;

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton onClick={downloadJsonFile}>
            <DownloadIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              dispatch(
                setInactiveMapColor({
                  color: prompt("Change color (CSS-style supported)", map.color) ?? map.color,
                  index,
                })
              )
            }
          >
            <ColorizeIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(setInactiveMapToActive(index))}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => dispatch(deleteInactiveMap(index))}
            edge="end"
          >
            <DeleteForeverIcon />
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={() => dispatch(toggleVisibilityOfInactiveMap(index))}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={map.visible}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": id }}
          />
        </ListItemIcon>
        <ListItemText
          id={id}
          primary={map.name}
          secondary={`${map.geoJson.features.length} features`}
        />
      </ListItemButton>
    </ListItem>
  );
}
