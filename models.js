const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    name: String,
    city: String,
    image: String,
    rating: Number,
    description: String,
    images: [String],
    numberOfDoctors: Number,
    numberOfDepartments: Number,
});

module.exports = mongoose.model("Hospital", hospitalSchema);
