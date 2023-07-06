import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders the div which containes the title and the author of the blog', () => {
  const blog = {
    id: 'n8asgn',
    title: 'test title',
    author: 'test author',
    url: 'test.com',
    likes: 0,
  };

  const afterUpdate = jest.fn();

  const { container } = render(<Blog blog={blog} afterUpdate={afterUpdate} />);

  const div = container.querySelector('.summary-div');

  expect(div).toBeDefined();
});

test('does not render the div which containes the URL and the likes of the blog', () => {
  const blog = {
    id: 'n8asgn',
    title: 'test title',
    author: 'test author',
    url: 'test.com',
    likes: 0,
  };

  const afterUpdate = jest.fn();

  const { container } = render(<Blog blog={blog} afterUpdate={afterUpdate} />);

  const div = container.querySelector('.hidden-div');

  expect(div).toHaveStyle('display: none');
});

test('renders hidden div when view button pressed', async () => {
  const blog = {
    id: 'n8asgn',
    title: 'test title',
    author: 'test author',
    url: 'test.com',
    likes: 0,
  };

  const afterUpdate = jest.fn();

  const { container } = render(<Blog blog={blog} afterUpdate={afterUpdate} />);

  const user = userEvent.setup();

  const button = screen.getByText('view');
  await user.click(button);

  const div = container.querySelector('.hidden-div');

  expect(div).not.toHaveStyle('display: none');
});
