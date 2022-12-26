import React, {useState,useEffect,useContext} from "react";
import PageTemplate from '../components/templateMovieListPage'
import { MoviesContext } from "../contexts/moviesContext";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { getUpcomingMovies } from "../api/movie-api";

const UpcomingMoviesPage = (props) => {
  const load = useContext(MoviesContext);
  const [page,setPage] = useState(1)
  const [movieResults,setMovieResults] = useState([])
  const [moviePageResult,setMoviePageResult] = useState([])
  const  { error, isLoading, isError,refetch }  = useQuery("upcoming", () => getUpcomingMovies(page).then(result => {
    setMovieResults(result.results)
    setMoviePageResult(result.total_pages)
    load.loadFavourites();
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
      title='Upcoming Movies'
      movies={movies}
      setPage={setPage}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;