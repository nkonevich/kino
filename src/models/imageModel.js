const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageShema = Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
const Image = mongoose.model('Image', ImageShema);
module.exports = { Image };

// TODO: see https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
