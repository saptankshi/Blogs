import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const BlogPostItem = ({ post, index }) => {
  return (
    <Card variant="outlined" style={{ width: '100%' }}>
      <Link to={`/post/${index}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(post.publishedAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            {post.description}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default BlogPostItem;
