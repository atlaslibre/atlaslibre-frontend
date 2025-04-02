import GossipUpdater from "./components/services/GossipUpdater";
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

const drawerWidth = 360;

function App() {
  const { colorMode } = useAppSelector((state) => state.flags);

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
        <GossipUpdater />
        
        <div className="flex">
          <Fab
            color="default"
            aria-label="Open menu"
            onClick={handleDrawerToggle}
            size="small"
            sx={{
              mr: 2,
              display: { lg: "none" },
              float: "right",
              position: "absolute",
              top: "10px",
              right: "-3px",
              zIndex: 9999,
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
              display: { xs: "none", lg: "block" },
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
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
