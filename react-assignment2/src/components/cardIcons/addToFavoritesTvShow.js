import React, { useContext } from "react";
import { TvContext } from "../../contexts/tvContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesTvShowIcon = ({ tvShow }) => {
  const context = useContext(TvContext);

  const handleAddToFavoritesTvShow = (e) => {
    e.preventDefault();
    context.addToFavoritesTvShow(tvShow);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavoritesTvShow}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesTvShowIcon;