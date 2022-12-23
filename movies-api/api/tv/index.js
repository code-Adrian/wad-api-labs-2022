import {getTvShows,getTvShow,getTvCreditsTMDB } from '../tmdb-api';
import express from 'express';
//import { movies, movieReviews, movieDetails } from './moviesData';
import uniqid from 'uniqid'
import creditsModel from './tvCreditsModel';
import asyncHandler from 'express-async-handler';
import { Body } from 'node-fetch';

const router = express.Router(); 

router.get('/tmdb/tvShows/:page', asyncHandler( async(req, res) => {
    
    const tvShows = await getTvShows(req.params.page);
    res.status(200).json(tvShows);
  }));

  router.get('/tmdb/tvShow/:id', asyncHandler( async(req, res) => {
    
    const tvShow = await getTvShow(req.params.id);
    res.status(200).json(tvShow);
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
          console.log("TMDB credits acquired.")
          res.status(200).json(credit2);
        }else{
          res.status(404).json('Credits request failed');
        }
    }
}));

  export default router;