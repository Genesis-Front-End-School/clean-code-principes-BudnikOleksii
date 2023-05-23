import React from 'react';
import Box from '@mui/material/Box';

interface Props {
  children: React.ReactNode;
}

export const ContentContainer: React.FC<Props> = ({ children }) => (
  <Box component="main" sx={{ p: 3, width: '100%', maxWidth: '1440px', margin: '64px auto 0' }}>
    {children}
  </Box>
);
