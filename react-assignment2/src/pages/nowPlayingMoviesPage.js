import React, {useState,useEffect} from "react";
import PageTemplate from '../components/templateMovieListPage'

import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlaylistAddIcon from '../components/cardIcons/addToPlaylist'
import { getNowPlayingMovies } from "../api/movie-api";

const NowPlayingMoviesPage = (props) => {
  const [page,setPage] = useState(1)
  const [movieResults,setMovieResults] = useState([])
  const [moviePageResult,setMoviePageResult] = useState([])
  
  const  {  data, error, isLoading, isError,refetch }  = useQuery("now_playing", () => getNowPlayingMovies(page).then(result => {
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
    
  const movies = movieResults;
  const total_pages = moviePageResult;


  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))


  
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