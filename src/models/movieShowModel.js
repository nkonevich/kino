const mongoose = require("mongoose");

const MovieShowSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  ScreenRoomId: {
    type: String,
    required: true,
  },
  date: {
    type: Array,
    required: true,
  },
  time: {
    type: Array,
    required: true,
  },
});

const MovieShow = mongoose.model('MovieShow', MovieShowSchema);
module.exports = { MovieShow };
