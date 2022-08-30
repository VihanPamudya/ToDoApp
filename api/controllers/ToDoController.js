const ToDoModel = require("../models/Todo")

module.exports.getToDos = async (req, res) => {
    const todos = await ToDoModel.find();
    res.send(todos);
}