import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateTvShowPage";
import TvShowReview from "../components/tvShowReview";

const MovieReviewPage = (props) => {
  let location = useLocation();
  const {tvShow, review} = location.state;

  return (
    <PageTemplate tvShow={tvShow}>
      <TvShowReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;