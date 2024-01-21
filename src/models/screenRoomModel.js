const mongoose = require("mongoose");
const { Schema } = mongoose;

const Seat = Schema({
  number: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: "Standard",
  },
});

const SeatsRow = Schema({
  seats: [Seat],
});

const ScreenRoomSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  seatRows: [SeatsRow]
});

const ScreenRoom = mongoose.model('ScreenRoom', ScreenRoomSchema);
module.exports = { ScreenRoom };
