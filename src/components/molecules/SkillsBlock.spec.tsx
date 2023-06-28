import { render, screen } from '@testing-library/react';
import { SkillsBlock } from './SkillsBlock';

describe('SkillsBlock', () => {
  const skills = ['React', 'JavaScript', 'CSS'];

  test('renders SkillsBlock with skill items', () => {
    render(<SkillsBlock skills={skills} />);

    skills.forEach((skill) => {
      const skillItem = screen.getByText(skill);
      expect(skillItem).toBeInTheDocument();
    });
  });

  test('does not render any SkillItem if the skills array is empty', () => {
    render(<SkillsBlock skills={[]} />);

    const skillItems = screen.queryAllByTestId('skill-item');
    expect(skillItems).toHaveLength(0);
  });
});
