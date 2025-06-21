import React, { useEffect, useState } from "react";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";
import "./TodoApp.css";
import { getTodos, postTodos, putTodos, deleteTodos } from "../../utils";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [formTodo, setFormTodo] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const onCreate = async (title) => {
    const responsePost = await postTodos("", {
      title: `${title.trim()}`,
      completed: false,
    });
    return responsePost;
  };

  const onEdit = async (id,title)=>{

  }

  const onDelete = async (id) => {
    const responseDel = await deleteTodos(id);
    console.log(responseDel);
  };

  const onMount = async () => {
    const response = await getTodos("");
    setTodos(response);
    // const responsePost = await postTodos("", {
    //   title: "do hw1",
    //   completed: false,
    // });

    // const responsePut = await putTodos(223, {
    //   title: "do hw11122222ssssssss22",
    //   completed: false,
    // });

    // const responseDel = await deleteTodos(99);

    console.log(response);
  };
  useEffect(() => {
    onMount();
  }, []);

  return (
    <div className="container">
      <h1>Get Things Done!</h1>
      <form className="todo-form">
        <TodoForm onCreate={onCreate} onMount={onMount} isEdit={isEdit} formTodo={formTodo} setFormTodo={setFormTodo} />
        <TodoList todos={todos} onDelete={onDelete} onMount={onMount} setIsEdit={setIsEdit} setFormTodo={setFormTodo} />
      </form>
    </div>
  );
}

export default TodoApp;
