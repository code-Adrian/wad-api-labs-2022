import React, {useState,useEffect} from "react";
import PageTemplate from '../components/templateTvListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavoritesTvShow';
import { getTvShows } from "../api/movie-api";

const TvPage = (props) => {
  const [page,setPage] = useState(1)
  const [movieResults,setMovieResults] = useState([])
  const [moviePageResult,setMoviePageResult] = useState([])
  const  {  data, error, isLoading, isError,refetch }  = useQuery("tv", () => getTvShows(page).then(result => {
    setMovieResults(result.results)
    setMoviePageResult(result.total_pages)
    console.log(data)
  }),{enabled: true }) 

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

  const tvShows = movieResults;
  const current_page = moviePageResult;

   
  // Redundant, but necessary to avoid app crashing.
  const favorites = tvShows.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
 // const addToFavorites = (movieId) => true 


  return (
    
    <PageTemplate title="Popular Tv Shows" tvShows={tvShows} current_page = {current_page} pages={500} setPage={setPage} action={(tvShow) => {
        return <AddToFavoritesIcon tvShow={tvShow} />}}
        />  
        
);

};
export default TvPage;