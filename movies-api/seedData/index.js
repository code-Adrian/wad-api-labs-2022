import userModel from '../api/users/userModel';
import genreModel from '../api/genres/genreModel';
import movieModel from '../api/movies/movieModel';
import tvCreditsModel from '../api/tv/tvCreditsModel';

import users from './users';
import genres from './genres';
import tvcredits from './tvCredits';
import dotenv from 'dotenv';

import movies from './movies.js';

dotenv.config();

// deletes all user documents in collection and inserts test data
async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

async function loadGenres() {
  console.log('load genres Data');
  try {
    await genreModel.deleteMany();
    await genreModel.collection.insertMany(genres);
    console.info(`${genres.length} genres were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load genre Data: ${err}`);
  }
}

async function loadCredits() {
  console.log('load tv credits Data');
  try {
    await tvCreditsModel.deleteMany();
    await tvCreditsModel.collection.insertMany(tvcredits);
    console.info(`${tvcredits.length} credits were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load credits Data: ${err}`);
  }
}

if (process.env.SEED_DB) {
 // loadUsers();
  //loadGenres();//you may not need this line if you skipped the exercises
  //loadMovies();//ADD THIS LINE
  loadCredits();
}