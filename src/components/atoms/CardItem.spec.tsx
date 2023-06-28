import { render, screen } from '@testing-library/react';
import { CardItem } from './CardItem';

describe('CardItem', () => {
  const childText = 'Test Content';

  test('renders CardItem with children content', () => {
    render(
      <CardItem>
        <p>{childText}</p>
      </CardItem>
    );

    const cardItem = screen.getByText(childText);
    expect(cardItem).toBeInTheDocument();
  });
});
