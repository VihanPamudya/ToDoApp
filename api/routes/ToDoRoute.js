const {Router} = require("express")

const router = Router();

const{getToDos, saveToDo, deleteToDo, updateToDo, completeToDo} = require("../controllers/ToDoController")

router.get("/todos", getToDos);
router.post("/save-todo", saveToDo)
router.post("/delete-todo", deleteToDo)
router.post("/update-todo", updateToDo)
router.post("/complete-todo", completeToDo)

module.exports = router