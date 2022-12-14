import fetch from 'node-fetch';

export const getUpcomingMovies = (page) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
       return response.json();
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

export const getDiscoverMovies = (page) => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
       return response.json();
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getNowPlayingMovies = (page) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
       return response.json();
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getPopularMovies = async (page) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
       return response.json();
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getTvShows = async (page) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
    ).then((response) => {
      if (!response.ok) {
       return response.json();
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getTvShow = (id) => {
   return fetch(
     `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
   ).then((response) => {
     if (!response.ok) {
      return response.json();
     }
     return response.json();
   })
   .catch((error) => {
     throw error
  });
 };

 export const getTvCreditsTMDB = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
     return response.json();
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};