const express = require("express")
const mongoose = require("mongoose")
const MONGOURI = require("./config/dev")
const config = require("./config")

const app = express();

// Conection to mongodb
mongoose.connect(config.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log("mongoose connected");
})

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Routes
app.use(require("./routes/index"))
app.use(require("./routes/todo"))

// Server Configuration
app.listen(3000, () => console.log("Server runing on port: 3000"));
