import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const MovieReviewSchema = new Schema({

  id: { type: String, required: true, unique: true },

  results: [
    {
        id: { type: Number, required: true, unique: true },
       author:{ type: String },
       content: { type: String },
       rating: { type: String }
       
    }
  
],
});

MovieReviewSchema.statics.findReviewByMovieId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('MovieReviews', MovieReviewSchema);


