import React from 'react';
import Box from '@mui/material/Box';

type Props = {
  skill: string;
};

export const SkillItem: React.FC<Props> = ({ skill }) => {
  return (
    <Box
      key={skill}
      sx={{
        padding: '10px',
        backgroundColor: 'purple',
        color: '#fff',
        borderRadius: '10px',
      }}
    >
      {skill}
    </Box>
  );
};
