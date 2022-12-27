import {getTvShows,getTvShow,getTvCreditsTMDB } from '../tmdb-api';
import express from 'express';
//import { movies, movieReviews, movieDetails } from './moviesData';
import creditsModel from './tvCreditsModel';
import asyncHandler from 'express-async-handler';



const router = express.Router(); 

router.get('/tmdb/tvShows/:page', asyncHandler( async(req, res) => {
    
    const tvShows = await getTvShows(req.params.page);
    if(tvShows){
    if(JSON.stringify(tvShows).includes("results")){
    res.status(200).json(tvShows);
    }else{
      res.status(404).json('Tv Shows not found for page: '+req.params.page);
    }
  }else{
    res.status(404).json('Tv Show page request failed');
  }
  }));

  router.get('/tmdb/tvShow/:id', asyncHandler( async(req, res) => {
    
    const tvShow = await getTvShow(req.params.id);
    if(tvShow){
      if(JSON.stringify(tvShow).includes("episode_run_time")){
      res.status(200).json(tvShow);
      }else{
        res.status(404).json('Tv Show not found for id: '+req.params.id);
      }
    }else{
      res.status(404).json('Tv Show request failed');
    }
    
  }));

  router.get('/tmdb/tvShow/credits/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const credit = await creditsModel.findByMovieDBId(id);
    if (credit) {
        res.status(200).json(credit);
    } 
    if(!credit) {
        console.log("Credits from local database could not be found, sending request towards TMDB...")
        const credit2 = await getTvCreditsTMDB(req.params.id);
        if(credit2){
          if(JSON.stringify(credit2).includes("cast")){
            console.log("TMDB credits acquired.")
            res.status(200).json(credit2);
          }else{
            res.status(404).json('No Credits were found for id: '+req.params.id);
          }
         
        }else{
          res.status(404).json('Credits request failed');
        }
    }
}));

  export default router;