import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostItem from './BlogPostItem';
import { Container, Typography, Button, Grid, TextField, FormControl, FormControlLabel, Checkbox, List, ListItem } from '@mui/material';

const BlogPostList = ({ setPosts }) => {
  const [posts, setPostsState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    latest: false,
    popular: false,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = {
          q: searchTerm || 'technology',
          apiKey: "de43cd3305de4e4ebd98c18f02f11f0c",
          page: currentPage,
          pageSize: 20,
        };
  
        if (filterOptions.latest) {
          params.sortBy = 'publishedAt';
        }
  
        if (filterOptions.popular) {
          params.sortBy = 'popularity';
        }
  
        const response = await axios.get('https://newsapi.org/v2/everything', { params });
        setPostsState(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / 20));
      } catch (error) {
        console.error('Error fetching the news data:', error);
      }
    };
  
    fetchPosts();
  }, [currentPage, searchTerm, filterOptions]);
  
  useEffect(() => {
    setPosts(posts);
  }, [posts, setPosts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOptions({
      ...filterOptions,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Blog Posts
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <List style={{ position: 'sticky', top: 50 }}>
            <ListItem>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: '10px' }}
              />
            </ListItem>
            <Typography variant="h6" gutterBottom>
                Filters
              </Typography>

            <ListItem>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterOptions.latest}
                      onChange={handleFilterChange}
                      name="latest"
                    />
                  }
                  label="Latest"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterOptions.popular}
                      onChange={handleFilterChange}
                      name="popular"
                    />
                  }
                  label="Popular"
                />
              </FormControl>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={9}>
        <ListItem>

          <div style={{ maxHeight: '600px', overflow: 'auto', scrollbarWidth: 'none' }}>
          
            <List style={{ overflow: 'visible', padding: '0 15px', margin: 0 }}>
              {posts.map((post, index) => (
                <ListItem key={index}>
                  <BlogPostItem post={post} index={index} />
                </ListItem>
              ))}
            </List>
          </div>
          </ListItem>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {currentPage > 1 && (
              <Button variant="contained" sx={{marginRight: "10px" }} color="primary" onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </Button>
            )}
            {currentPage < totalPages && (
              <Button variant="contained" color="primary" onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </Button>
            )}
          </div>
        </Grid>

      </Grid>
      
    </Container>
  );
};

export default BlogPostList;
