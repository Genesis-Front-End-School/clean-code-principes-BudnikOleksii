import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from './ErrorPage';

const renderErrorPage = () => {
  const props = {
    errorNumber: 404,
    text: 'Page not found',
    image: 'https://example.com/error-image.jpg',
    children: <button>Go back</button>,
  };

  return render(<ErrorPage {...props} />);
};

describe('ErrorPage', () => {
  test('renders the error number, text, image, and children', () => {
    renderErrorPage();

    const errorNumber = screen.getByText('404');
    const errorText = screen.getByText('Page not found');
    const errorImage = screen.getByAltText('404 error');
    const goBackButton = screen.getByRole('button', { name: 'Go back' });

    expect(errorNumber).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
    expect(errorImage).toBeInTheDocument();
    expect(errorImage).toHaveAttribute('src', 'https://example.com/error-image.jpg');
    expect(goBackButton).toBeInTheDocument();
  });
});
