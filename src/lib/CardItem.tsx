import React from 'react';
import Card from '@mui/material/Card';

type Props = {
  children: React.ReactNode;
};

export const CardItem: React.FC<Props> = ({ children }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        p: 2,
        flexDirection: { xs: 'column', lg: 'row' },
        maxWidth: '100%',
      }}
    >
      {children}
    </Card>
  );
};
