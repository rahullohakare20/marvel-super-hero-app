import React from 'react';
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";
import { ColorContext } from "./ColorContext";
import HeroList from './pages/HeroList.page';

import './App.css';
import {
  Route,
  Routes 
} from 'react-router-dom';
import HeroDetails from './pages/HeroDetails.page';

function App() {
  const [mode, setMode] = React.useState("dark");
  const theme = React.useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <div className="App">
          <Routes>
            <Route path="/" element={<HeroList />} />
            <Route path="/heroDetails/:id" element={<HeroDetails />} />
            <Route path="*" element={<><p>404 Page not found</p></>} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorContext.Provider>
  );
}

export default App;
