import React, { useEffect, useState }  from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateTvCreditsPage";
import { getTvShowCredits } from "../api/movie-api";

const TvCreditsPage = (props) => {
  let location = useLocation();
  const {tvShow} = location.state;

  const [creditsCrew, setCreditsCrew] = useState([]);
  const [creditsCast, setCreditsCast] = useState([]);

  useEffect(() => {
    getTvShowCredits(tvShow.id).then(result => {
      setCreditsCrew(result.crew);
      setCreditsCast(result.cast);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate tvId={tvShow.id} title={tvShow.name} creditsCrew={creditsCrew} creditsCast={creditsCast}>
      
    </PageTemplate>
  );
};

export default TvCreditsPage;