import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetails from './components/BlogPostDetails';
import './styles.css';

const App = () => {
  const [posts, setPosts] = useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<BlogPostList setPosts={setPosts} />}
          />
          <Route
            path="/post/:id"
            element={<BlogPostDetails posts={posts} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
