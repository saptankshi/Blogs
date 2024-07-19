import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; 

test('renders BlogPostList component at the root path', () => {
  render(<App />);

  console.log(screen.debug());

  const headingElement = screen.queryByText(/Blog Posts/i); 
  expect(headingElement).toBeInTheDocument();
});
