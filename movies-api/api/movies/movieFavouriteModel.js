import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieFavouriteSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String },
  favourites: [{
    movieId: { type: String },
  }],
  
});

MovieFavouriteSchema.statics.findFavouriteByMovieId = function (id) {
  return this.findOne({ id: id });
};

MovieFavouriteSchema.statics.findFavouriteByUsername = function (username) {
  return this.findOne({ username: username });
};

export default mongoose.model('MovieFavourites', MovieFavouriteSchema);


