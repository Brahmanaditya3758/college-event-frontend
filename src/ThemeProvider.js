import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const CustomThemeProvider = ({ children }) => {
  // Load theme from localStorage once
  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Toggle theme & save to localStorage
  const colorMode = {
    toggleColorMode: () => {
      setMode((prev) => {
        const next = prev === "light" ? "dark" : "light";
        localStorage.setItem("theme", next);
        return next;
      });
    }
  };

  // FULL DARK/LIGHT THEME (Fix disappearing content)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#121212" : "#f5f5f5",
            paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#ffffff" : "#000000",
            secondary: mode === "dark" ? "#cfcfcf" : "#444444",
          },
          primary: {
            main: "#3f51b5",
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomThemeProvider;
