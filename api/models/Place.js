const mongoose = require('mongoose');
const {Schema} = mongoose;

const placeSchema = new mongoose.Schema({
    owner: {type:mongoose.SchemaTypes.ObjectId, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number,
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;