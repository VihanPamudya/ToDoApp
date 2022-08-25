const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");
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

app.get("/todos",async(req,res)=>{
    const todos = await Todo.find();
    res.json(todos); 
})

app.post("/todo/new",async(req,res)=>{
    const todo = new Todo({
        text:req.body.text
    })

    todo.save();
    res.json(todo)
})

app.delete("/todo/delete/:id",async(req,res)=>{
    const id = req.params.id
    const result = await Todo.findByIdAndDelete(id)

    res.json(result)

})

app.put("/todo/complete/:id",async(req,res)=>{
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete

    todo.save()
    res.json(todo)
})

app.put("/todo/update/:id",async(req,res)=>{
  const id = req.params.id
  const todo = await Todo.findByIdAndUpdate(id)
  todo.text = req.body.text
  todo.save()
  res.json(todo)
})

app.listen(3000, ()=>{
    console.log("Server started on port : 3000")
})
