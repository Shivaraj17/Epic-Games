// carousal.js
const mongoose = require("mongoose");

const CarouselSchema = new mongoose.Schema({
    id: String,
    logo_img: String,
    game_name: String,
    link_game_name: String,
    game_price: String,
    pre_img: [
        {
            ID: String,
            links: String,
        },
    ],
});

module.exports = mongoose.model('carousel', CarouselSchema);
