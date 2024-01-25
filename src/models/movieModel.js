const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    data: {
      type:Buffer
    },
    contentType: {
      type:String
    },
  },
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = { Movie };