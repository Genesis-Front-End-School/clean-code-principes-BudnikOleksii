import { render, screen } from '@testing-library/react';
import { SkillItem } from './SkillItem';

describe('SkillItem', () => {
  const testSkill = 'React';

  test('renders SkillItem with correct skill text', () => {
    render(<SkillItem skill={testSkill} />);

    const skillItem = screen.getByText(testSkill);
    expect(skillItem).toBeInTheDocument();
  });

  test('renders SkillItem with the expected styles', () => {
    render(<SkillItem skill={testSkill} />);

    const skillItem = screen.getByText(testSkill);
    expect(skillItem).toHaveStyle({
      padding: '10px',
      backgroundColor: 'purple',
      color: '#fff',
      borderRadius: '10px',
    });
  });
});
