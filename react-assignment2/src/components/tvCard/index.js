import React, { useContext  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistTagIcon from "@mui/icons-material/PlaylistAddCheck";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { TvContext } from "../../contexts/tvContext";



export default function TvCard({tvShow, action}) {
  const { favorites } = useContext(TvContext);

  if (favorites.find((id) => id === tvShow.id)) {
    tvShow.favorite = true;
  } else {
    tvShow.favorite = false
  }

  // if (playlists.find((id) => id === tvShow.id)) {
  //   tvShow.playlist = true;
  // } else {
  //   tvShow.playlist = false
  // }



  return (
    
    <Card sx={{ maxWidth: 345, backgroundImage: "url('https://wallpaperboat.com/wp-content/uploads/2019/10/high-resolution-black-background-06.jpg')" }} >
            <CardHeader
        avatar={
          tvShow.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : tvShow.playlist ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <PlaylistTagIcon />
            </Avatar>
          ) : null
        }
        
        title={
          <Typography sx={{color: 'white'}} variant="h6" component="p">
            {tvShow.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          tvShow.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
            : img
        }
      />
      <CardContent sx={{color: 'white'}}>
        <Grid container>
          <Grid item xs={7}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {" "}{tvShow.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {tvShow.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(tvShow)}
        <Link to={`/tvShow/${tvShow.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}