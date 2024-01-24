const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageShema = Schema({
    name: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
module.exports = mongoose.model('Image', ImageShema);

// TODO: see https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
