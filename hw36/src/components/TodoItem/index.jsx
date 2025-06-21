import React from "react";

function TodoItem({
  text,
  completed,
  onDelete,
  todoId,
  onMount,
  setIsEdit,
  todoTitle,
  setFormTodo,
}) {
  const handleDelete = async (todoId) => {
    console.log(todoId);
    await onDelete(todoId);
    await onMount();
  };

  const handleEdit = async (todoId, todoTitle) => {
    console.log(todoId, todoTitle);
    setFormTodo(todoTitle);
    setIsEdit(true);
  };

  return (
    <div className="todo-item">
      <input type="checkbox" defaultChecked={completed} />
      <div className={`todo-content ${completed ? "completed" : ""}`}>
        {text}
      </div>
      <button
        type="button"
        className="edit-btn fa-solid fa-pen-to-square"
        onClick={() => {
          handleEdit(todoId, todoTitle);
        }}
      ></button>
      <button
        type="button"
        className="del-btn fa-solid fa-trash"
        onClick={() => handleDelete(todoId)}
      ></button>
    </div>
  );
}

export default TodoItem;
