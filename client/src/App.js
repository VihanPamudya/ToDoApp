import { useState, useEffect } from "react";
import axios from "axios";
import {
  faCircleXmark,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [isUpdating, setUpdating] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    axios
      .get("http://localhost:3000/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  const completeTodo = async (_id) => {
    axios
      .post("http://localhost:3000/complete-todo", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const addUpdateTodo = () => {
    if (isUpdating === "") {
      axios
        .post("http://localhost:3000/save-todo", { text })
        .then((res) => {
          setText("");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3000/update-todo", { _id: isUpdating, text })
        .then((res) => {
          setText("");
          setUpdating("");
        })
        .catch((err) => console.log(err));
    }
  };

  const updateTodo = (_id, text) => {
    setUpdating(_id);
    setText(text);
  };

  const deleteTodo = (_id) => {
    axios
      .post("http://localhost:3000/delete-todo", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>Welcome to, ToDo</h1>
      <h4>Your Tasks</h4>

      <div className="todos">
        {todos.map((todo) => (
          <div
            className={"todo " + (todo.complete ? "is-complete" : "")}
            key={todo._id}
          >
            <div
              className="checkbox"
              onClick={() => completeTodo(todo._id)}
            ></div>
            <div className="text">{todo.text}</div>
            <div
              className="edit-todo"
              onClick={() => {
                updateTodo(todo._id, todo.text);
                setPopupActive(true);
              }}
            >
              <FontAwesomeIcon className="edit" icon={faPenToSquare} />
            </div>
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              <FontAwesomeIcon className="delete" icon={faTrashCan} />
            </div>
          </div>
        ))}
      </div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div
            className="closePopup"
            onClick={() => {
              setPopupActive(false);
              setText("");
            }}
          >
            <FontAwesomeIcon className="close" icon={faCircleXmark} />
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <div className="button" onClick={() => {addUpdateTodo(); setPopupActive(false)}}>
              {isUpdating ? "Update Task" : "Create Task"}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
