import React from 'react'
import Header from '../Components/Header'
import BookList from '../Components/BookList'
import BookFilter from '../Components/BookFilter'

import { useNavigate } from 'react-router-dom'

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const navigate = useNavigate()

  return (
    <Stack gap={3}>
      <Header />   
      <BookFilter />
      <Button variant="outline-danger" onClick={(e) => navigate(`/addbook`)}>Add Book</Button>
      <BookList />
    </Stack>
  );
};

export default Home
