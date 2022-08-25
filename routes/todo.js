const router = require("express").Router();
const Todo = require("../models/ToDo");

router.post("/add/todo", (req, res) => {
  const { todo } = req.body;
  const newTodo = new Todo({ todo });

  // save to the database
  newTodo
    .save()
    .then(() => {
      console.log("Successfully added todo!");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    })

    .get("delete/todo/:_id",(req,res)=>{
const {_id} = req.params;
    })
});

module.exports = router;
