const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://vihan:Abcd*123@todoapp.frfu6xv.mongodb.net/FirstDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongoose connected!");
  })
  .catch((err) => {
    console.log(err);
  });

require("./models/Todo")

app.get("/todos",async(req,res)=>{
    const todos = await Todo.find();
    res.json(todos); 
})

app.listen(3000, ()=>{
    console.log("Server started on port : 3000")
})
