import { FC } from 'react';
import Box from '@mui/material/Box';
import { SkillItem } from '../../lib/dist';

type Props = {
  skills: string[];
};

export const SkillsBlock: FC<Props> = ({ skills }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {skills.map((skill) => (
        <SkillItem key={skill} skill={skill} />
      ))}
    </Box>
  );
};
