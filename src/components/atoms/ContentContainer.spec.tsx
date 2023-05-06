import { render, screen } from '@testing-library/react';
import { ContentContainer } from './ContentContainer';

describe('ContentContainer', () => {
  test('renders children inside the content container', () => {
    const testContent = 'Test Content';

    render(
      <ContentContainer>
        <div>{testContent}</div>
      </ContentContainer>
    );

    const content = screen.getByText(testContent);
    expect(content).toBeInTheDocument();

    const container = content.closest('main');
    expect(container).toHaveStyle({
      width: '100%',
      maxWidth: '1440px',
      margin: '64px auto',
    });
  });
});
