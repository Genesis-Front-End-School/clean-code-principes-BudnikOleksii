import { FC, ReactNode } from 'react';
import Card from '@mui/material/Card';

type Props = {
  children: ReactNode;
};

export const CardItem: FC<Props> = ({ children }) => {
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
