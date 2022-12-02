
import React, { useContext } from "react";
import { Brightness4 as LightIcon } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import DarkIcon from "@mui/icons-material/Brightness4";

import { ColorContext } from "../ColorContext";

export const SwitchModeButton = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorContext);

  return <>
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </>
};