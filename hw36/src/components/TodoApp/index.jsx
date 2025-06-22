import { useEffect, useState } from "react";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";
import "./TodoApp.css";
import { getTodos, postTodos, putTodos, deleteTodos } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [formTodo, setFormTodo] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [curTodo, setCurTodo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateInput = (title) => {
    if (typeof title !== "string" || title.trim() === "") {
      return { valid: false, message: "Todo title should not be empty!." };
    }
    return { valid: true, message: "" };
  };

  const onCreate = async (title) => {
    if (validateInput(title).valid) {
      try {
        setIsLoading(true);
        const responsePost = await postTodos("", {
          title: `${title.trim()}`,
          completed: false,
        });
        toast.success(`Added todo ${title} successfully!`);
        return responsePost;
      } catch (error) {
        console.log(error);
        toast.error(`Failed to create todo: ${title} `);
      }
    } else {
      toast.error(`${validateInput(title).message}`);
    }
  };

  const onEdit = async (id, newTitle) => {
    if (validateInput(newTitle).valid) {
      try {
        setIsLoading(true);
        const responsePut = await putTodos(id, {
          id: id,
          title: newTitle,
          completed: curTodo.completed,
        });
        setCurTodo({});
        setIsEdit(false);
        console.log(responsePut);
        toast.success(`Edited todo ${newTitle} successfully!`);
      } catch (error) {
        console.log(error);
        toast.error(`Failed to edit todo: ${newTitle} `);
      }
    } else {
      toast.error(`${validateInput(newTitle).message}`);
    }
  };

  const onChecked = async (id, title, checked) => {
    try {
      setIsLoading(true);
      const responsePut = await putTodos(id, {
        id: id,
        title: title,
        completed: checked,
      });
      toast.success(`Toggle checked status todo ${title} successfully!`);
      console.log(responsePut);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to toggle check todo: ${title} `);
    }
  };

  const onDelete = async (id, title) => {
    try {
      setIsLoading(true);
      const responseDel = await deleteTodos(id);
      toast.warn(`Deleted todo ${title} successfully!`);
      console.log(responseDel);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to delete todo`);
    }
  };

  const onMount = async () => {
    try {
      const response = await getTodos("");
      setTodos(response);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to get todos`);
    }
  };
  useEffect(() => {
    onMount();
  }, []);

  return (
    <div className="container">
      <h1>Get Things Done!</h1>

      {!isLoading ? (
        <form className="todo-form">
          <TodoForm
            onCreate={onCreate}
            onMount={onMount}
            isEdit={isEdit}
            formTodo={formTodo}
            setFormTodo={setFormTodo}
            onEdit={onEdit}
            curTodo={curTodo}
          />
          <TodoList
            todos={todos}
            onDelete={onDelete}
            onMount={onMount}
            setIsEdit={setIsEdit}
            setFormTodo={setFormTodo}
            setCurTodo={setCurTodo}
            onChecked={onChecked}
            isEdit={isEdit}
          />
        </form>
      ) : (
        <form
          className="todo-form"
          style={{ opacity: 0.5, pointerEvents: "none" }}
        >
          <TodoForm
            onCreate={onCreate}
            onMount={onMount}
            isEdit={isEdit}
            formTodo={formTodo}
            setFormTodo={setFormTodo}
            onEdit={onEdit}
            curTodo={curTodo}
          />
          <TodoList
            todos={todos}
            onDelete={onDelete}
            onMount={onMount}
            setIsEdit={setIsEdit}
            setFormTodo={setFormTodo}
            setCurTodo={setCurTodo}
            onChecked={onChecked}
            isEdit={isEdit}
          />
        </form>
      )}
      <ToastContainer />
    </div>
  );
}

export default TodoApp;
