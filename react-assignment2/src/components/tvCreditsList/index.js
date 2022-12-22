import React from "react";
import TvShow from "../tvCreditsCard";
import Grid from "@mui/material/Grid";

const TvCreditsList = ( {credits }) => {
  let movieCards = credits.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TvShow key={m.id} credit={m} />
    </Grid>
  ));
  return movieCards;
};

export default TvCreditsList;