import React from "react";
import TodoItem from "../TodoItem";

function TodoList({ todos, onDelete,onMount, setIsEdit ,setFormTodo}) {
  console.log(todos);
  return (
    <div className="todo-list">
      {/* <TodoItem text="Example Task" completed />
      <TodoItem text="Second Task" /> */}
      {todos.map((todo) => 
         (<TodoItem key={todo.id} text={todo.title} completed = {todo.completed} onDelete={onDelete} todoId = {todo.id} onMount={onMount} setIsEdit={setIsEdit} todoTitle ={todo.title} setFormTodo={setFormTodo} />)
      )}
    </div>
  );
}

export default TodoList;
