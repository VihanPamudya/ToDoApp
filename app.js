const express = require("express")
const mongoose = require("mongoose")

const app = express();

// Conection to mongodb
mongoose.connect("mongodb://localhost/toDoApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Routes
app.use(require("./routes/index"))
app.use(require("./routes/todo"))

// Server Configuration
app.listen(3000, () => console.log("Server runing on port: 3000"));
