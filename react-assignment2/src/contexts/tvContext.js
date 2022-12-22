import React, { useState } from "react";

export const TvContext = React.createContext(null);

const TvContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  console.log('Favourite array: '+favorites)

  const addToFavoritesTvShow = (tvShow) => {
    let newFavorites = [];
    if (!favorites.includes(tvShow.id)){
      newFavorites = [...favorites, tvShow.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  // const addToPlaylist = (tvShow) => {
  //   let newPlaylists = [];
  //   if (!playlists.includes(tvShow.id)){
  //     newPlaylists = [...playlists, tvShow.id];
  //   }
  //   else{
  //     newPlaylists = [...playlists];
  //   }
  //   setPlaylists(newPlaylists)
  // };

  const addReview = (tvShow, review) => {
    setMyReviews( {...myReviews, [tvShow.id]: review } )
  };

  // const removeFromFavorites = (tvShow) => {
  //   setFavorites( favorites.filter(
  //     (mId) => mId !== tvShow.id
  //   ) )
  // };

  return (
    <TvContext.Provider
      value={{
        favorites,
        addToFavoritesTvShow,
     //   removeFromFavorites,
        addReview,
      }}
    >
      {props.children}
    </TvContext.Provider>
  );
};

export default TvContextProvider;