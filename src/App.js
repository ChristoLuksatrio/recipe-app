import React, { useEffect, useState } from 'react';
import './App.css';
import RecipeList from './components/RecipeList'
import { Grid } from '@material-ui/core';
import { Navbar, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const axios = require('axios');


const APP_ID = process.env.REACT_APP_APP_ID;
const APP_KEY = process.env.REACT_APP_API_KEY;



function App() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  const GetRecipes = async () => {
    axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`)
    .then(function (response) {
      console.log(response.data.hits)
      setRecipes(response.data.hits)
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
  useEffect(() => {
    console.log('app has been mounted')
    GetRecipes();
  }, [query])

  const updateSearch = e => {
    setSearch(e.target.value)
    console.log(search)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  return (
    <Grid container>
      <Navbar bg="light" fixed="top">
        <Navbar.Brand href="#home">Recipe Finder</Navbar.Brand>
        <Form inline onSubmit={getSearch}>
          <input type='text' value={search} onChange={updateSearch} />
          <button type='submit'>Search</button>
        </Form>
      </Navbar>
      <Grid item xs={12}>
        <RecipeList recipes={recipes} />
      </Grid>
    </Grid>
  );
}

export default App;
