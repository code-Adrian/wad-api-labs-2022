import React from "react";

const TvShowReview =  ({ review }) => {
  return (
    <>
      <p style={{color: 'rgba(255,255,255,0.7)'}}>Review By: {review.author} </p>
      <p style={{color: 'rgba(255,255,255,0.7)',fontSize: '1.5em'}}>{review.content} </p>
    </>
  );
};
export default TvShowReview