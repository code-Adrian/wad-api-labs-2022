import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const TvCreditsSchema = new Schema({
  cast: [{

        adult: { type: Boolean },
        id: { type: Number, required: true, unique: true },
        known_for_department: { type: String },
        name: { type: String },
        original_name: { type: String },
        popularity: { type: Number },
        profile_path: { type: String },
        character: { type: String },
        credit_id: { type: String },
        order: { type: Number }

    }],
    crew: [{

        adult: { type: Boolean },
        gender: { type: Number },
        id: { type: Number, required: true, unique: true },
        known_for_department: { type: String },
        name: { type: String },
        original_name: { type: String },
        popularity: { type: Number },
        profile_path: { type: String },
        credit_id: { type: String },
        department: { type: String },
        job: { type: String }
    }],
    id: { type: Number, required: true, unique: true }
});

TvCreditsSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('TvCredits', TvCreditsSchema);


