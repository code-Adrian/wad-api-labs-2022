export const login = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const deleteUser = (username) => {
    return fetch('/api/users?action=delaccount', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username })
    }).then(res => res.json())
};

export const getMovies = () => {
    return fetch(
       '/api/movies', {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    ).then(res => {
        return res.json();
    }).catch((error) => {
        console.log(error);
    });
  };

  export const getUpcomingMovies = (page) => {
    return fetch(
        `/api/movies/tmdb/upcoming/${page}`, {
             headers: {
                 'Authorization': window.localStorage.getItem('token')
             }
         }
     ).then(res => {
       
         return res.json();
     }).catch((error) => {
         console.log(error);
     });
  };

  export const getDiscoverMovies = (page) => {
    return fetch(
        `/api/movies/tmdb/discover/${page}`, {
             headers: {
                 'Authorization': window.localStorage.getItem('token')
             }
         }
     ).then(res => {
       
         return res.json();
     }).catch((error) => {
         console.log(error);
     });
  };


  export const getPopularMovies = (page) => {
    return fetch(
        `/api/movies/tmdb/popular/${page}`, {
             headers: {
                 'Authorization': window.localStorage.getItem('token')
             }
         }
     ).then(res => {
       
         return res.json();
     }).catch((error) => {
         console.log(error);
     });
  };

  export const getNowPlayingMovies = (page) => {
    return fetch(
        `/api/movies/tmdb/now_playing/${page}`, {
             headers: {
                 'Authorization': window.localStorage.getItem('token')
             }
         }
     ).then(res => {
       
         return res.json();
     }).catch((error) => {
         console.log(error);
     });
  };

  export const getTvShows = (page) => {
    return fetch(
        `/api/tv/tmdb/tvShows/${page}`, {
             headers: {
                 'Authorization': window.localStorage.getItem('token')
             }
         }
     ).then(res => {
       
         return res.json();
     }).catch((error) => {
         console.log(error);
     });
  };

  export const getTvShow = (page) => {
    return fetch(
        `/api/tv/tmdb/tvShow/${page}`, {
             headers: {
                 'Authorization': window.localStorage.getItem('token')
             }
         }
     ).then(res => {
       
         return res.json();
     }).catch((error) => {
         console.log(error);
     });
  };

  export const getTvShowCredits = (id) => {
    return fetch(
        `/api/tv/tmdb/tvShow/credits/${id}`, {
             headers: {
                 'Authorization': window.localStorage.getItem('token')
             }
         }
     ).then(res => {
       
         return res.json();
     }).catch((error) => {
         console.log(error);
     });
  };