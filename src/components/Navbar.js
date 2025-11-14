import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = ({ onLogout }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1f2937" : "#3f51b5",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">College Event Manager</Typography>

        <IconButton onClick={onLogout} color="inherit">
          <SettingsIcon sx={{ mr: 1 }} />
          LOGOUT
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
