import React, {useState,useEffect} from "react";
import { getMoviesPage } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'


const HomePage = (props) => {
  const [page,setPage] = useState(1)

  const  {  data, error, isLoading, isError,refetch }  = useQuery("discover", () => getMoviesPage(page),{enabled: true }) 


  useEffect(() => { 
    refetch();
    // eslint-disable-next-line
   }, [page]);

 
  if (isLoading) {
    return <Spinner />
  }

  
  if (isError) {
    return <h1>{error.message}</h1>
  } 

 //Gets the result for the first page 
 const movies = data.results;
 //gets the total number of available pages for the query -- MAX is 500
 //const total_pages = data.total_pages // -- For pagination
 //gets the current page
 const current_page = data.page
  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  //const addToFavorites = (movieId) => true 


  return (
    
    <PageTemplate title="Discover Movies" movies={movies} current_page = {current_page} pages={500} setPage={setPage} action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />}}
        
        />  
        
);

};
export default HomePage;