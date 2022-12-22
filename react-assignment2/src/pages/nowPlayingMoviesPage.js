import React, {useState,useEffect} from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getNowPlayingMoviesPage } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlaylistAddIcon from '../components/cardIcons/addToPlaylist'


const NowPlayingMoviesPage = (props) => {
  const [page,setPage] = useState(1)
  const {  data, error, isLoading, isError,refetch }  = useQuery("now_playing", () => getNowPlayingMoviesPage(page),{enabled: true }) 


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
    
  const movies = data.results;
  
  //gets the total number of available pages for the query
  const total_pages = data.total_pages // -- For pagination
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  //const addToFavorites = (movieId) => true 

  
  return (
    <PageTemplate
      pages={total_pages} //For Pagination
      title='Playing in Cinemas'
      movies={movies}
      setPage={setPage}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
  );
};
export default NowPlayingMoviesPage;