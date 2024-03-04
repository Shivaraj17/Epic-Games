const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const mainRoutes = require("./routes/main");
const mongoose = require("./db/conn");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Middleware to parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public static path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// View engine setup
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

// Register helpers
hbs.registerHelper("eq", function (a, b) {
  return a === b;
});

// Middleware for serving static files
app.use(express.static(static_path));

// Use your routes
app.use("/", mainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
