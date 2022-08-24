import { Express } from "express";
import mongoose from "mongoose";

const app = Express();

// Conection to mongodb
mongoose.connect("mongodb://localhost/toDoApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static("public"));
app.set("view engine", "ejs");

//Routes

// Server Configuration
app.listen(3000, () => console.log("Server runing on port: 3000"));
