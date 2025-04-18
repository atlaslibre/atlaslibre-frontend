import MainMap from "./components/MainMap";
import Sidebar from "./components/Sidebar";
import {
  createTheme,
  Drawer,
  Fab,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useAppSelector } from "./app/hooks";
import { ErrorBoundary } from "react-error-boundary";
import Whoops from "./components/Whoops";
import PluginDiscovery from "./components/services/PluginDiscovery";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MapProvider } from "react-map-gl/maplibre";

export const drawerWidth = 360;

function App() {
  const { colorMode, screenshotMode } = useAppSelector((state) => state.flags);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const selectedTheme =
    colorMode == "dark" || (colorMode === "system" && prefersDarkMode)
      ? darkTheme
      : lightTheme;

  return (
    <ErrorBoundary FallbackComponent={Whoops}>
      <ThemeProvider theme={selectedTheme} storageManager={null}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MapProvider>
            <PluginDiscovery />

            <div className="flex h-screen" style={{ padding: screenshotMode ? "20px": "0"}}>
              <Fab
                color="default"
                aria-label="Open menu"
                onClick={handleDrawerToggle}
                size="small"
                sx={{
                  mr: 2,
                  display: {
                    xs: screenshotMode ? "none" : "block",
                    lg: "none",
                  },
                  float: "right",
                  position: "absolute",
                  top: "10px",
                  right: "-3px",
                  zIndex: { xs: 9999, sm: 1 },
                }}
              >
                <MenuIcon />
              </Fab>

              <div style={{ flexGrow: 1 }}>
                <MainMap />
              </div>

              <Drawer
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                anchor="right"
                sx={{
                  minWidth: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    minWidth: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
                slotProps={{
                  root: {
                    keepMounted: true, // Better open performance on mobile.
                  },
                }}
              >
                <Sidebar />
              </Drawer>

              <Drawer
                variant="permanent"
                anchor="right"
                sx={{
                  minWidth: drawerWidth,
                  display: {
                    xs: "none",
                    lg: screenshotMode ? "none" : "block",
                  },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    minWidth: drawerWidth,
                  },
                }}
                open
              >
                <Sidebar />
              </Drawer>
            </div>
          </MapProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
