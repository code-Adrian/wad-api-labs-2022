import express from 'express';
import { movies, movieReviews, movieDetails } from './moviesData';
import uniqid from 'uniqid'
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import { getUpcomingMovies,getDiscoverMovies, getPopularMovies,getNowPlayingMovies,getTvShows } from '../tmdb-api';

const router = express.Router(); 

router.get('/', asyncHandler(async (req, res) => {
    const movies = await movieModel.find();
    res.status(200).json(movies);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie reviews
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (movieReviews.id == id) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

//Post a movie review
router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);

    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

router.get('/tmdb/upcoming/:page', asyncHandler( async(req, res) => {
    
    const upcomingMovies = await getUpcomingMovies(req.params.page);
    res.status(200).json(upcomingMovies);
  }));

  router.get('/tmdb/discover/:page', asyncHandler( async(req, res) => {
    const discoverMovies = await getDiscoverMovies(req.params.page);
    res.status(200).json(discoverMovies);
  }));

  router.get('/tmdb/popular/:page', asyncHandler( async(req, res) => {
    
    const popularMovies = await getPopularMovies(req.params.page);
    res.status(200).json(popularMovies);
  }));

  router.get('/tmdb/now_playing/:page', asyncHandler( async(req, res) => {
    
    const nowPlayingMovies = await getNowPlayingMovies(req.params.page);
    res.status(200).json(nowPlayingMovies);
  }));

  router.get('/tmdb/tvShows/:page', asyncHandler( async(req, res) => {
    
    const tvShows = await getTvShows(req.params.page);
    res.status(200).json(tvShows);
  }));


export default router;