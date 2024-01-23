const mongoose = require("mongoose");
const { Schema } = mongoose;

const SeatShema = Schema({
  number: {
    type: Number,
    required: true,
  },
  row: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "Standard",
  },
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
  seats: [SeatShema]
});

const ScreenRoom = mongoose.model('ScreenRoom', ScreenRoomSchema);
module.exports = { ScreenRoom };

// const Seat = mongoose.model('Seat', SeatShema);
// module.exports = { ScreenRoom, Seat };
