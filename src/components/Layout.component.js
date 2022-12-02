import React from 'react';

import { SwitchModeButton } from '../components/switchModeButton.component';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const Layout = ({ children }) => {
  return <>
    <CssBaseline />
    <Container maxWidth="lg">
      <SwitchModeButton />
      {children}
    </Container>
  </>
}

export default Layout;