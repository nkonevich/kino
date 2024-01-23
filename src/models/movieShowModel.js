const mongoose = require("mongoose");
const { Schema } = mongoose;

const SeatsAvailabilityShema = Schema({ 
  seatRow: {
    type: String
  },
  seatNumber: {
    type: Number
  },
  available: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0
  }
  // },
  // _id: false 
})

const MovieShowSchema = Schema({
  movie: {
    type: Schema.Types.ObjectId, ref: 'Movie'
  },
  screenRoom: {
    type: Schema.Types.ObjectId, ref: 'ScreenRoom'
  },
  time: {
    type: Date,
    required: true,
  },
  seatsAvailability: [SeatsAvailabilityShema]
});

const MovieShow = mongoose.model('MovieShow', MovieShowSchema);
module.exports = { MovieShow };
