import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { Actor } from "../../../interfaces/actor";
import { useAppDispatch } from "../../../app/hooks";
import {
  clearOverrides,
  setOverrides,
} from "../../../features/gossip/pluginSettingsSlice";

interface ShipTooltipOverrideProps {
  visible: boolean;
  actor: Actor;
  onClose: () => void;
}

export default function ShipTooltipOverride({
  visible,
  actor,
  onClose,
}: ShipTooltipOverrideProps) {
  if (actor.type !== "ship") return false;

  const dispatch = useAppDispatch();

  const clear = () => {
    dispatch(clearOverrides(actor.id));
    onClose();
  };

  const clearIfUnchanged = (val: string) => {
    if (val === "" || val === undefined || val === null) return undefined;
    return val;
  };

  return (
    <Dialog
      open={visible}
      onClose={() => onClose()}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());

            dispatch(
              setOverrides({
                id: actor.id,
                override: {
                  type: "ship",
                  name: clearIfUnchanged(formJson.name),
                  flag: clearIfUnchanged(formJson.flag),
                  class: clearIfUnchanged(formJson.class),
                },
              })
            );

            onClose();
          },
        },
      }}
    >
      <DialogTitle>Override properties: {actor.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Leave properties empty, that you do not want to override
        </DialogContentText>
        <TextField
          autoFocus
          required
          autoComplete="off"
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          defaultValue={actor.name}
          variant="standard"
        />
        <TextField
          autoFocus
          required
          autoComplete="off"
          margin="dense"
          id="flag"
          name="flag"
          label="Flag"
          type="text"
          fullWidth
          defaultValue={actor.flag}
          variant="standard"
        />
        <TextField
          autoFocus
          required
          autoComplete="off"
          margin="dense"
          id="class"
          name="class"
          label="Class"
          type="text"
          fullWidth
          defaultValue={actor.class}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="warning" onClick={clear}>
          Clear
        </Button>
        <Button color="primary" type="submit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
