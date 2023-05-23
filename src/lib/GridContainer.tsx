import React from 'react';
import Grid from '@mui/material/Grid';

type Props = {
  children: React.ReactNode;
};

export const GridContainer: React.FC<Props> = ({ children }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 3, p: 3 }}>
      {children}
    </Grid>
  );
};
