import React, { useState, useRef } from "react";

function TodoForm({ onCreate, onMount, isEdit, formTodo,  setFormTodo }) {
  
  const inputRef = useRef(null);

  const handleCreate = async (todo) => {
    const response = await onCreate(todo);
    await onMount();
    console.log(response);
  };

  const handleEdit = async (id) => {
    console.log(id);
  };

  return (
    <div className="add-todo">
      <input
        name="todo"
        type="text"
        className="todo-input"
        placeholder="What is the task today?"
        required
        value={formTodo}
        ref={inputRef}
        onChange={(e) => {
          console.log(formTodo);
          setFormTodo(e.target.value);
        }}
      />
      <button
        type="button"
        className="add-btn"
        id="add-todo-btn"
        onClick={() => {
          !isEdit ? handleCreate(formTodo) : handleEdit();
          setFormTodo("");
          inputRef.current.focus();
        }}
      >
        {isEdit ? "Save task" : "Add Task"}
      </button>
    </div>
  );
}

export default TodoForm;
