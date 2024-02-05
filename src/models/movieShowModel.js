const mongoose = require("mongoose");
const { Schema } = mongoose;

const SeatsAvailabilityShema = Schema({ 
  seatRow: {
    type: String
  },
  seatNumber: {
    type: Number
  },
  seatType: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  }
})

const SeatsPricingShema = Schema({ 
  seatType: {
    type: String
  },
  price: {
    type: Number
  }
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
  seatsAvailability: [SeatsAvailabilityShema],
  seatsPricing: [SeatsPricingShema]
});

MovieShowSchema.methods.updatePrice = function(seatType, price) {
  
  MovieShow.findOneAndUpdate(
    { "_id": folderId, "permissions._id": permission._id },
    { 
        "$set": {
            "permissions.$": permission
        }
    },
    function(err,doc) {

    }
  );

  console.log( seatType );
  console.log( price );

  return   console.log(this.id);
  // this.seatsAvailability.updateMany(
  //   {movie: "65b1aefd8d274134e970869b"}, 
  //   {time: "2014-09-25T11:58:36.117+00:00"}
  //   // {seatsPricing: [ {type: "Standard"} ]}, 
  //   // {seatsPricing: [ {price: 555} ]}
  // ).exec(callback)

  // this.save(cb)
};


MovieShowSchema.methods.setAvailability = async function(seatId, available) {

  await MovieShow.findOneAndUpdate(
    { "_id": this.id, "seatsAvailability._id": seatId },
    { 
        "$set": {
            "seatsAvailability.$.available": available
        }
    }
  );

};

const MovieShow = mongoose.model('MovieShow', MovieShowSchema);
module.exports = { MovieShow };
