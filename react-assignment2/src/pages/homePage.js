import React, {useState,useEffect,useContext} from "react";
import { MoviesContext } from "../contexts/moviesContext";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { getDiscoverMovies } from "../api/movie-api";

const HomePage = (props) => {
  const load = useContext(MoviesContext);
  const [page,setPage] = useState(1)
  const [movieResults,setMovieResults] = useState([])
  const [moviePageResult,setMoviePageResult] = useState([])
 


    const  {  error, isLoading, isError,refetch }  = useQuery("discover", () => getDiscoverMovies(page).then(result => {
      setMovieResults(result.results)
      setMoviePageResult(result.page)
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
 const current_page = moviePageResult;



  // const favorites = movies.filter(m => m.favorite)
  // localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    
    <PageTemplate title="Discover Movies" movies={movies} current_page = {current_page} pages={500} setPage={setPage} action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />}}
        
        />  
        
);

};
export default HomePage;