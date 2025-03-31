import "maplibre-gl/dist/maplibre-gl.css";

import sample from "../../large-sample.json";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IActor } from "../interfaces/schemas";
import { update } from "../features/gossip/gossipSlice";
import ProjectionSwitch from "./sidebar/ProjectionSwitch";
import { Button, ButtonGroup, ListSubheader, Stack } from "@mui/material";
import DebuggingSwitch from "./sidebar/DebuggingSwitch";
import StaticLayersMenu from "./sidebar/StaticLayersMenu";

export default function () {
  const { actors } = useAppSelector((state) => state.gossip);
  const { debuggingEnabled } = useAppSelector((state) => state.flags);

  const dispatch = useAppDispatch();

  const sampleData = sample as IActor[];

  const load = (size?: number) => () => {
    const dataset = sampleData.slice(0, size);
    console.log("Loading dataset: ", dataset.length);
    dispatch(update(dataset));
  };

  const dump = () => () => {
    console.log(JSON.stringify(actors));
  };

  return (
    <>
      <div className="h-screen overflow-y-scroll overflow-x-clip w-full">
        {debuggingEnabled && (
          <>
            <ListSubheader component="div" id="nested-list-subheader">
              Debugging
            </ListSubheader>
            <div className="pl-4 pr-4 pb-4">
              <div className="text-sm pb-4">Actors loaded: {actors.length}</div>
              <ButtonGroup
                size="small"
                orientation="vertical"
                className="w-full"
              >
                <Button onClick={load(1000)}>Load small sample</Button>
                <Button onClick={load()}>Load huge sample</Button>
                <Button onClick={dump()}>Dump actors to console</Button>
              </ButtonGroup>
            </div>
          </>
        )}

        <StaticLayersMenu />
      </div>

      <div className="p-4 ">
      {debuggingEnabled && (
        <div className="text-xs text-neutral-300 pb-4 text-right w-full">
         <code>
         <strong>Version {__APP_VERSION__}</strong>
         <br />{__COMMIT_DATE__.trim()} commit {__COMMIT_HASH__}
        </code>
        </div>
      )}

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <DebuggingSwitch />
          <ProjectionSwitch />
        </Stack>
      </div>
    </>
  );
}
