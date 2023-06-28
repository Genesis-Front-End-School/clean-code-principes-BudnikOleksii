import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading', () => {
  const title = 'Test Title';

  test('renders the Heading component with the provided title and a divider with the provided title too', () => {
    render(<Heading title={title} />);

    const headingElement = screen.getByRole('heading', { level: 1 });
    const dividerElement = screen.getAllByText(title);

    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(title);
    expect(dividerElement.length).toBe(2);
  });
});
