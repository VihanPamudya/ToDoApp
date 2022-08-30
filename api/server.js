const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const Todo = require("./models/Todo");
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());


mongoose
  .connect(
    process.env.DB_URL,
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


// app.get("/todo/complete/:id",async(req,res)=>{
//     const todo = await Todo.findById(req.params.id)
//     todo.complete = !todo.complete

//     todo.save()
//     res.json(todo)
// })

const routes = require("./routes/ToDoRoute")
app.use(routes)

app.listen(3000, ()=>{
    console.log("Server started on port : 3000")
})
