const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  movieShows: {
    type: Array,
    required: true,
  },
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = { Movie };