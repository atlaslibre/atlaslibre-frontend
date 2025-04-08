import "maplibre-gl/dist/maplibre-gl.css";

import { useAppSelector } from "../app/hooks";
import ProjectionSwitch from "./sidebar/ProjectionSwitch";
import { Stack } from "@mui/material";
import DebuggingSwitch from "./sidebar/DebuggingSwitch";
import StaticLayersMenu from "./sidebar/StaticLayersMenu";
import UnitsSwitch from "./sidebar/UnitsSwtich";
import ThemeSwitch from "./sidebar/ThemeSwitch";
import PluginsMenu from "./sidebar/PluginsMenu";
import TimeControl from "./sidebar/TimeControl";
import CustomMapMenu from "./sidebar/CustomMapMenu";

export default function Sidebar() {
  const { debuggingEnabled } = useAppSelector((state) => state.flags);

  return (
    <>
      <div className="h-screen overflow-y-scroll overflow-x-clip w-full">
        <TimeControl />
        <PluginsMenu />
        <CustomMapMenu />
        <StaticLayersMenu />
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
