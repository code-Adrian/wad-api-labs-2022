import express from 'express';
import movieModel from './movieModel';
import movieReviewModel from './movieReviewModel';
import movieFavouriteModel from './movieFavouriteModel';
import asyncHandler from 'express-async-handler';
import { getUpcomingMovies,getDiscoverMovies, getPopularMovies,getNowPlayingMovies } from '../tmdb-api';

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

//Post a review
router.post('/:id/reviews', asyncHandler(async (req, res) => {
    if (!req.body.id || !req.body.results) {
        res.status(401).json({success: false, msg: 'Please provide review body.'});
        return next();
      }
      const random = Math.floor(Math.random() * 10000000);
        const id = parseInt(req.params.id);

           const found = await movieReviewModel.findReviewByMovieId(id);
           
           if(found){
            
            var resultObj = {id: random, author: req.body.results.author, content: req.body.results.content, rating: req.body.results.rating}
            await movieReviewModel.findOneAndUpdate({id: id},{$push: {results: resultObj}});
            console.log("Found movie and pushed review.");
    
            res.status(201).json("Found movie and pushed review.");
           }else{
            req.body.results.id = random;
            movieReviewModel.create(req.body);
            console.log("Created movie review and pushed review.");
            res.status(201).json("Created movie review and pushed review.");
           }
    }));

//Get Review
    router.get('/:id/reviews', asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const found = await movieReviewModel.findReviewByMovieId(id);
        if (found) {
            res.status(200).json(found);
        } else {
            res.status(404).json({
                message: 'The resource you requested could not be found.',
                status_code: 404
            });
        }
    }));

    router.post('/:user/favourites', asyncHandler(async (req, res) => {
      
      if (!req.body.username || !req.body.favourites) {
          res.status(401).json({success: false, msg: 'Please provide request body.'});
          return next();
        }
          const random = Math.floor(Math.random() * 10000000);
          const user = req.body.username;
          req.body.id = random;
          const found = await movieFavouriteModel.findFavouriteByUsername(user);
             
             if(found){
              await movieFavouriteModel.collection.findOneAndUpdate({username: user},{$set: req.body},{upsert: true});
              
              console.log("Found user and updated favourites.")
              res.status(201).json({success: false, msg:"Found user and updated favourites."});
             }else{
              movieFavouriteModel.create(req.body);
              console.log("Created user favourite collection and pushed favourite movie.");
              res.status(201).json({success: false, msg:"Created user favourite collection and pushed favourite movie."});
             }
      }));

      router.get('/:user/favourites', asyncHandler(async (req, res) => {
        const user= req.params.user
        const found = await movieFavouriteModel.findFavouriteByUsername(user);
        if (found) {
            res.status(200).json(found);
        } else {
            res.status(404).json({
                message: 'The resource you requested could not be found.',
                status_code: 404
            });
        }
    }));

router.get('/tmdb/upcoming/:page', asyncHandler( async(req, res) => {
    const upcomingMovies = await getUpcomingMovies(req.params.page);
    if(upcomingMovies){
        if(JSON.stringify(upcomingMovies).includes("results")){
        res.status(200).json(upcomingMovies);
        }else{
          res.status(404).json({success: false, msg:'Upcoming movie page not found for page: '+req.params.page});
        }
      }else{
        res.status(404).json({success: false, msg:'Upcoming movie page request failed'});
      }
  }));

  router.get('/tmdb/discover/:page', asyncHandler( async(req, res) => {
    const discoverMovies = await getDiscoverMovies(req.params.page);
    if(discoverMovies){
        if(JSON.stringify(discoverMovies).includes("results")){
        res.status(200).json(discoverMovies);
        }else{
          res.status(404).json({success: false, msg:'discover movie page not found for page: '+req.params.page});
        }
      }else{
        res.status(404).json({success: false, msg:'discover movie page request failed'});
      }
  }));

  router.get('/tmdb/popular/:page', asyncHandler( async(req, res) => {
    const popularMovies = await getPopularMovies(req.params.page);
    if(popularMovies){
        if(JSON.stringify(popularMovies).includes("results")){
        res.status(200).json(popularMovies);
        }else{
          res.status(404).json({success: false, msg:'popular movie page not found for page: '+req.params.page});
        }
      }else{
        res.status(404).json({success: false, msg:'popular movie page request failed'});
      }
  }));

  router.get('/tmdb/now_playing/:page', asyncHandler( async(req, res) => {
    const nowPlayingMovies = await getNowPlayingMovies(req.params.page);
    if(nowPlayingMovies){
        if(JSON.stringify(nowPlayingMovies).includes("results")){
        res.status(200).json(nowPlayingMovies);
        }else{
          res.status(404).json({success: false, msg:'Now playing movie page not found for page: '+req.params.page});
        }
      }else{
        res.status(404).json({success: false, msg:'Now playing movie page request failed'});
      }
  }));



export default router;