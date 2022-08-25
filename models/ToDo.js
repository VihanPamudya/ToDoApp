import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("ToDo",ToDoSchema)