import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HeadingWithPopover } from './HeadingWithPopover';
import { mockCourse } from '../../mock-data';

describe('HeadingWithPopover', () => {
  const courseVideoPreview = mockCourse.meta.courseVideoPreview;
  const title = 'Test Title';

  test('renders the HeadingWithPopover component with the provided title', () => {
    render(<HeadingWithPopover title={title} />);

    const headingElement = screen.getByRole('heading', { level: 2 });

    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(title);
  });

  test('renders the VideoPreview popover when courseVideoPreview is provided', () => {
    render(<HeadingWithPopover title={title} courseVideoPreview={courseVideoPreview} />);
    const headingElement = screen.getByRole('heading', { level: 2 });

    fireEvent.mouseEnter(headingElement);

    const popover = screen.getByRole('presentation');
    expect(popover).toBeInTheDocument();
  });

  test('does not render the VideoPreview popover when courseVideoPreview is not provided', () => {
    render(<HeadingWithPopover title={title} />);
    const headingElement = screen.getByRole('heading', { level: 2 });

    fireEvent.mouseEnter(headingElement);

    const popover = screen.queryByRole('presentation');
    expect(popover).not.toBeInTheDocument();
  });

  test('closes the VideoPreview popover when mouse leaves the heading', () => {
    render(<HeadingWithPopover title={title} courseVideoPreview={courseVideoPreview} />);
    const headingElement = screen.getByRole('heading', { level: 2 });

    fireEvent.mouseEnter(headingElement);
    expect(headingElement).toHaveAttribute('aria-haspopup');

    fireEvent.mouseLeave(headingElement);
    waitFor(() => expect(headingElement).toHaveAttribute('aria-haspopup'));
  });
});
