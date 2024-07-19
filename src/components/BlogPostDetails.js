import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, IconButton, Container, Typography, Menu, MenuItem, Grid } from '@mui/material';
import { Share, ThumbUp } from '@mui/icons-material';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';

const BlogPostDetails = ({ posts }) => {
  const { id } = useParams();
  const post = posts[id];

  const [anchorEl, setAnchorEl] = useState(null);
  const [liked, setLiked] = useState(false); 

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  const handleLikeClick = () => {
    setLiked(!liked); 
  };

  if (!post) return <Typography variant="h6">Post not found</Typography>;

  const shareUrl = window.location.href;
  const title = post.title;

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>{post.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>{new Date(post.publishedAt).toLocaleDateString()}</Typography>
      {post.urlToImage && <img src={post.urlToImage} alt={post.title} style={{ width: '100%', marginBottom: '20px' }} />}
      <Typography variant="body1" paragraph>{post.content}</Typography>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
        <IconButton color={liked ? "primary" : "#fff"} onClick={handleLikeClick}>
          <ThumbUp />
        </IconButton>
        <Button
          onClick={handleShareClick}
          startIcon={<Share />}
        >
          Share
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleShareClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Grid container spacing={1} style={{ padding: '10px' }}>
            <Grid item xs={4}>
              <MenuItem onClick={handleShareClose}>
                <FacebookShareButton url={shareUrl} quote={title}>
                  <FacebookIcon size={18} round />
                </FacebookShareButton>
              </MenuItem>
            </Grid>
            <Grid item xs={4}>
              <MenuItem onClick={handleShareClose}>
                <TwitterShareButton url={shareUrl} title={title}>
                  <TwitterIcon size={18} round />
                </TwitterShareButton>
              </MenuItem>
            </Grid>
            <Grid item xs={4}>
              <MenuItem onClick={handleShareClose}>
                <WhatsappShareButton url={shareUrl} title={title}>
                  <WhatsappIcon size={18} round />
                </WhatsappShareButton>
              </MenuItem>
            </Grid>
          </Grid>
        </Menu>
      </div>

      <Link to="/" style={{ display: 'block', marginTop: '20px' }}>
        <Button variant="contained" color="primary">
          Back to list
        </Button>
      </Link>
    </Container>
  );
};

export default BlogPostDetails;
