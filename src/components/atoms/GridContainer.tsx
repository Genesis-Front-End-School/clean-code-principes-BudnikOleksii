import { FC, ReactNode } from 'react';
import Grid from '@mui/material/Grid';

type Props = {
  children: ReactNode;
};

export const GridContainer: FC<Props> = ({ children }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 3, p: 3 }}>
      {children}
    </Grid>
  );
};
