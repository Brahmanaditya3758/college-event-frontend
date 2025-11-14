import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#90caf9",
      },
      background: {
        default: mode === "dark" ? "#0a0f1a" : "#f7f9fc",
        paper: mode === "dark" ? "#111827" : "#ffffff",
      },
    },
    components: {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: mode === "dark" ? "#111827" : "#ffffff",
        backgroundImage: "none",
        color: mode === "dark" ? "#ffffff" : "#000000",
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "16px",
        backdropFilter: "blur(10px)",
        padding: "10px",
        background:
          mode === "dark"
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.03)",
        border:
          mode === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",
        color: mode === "dark" ? "#ffffff" : "#000000",
      },
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: {
        color: mode === "dark" ? "#e5e7eb" : "#111827",
      },
    },
  },
},
  });
