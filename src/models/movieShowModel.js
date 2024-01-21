const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieShowSchema = Schema({
  movieId: {
    type: Schema.Types.ObjectId, ref: 'Movie'
  },
  screenRoomId: {
    type: Schema.Types.ObjectId, ref: 'ScreenRoom'
  },
  time: {
    type: Date,
    required: true,
  },
  orders: [{
    type: Schema.Types.ObjectId, ref: 'Order'
  }],
  seats: [{
    type: Schema.Types.ObjectId, ref: 'Seat'
  }],
});

const MovieShow = mongoose.model('MovieShow', MovieShowSchema);
module.exports = { MovieShow };
