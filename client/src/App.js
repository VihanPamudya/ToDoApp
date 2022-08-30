import { useState, useEffect } from "react";
import axios from "axios";
import {
  faCircleXmark,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_BASE = "http://localhost:3000";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [isUpdating, setUpdating] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then((res) =>
      res.json()
    );
    setTodos((todos) => {
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      });
    });
    window.location.reload();
  };

  // const addTodo = async () => {
  //   const data = await fetch(API_BASE + "/todo/new", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       text: newTodo,
  //     }),
  //   }).then((res) => res.json());

  //   setTodos([...todos, data]);

  //   setPopupActive(false);
  //   setNewTodo("");
  // };

  const addUpdateTodo = () => {

    if (isUpdating === "") {
      axios.post("http://localhost:3000/todo/new", { text })
        .then((res) => {
          setText("");
        })
        .catch((err) => console.log(err));
    }else{
      axios.post("http://localhost:3000/todo/update", { _id: isUpdating, text })
        .then((res) => {
          setText("");
          setUpdating("");
        })
        .catch((err) => console.log(err));
    }
  }

  const updateTodo = (_id, text) => {
    setUpdating(_id);
    setText(text);
  }


  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setTodos((todos) => {
      todos.filter((todo) => todo._id !== data._id);
    });
    window.location.reload();
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
            onClick={() => completeTodo(todo._id)}
          >
            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>
            <div className="edit-todo" onClick={() =>{updateTodo(todo._id, todo.text); setPopupActive(true)} }>
              <FontAwesomeIcon
                className="edit"
                icon={faPenToSquare}
              />
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
            <div className="button" onClick={addUpdateTodo}>
              Create Task
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
