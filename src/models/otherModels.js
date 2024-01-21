const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: {
    type: Array,
    required: false,
  },
});

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  movieShows: {
    type: Array,
    required: true,
  },
});

// const ScreenRoomSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   seats: {
//     type: Array,
//     required: true,
//   },
//   movieShows: {
//     type: Array,
//     required: true,
//   },
// });

// const MovieShowSchema = new mongoose.Schema({
//   movieId: {
//     type: String,
//     required: true,
//   },
//   ScreenRoomId: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Array,
//     required: true,
//   },
//   time: {
//     type: Array,
//     required: true,
//   },
// });

// const OrderSchema = new mongoose.Schema({
//   number: {
//     type: Number,
//     required: true,
//   },
//   userId: {
//     type: Number,
//     required: true,
//   },
//   userEmail: {
//     type: String,
//     required: true,
//   },
//   movieId: {
//     type: Number,
//     required: true,
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   time: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: String,
//     required: true,
//   },
// });

const User = mongoose.model('User', UserSchema);
const Movie = mongoose.model('Movie', MovieSchema);
// const ScreenRoom = mongoose.model('ScreenRoom', ScreenRoomSchema);
// const MovieShow = mongoose.model('MovieShow', MovieShowSchema);
// const Order = mongoose.model('Order', OrderSchema);

module.exports = { User };
module.exports = { Movie };
// module.exports = { ScreenRoom };
// module.exports = { MovieShow };
// module.exports = { Order };