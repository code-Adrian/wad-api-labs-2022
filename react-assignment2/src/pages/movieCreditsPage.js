import React, { useEffect, useState }  from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateCreditsPage";
import { getMovieCredits } from "../api/tmdb-api";


const MovieCreditsPage = (props) => {
  let location = useLocation();
  const {movie} = location.state;

  const [creditsCrew, setCreditsCrew] = useState([]);
  const [creditsCast, setCreditsCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movie.id).then((credits) => {
      setCreditsCrew(credits.crew);
      setCreditsCast(credits.cast);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate movieId={movie.id} title={movie.title} creditsCrew={creditsCrew} creditsCast={creditsCast}>
      
    </PageTemplate>
  );
};

export default MovieCreditsPage;