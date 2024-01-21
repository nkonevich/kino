const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScreenRoomSeatShema = Schema({
  number: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: "Standard",
  },
});

const ScreenRoomSeat = mongoose.model('ScreenRoomSeat', ScreenRoomSeatShema);
module.exports = { ScreenRoomSeat };