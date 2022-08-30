const {Router} = require("express")

const router = Router();

const{getToDos} = require("../controllers/ToDoController")

router.get("/todos",getToDos);