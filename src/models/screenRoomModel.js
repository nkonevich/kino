const mongoose = require("mongoose");

const ScreenRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  seats: {
    type: Array,
    required: true,
  },
  movieShows: {
    type: Array,
    required: true,
  },
});

const ScreenRoom = mongoose.model('ScreenRoom', ScreenRoomSchema);
module.exports = { ScreenRoom };
