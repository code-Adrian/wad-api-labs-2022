import React, { useState,useContext } from "react";
import { addFavourite,getFavourites } from "../api/movie-api";
import { AuthContext } from "./authContext";
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const context = useContext(AuthContext);
  const username = context.userName;

  const [playlists, setPlaylists] = useState( [] );
  const [favorites, setFavorites] = useState( [] );
  const [myReviews, setMyReviews] = useState( {} ) ;

  const loadFavourites = () => {
    getFavourites(username).then(result => {
      var tempArr = []
      for(var i in result.favourites){
        tempArr.push(parseInt(result.favourites[i].movieId))
      }
      setFavorites(tempArr)
      
    });
  }
  
const preLoadFavourites = (user) => {
  getFavourites(user).then(result => {
    var tempArr = []
    for(var i in result.favourites){
      tempArr.push(parseInt(result.favourites[i].movieId))
    }
    setFavorites(tempArr)
    
  });
}

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites]
      newFavorites.push(movie.id);
      
    }
    else{
      
      newFavorites = [...favorites];
      var index = newFavorites.indexOf(movie.id);
      if (index !== -1) {
        newFavorites.splice(index, 1);
      }
    }
    

    var obj = {id: movie.id,username: username, favourites: []}
    for(var i in newFavorites){
      obj.favourites.push( {movieId:newFavorites[i]} )
    }
    addFavourite(obj);
    setFavorites(newFavorites);
  };

  const addToPlaylist = (movie) => {
    let newPlaylists = [];
    if (!playlists.includes(movie.id)){
      newPlaylists = [...playlists, movie.id];
    }
    else{
      newPlaylists = [...playlists];
    }
    setPlaylists(newPlaylists);
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } );
  };

  const removeFromFavorites = (movie) => {
    
    const newFavorites = [...favorites];
    var index = newFavorites.indexOf(movie.id);
    if (index !== -1) {
      newFavorites.splice(index, 1);
    }

    var obj = {id: movie.id,username: username, favourites: []}
    for(var i in newFavorites){
      obj.favourites.push( {movieId:newFavorites[i]} )
    }
   
    addFavourite(obj)
  };

  return (
    <MoviesContext.Provider
      value={{
        playlists,
        favorites,
        loadFavourites,
        addToFavorites,
        addToPlaylist,
        preLoadFavourites,
        removeFromFavorites,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;