import "maplibre-gl/dist/maplibre-gl.css";

import sample from "../../large-sample.json";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IActor } from "../interfaces/schemas";
import { update } from "../features/gossip/gossipSlice";
import ProjectionSwitch from "./sidebar/ProjectionSwitch";
import { Button, ButtonGroup, ListSubheader, Stack } from "@mui/material";
import DebuggingSwitch from "./sidebar/DebuggingSwitch";
import StaticLayersMenu from "./sidebar/StaticLayersMenu";
import UnitsSwitch from "./sidebar/UnitsSwtich";
import ThemeSwitch from "./sidebar/ThemeSwitch";
import PluginsMenu from "./sidebar/PluginsMenu";
import TimeControl from "./sidebar/TimeControl";
import CustomMapMenu from "./sidebar/CustomMapMenu";

export default function Sidebar() {
  const { actors } = useAppSelector((state) => state.gossip);
  const { debuggingEnabled } = useAppSelector((state) => state.flags);
  const { activeCustomMap } = useAppSelector((state) => state.customMap);

  const dispatch = useAppDispatch();

  const sampleData = sample as IActor[];

  const load = (size?: number) => () => {
    const dataset = sampleData.slice(0, size);
    console.log("Loading dataset: ", dataset.length);
    dispatch(update(dataset));
  };

  return (
    <>
      <div className="h-screen overflow-y-scroll overflow-x-clip w-full">
        <TimeControl />
        <PluginsMenu />
        <CustomMapMenu />
        <StaticLayersMenu />

        {debuggingEnabled && (
          <>
            <ListSubheader component="div" id="nested-list-subheader">
              Debugging
            </ListSubheader>
            <div className="pl-4 pr-4 pb-4">
              <div className="text-sm pb-4">Actors loaded: {actors.length}</div>
              <div className="text-sm pb-4">
                Active custom map features: {activeCustomMap.features.length}
              </div>

              <ButtonGroup
                size="small"
                orientation="vertical"
                className="w-full"
              >
                <Button onClick={load()}>Load sample</Button>
              </ButtonGroup>
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        {debuggingEnabled && (
          <div className="text-xs text-neutral-300 pb-4 text-right w-full">
            <div className="pb-2">
              Please provide any bug reports <br />
              or ideas on the backlog at{" "}
              <a
                href="https://github.com/atlaslibre/design/issues"
                className="text-blue-200"
                target="_blank"
              >
                Github
              </a>
            </div>
            <code>
              <strong>Version {__APP_VERSION__}</strong>
              <br />
              {__COMMIT_DATE__.trim()}
              <br />
              Commit: {__COMMIT_HASH__}
            </code>
          </div>
        )}

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <DebuggingSwitch />
          <ThemeSwitch />
          <UnitsSwitch />
          <ProjectionSwitch />
        </Stack>
      </div>
    </>
  );
}
