const mongoose = require("mongoose");
const { Schema } = mongoose;

const Seat = Schema({ 
  row: {
    type: String
  },
  number: {
    type: Number
  },
  type: {
    type: String
  },
  seatsAvailabilityId: {
    type: String
  }
})

const OrderSchema = Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  movieShow: {
    type: Schema.Types.ObjectId, ref: 'MovieShow'
  },
  seat: Seat,
  price: {
    type: Number,
    default: 0
  }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order };