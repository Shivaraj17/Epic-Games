const mongoose = require("mongoose");

const Slider = mongoose.Schema({
    id:String,
    logo_img:String,
    img_logo:String,
    game_name:String,
    link_game_name:String,
    game_price:String,
    game_discount:String,
})

module.exports = mongoose.model('slider',Slider)