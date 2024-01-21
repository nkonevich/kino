const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order };