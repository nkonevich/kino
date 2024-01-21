const mongoose = require("mongoose");
const { Schema } = mongoose;

const screenRoomMovieShowMapShema = Schema({
  screenRoom: {
    type: Schema.Types.ObjectId, ref: 'ScreenRoom'
  },
  movieShow: {
    type: Schema.Types.ObjectId, ref: 'MovieShow'
  },
});

const ScreenRoomMovieShowMap = mongoose.model('ScreenRoomMovieShowMap', ScreenRoomMovieShowMapShema);
module.exports = { ScreenRoomMovieShowMap };
