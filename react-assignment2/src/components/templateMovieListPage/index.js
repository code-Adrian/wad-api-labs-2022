import React, { useState,useContext } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import {makeStyles} from "@material-ui/core"
import Fab from "@mui/material/Fab";
import * as auth from "firebase/auth"
import fireapp from "../../firebase";
import { AuthContext } from "../../contexts/authContext"



const useStyles = makeStyles(() => ({
  root: {
    position: "fixed",
    overflow: "hidden",
    bottom: 0,
    zIndex: 200,
    backgroundColor: "rgba(95,90,90,0.9)",
    padding: "5px 0px",
    color: "white",
    width: "100vw",
    marginLeft: "-2vw",
    
  },
  signOut: {
    position: "fixed",
    overflow: "hidden",
    bottom: 0,
    zIndex: 200,
    marginLeft: "-2vw",
    right: "2em"
  },
  deleteAccount: {
    position: "fixed",
    overflow: "hidden",
    bottom: 0,
    zIndex: 200,
    marginLeft: "-2vw",
    left: "2em"
  }
}));


function MovieListPageTemplate({ movies, title, action, pages,setPage,current_page }) {
  const context = useContext(AuthContext);

  //States
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("0");

  const genreId = Number(genreFilter);
 
  
  let displayedMovies = movies.filter((m) => {
    

    
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    }).filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    }).filter((m) => {
      //vote average
         if(ratingFilter === 0){
           return m
         }
         if(ratingFilter === 1){
          
          return m.vote_average >= 8
         }
         if(ratingFilter === 2){
          
          return m.vote_average >= 5 && m.vote_average <= 8
         }
         if(ratingFilter === 3){
          
          return m.vote_average <= 5
         }
        return m;
  })



  const handleChange = (type, value) => {
  //  if(type === "name"){
    if (type === "name") {
    setNameFilter(value);
    }
    if(type === "genre"){
      setGenreFilter(value);
    }
 // }

  if(type === "rating"){
    setRatingFilter(value)
  }
   // console.log(type)
  };


  const handleOnChange = (page) =>{
    setPage(page)
    window.scroll(0,0)
  }

 
  const classes = useStyles();
  return (
  
    <Grid container sx={{ padding: '20px', backgroundColor: "rgba(0,0,0,0.1)" } }>
       
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5} >
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
      <div className={classes.root}>
      
        <Pagination count={pages} defaultPage={1} color="primary" size="large" hideNextButton hidePrevButton variant="outlined" shape="rounded" onChange={(e) => handleOnChange(e.target.textContent)} style={{
          display: "flex",
          justifyContent: "center",
        }} />
        </div>
        <div className={classes.signOut}>
        <Fab color="primary" variant="extended" onClick={() => context.signout()}>Sign Out!</Fab>
        </div>
        <div className={classes.deleteAccount}>
        <Fab color="secondary" variant="extended" onClick={() => auth.deleteUser(fireapp.currentUser)}>Delete Account!</Fab>
        </div>
    </Grid>
    
  );
}
export default MovieListPageTemplate;