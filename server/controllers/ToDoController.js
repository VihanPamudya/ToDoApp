const ToDoModel = require("../models/Todo")

module.exports.getToDos = async (req, res) => {
    const todos = await ToDoModel.find();
    res.send(todos);
}

module.exports.saveToDo = async (req, res) => {
    const {text} = req.body

    ToDoModel
    .create({text})
    .then(() => res.set(201).send("Added Successfully"))
    .catch((err) => console.log(err))
}

module.exports.deleteToDo = async (req, res) => {
    const {_id} = req.body

    ToDoModel
    .findByIdAndDelete(_id)
    .then(() => res.set(201).send("Deleted Successfully"))
    .catch((err) => console.log(err))
}

module.exports.updateToDo = async (req, res) => {
    const {_id, text} = req.body;
    
    ToDoModel
    .findByIdAndUpdate(_id, {text})
    .then(() => res.set(201).send("Updated Successfully"))
    .catch((err) => console.log(err));
}

module.exports.completeToDo = async (req, res) => {
    const {_id} = req.body

    const todo = await ToDoModel.findById(_id)
    todo.complete = !todo.complete;
    todo.save();
}