import { Provider } from "react-redux";

import { persistor, store } from "./app/store";
import GossipUpdater from "./components/services/GossipUpdater";
import MainMap from "./components/MainMap";
import Sidebar from "./components/Sidebar";
import { PersistGate } from "redux-persist/integration/react";
import { Drawer, Fab } from "@mui/material";
import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

const drawerWidth = 360;

function App() {
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

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
