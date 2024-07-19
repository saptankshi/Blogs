import React from 'react';  
import { render, screen, waitFor } from '@testing-library/react';
import BlogPostDetails from './components/BlogPostDetails';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

const mockPosts = {
  '1': {
    title: 'Test Post',
    publishedAt: '2023-01-01T00:00:00Z',
    content: 'Test content',
    urlToImage: 'https://via.placeholder.com/150'
  }
};

test('renders post details correctly', async () => {

  render(
    <Router initialEntries={['/post/1']}>
      <Routes>
        <Route path="/post/:id" element={<BlogPostDetails posts={mockPosts} />} />
      </Routes>
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('1/1/2023')).toBeInTheDocument(); 
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
