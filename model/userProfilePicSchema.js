const mongoose = require("mongoose");
const userImgSchema = new mongoose.Schema({
    name: String,
    path: String,
    filename: String
});
module.exports = mongoose.model('img', userImgSchema)