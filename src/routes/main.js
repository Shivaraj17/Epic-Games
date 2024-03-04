const express = require("express");
const routes = express.Router();
//schema models of mongo db
const Carousel = require("../models/carousal");
const Slider =require("../models/slider")
const Register = require("../models/Register");

//used for hashing the password
const bcrypt = require('bcryptjs');

// first this router

// routes.get("/", (req, res) => {
//     res.render("index");
// });


//after making Mongo DB collections use this router

routes.get("/", async (req, res) => {
    try {
        // Fetch the data from MongoDB
        const carousel = await Carousel.find();
        const slider = await Slider.find();

        // Render the index template with data
        res.render("index", {
            carousel: carousel,        //Mongo Db collections to use in index
            slider:slider
        });
    } catch (err) {
        // Log the error details for debugging
        console.error(err);

        // Handle errors, send a 500 Internal Server Error response with the error message
        res.status(500).json({ error: "Internal server Error" });
    }
});

routes.get("/games", async (req, res) => {
    try {
        // Fetch the data from MongoDB
        const carousel = await Carousel.find();
        const slider = await Slider.findOne();

        // Render the index template with data
        res.render("games", {
            carousel: carousel,        //Mongo Db collections to use in index
            slider:slider
        });
    } catch (err) {
        // Log the error details for debugging
        console.error(err);

        // Handle errors, send a 500 Internal Server Error response with the error message
        res.status(500).json({ error: "Internal server Error" });
    }
});


routes.get("/games/:game_name", async (req, res) => {
    const gameName = req.params.game_name;
    try {
        // Fetch the data from MongoDB based on the game_name
        const slider = await Slider.findOne({
            link_game_name: gameName,
        });
        
        const carousel = await Carousel.findOne({
            link_game_name: gameName,
        });


        // Render the "games" template with the retrieved data
        res.render("games", {
            carousel: carousel, 
            slider: slider,
        });
    } catch (err) {
        // Log the error details for debugging
        console.error(err);

        // Handle errors, send a 500 Internal Server Error response with the error message
        res.status(500).json({ error: "Internal server Error" });
    }
});

//login page
routes.get("/login",async (req,res)=>{
    try{
        res.render("login")
    }catch(err){
        console.log(err)

        res.status(500).json({error: "Internal Server Error"})
    }
})

//register page
routes.get("/register",async (req,res)=>{
    try{
        res.render("Register")
    }catch(err){
        console.log(err)

        res.status(500).json({error: "Internal Server Error"})
    }
})

// register form submit
routes.post('/form_register', async (req, res) => {
    // console.log(req.body);
    console.log("form submitted");
    try {
        // const data=await Register.create(req.body)
        const data = new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            country:req.body.country
        }) 
        const register = await data.save();
        // console.log(data);
        res.redirect("/login")

    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})

// login form check
routes.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password,userEmail.password)

        // if(userEmail.password === checkPass){
        if(isMatch){
        res.status(201).redirect("/")
        }else{
            // res.send("invalid login detail")
            res.redirect("/login")
        }

    } catch (e) {
        console.log(e);
        res.redirect("/login")
        // res.status(400).send("invalid login detail");
    }
})

routes.post("/", async (req, res) => {
    // Create a new Carousel instance with the data from the request body
    const carousel = new Carousel({
        id: req.body.id,
        logo_img: req.body.logo_img,
        game_name: req.body.game_name,
        link_game_name: req.body.link_game_name,
        game_price: req.body.game_price,
        pre_img: req.body.pre_img,
    });

    try {
        // Save the carousel instance to the MongoDB database
        const savedCarousel = await carousel.save();

        // Send the saved carousel as a response (if needed)
        res.send(savedCarousel);

        // Log the saved carousel to the console
        console.log(savedCarousel);
    } catch (err) {
        // Handle errors, send a 500 Internal Server Error response with the error message
        console.error(err.stack);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST request for Slider
routes.post("/games", async (req, res) => {
    const slider = new Slider({
        id: req.body.id,
        logo_img: req.body.logo_img,
        img_logo: req.body.img_logo,
        game_name: req.body.game_name,
        link_game_name: req.body.link_game_name,
        game_price: req.body.game_price,
        game_discount: req.body.game_discount,
        pre_img: req.body.pre_img,
    });

    try {
        const savedSlider = await slider.save();
        res.send(savedSlider);
        console.log(savedSlider);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = routes;