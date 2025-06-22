import { useRef } from "react";
function TodoForm({
  onCreate,
  onMount,
  isEdit,
  formTodo,
  setFormTodo,
  onEdit,
  curTodo,
}) {
  const inputRef = useRef(null);

  const handleCreate = async (todo) => {
    const response = await onCreate(todo);
    await onMount();
    inputRef.current.focus();
    console.log(response);
  };

  const handleEdit = async (curTodo) => {
    const response = await onEdit(curTodo.id, formTodo);
    await onMount();
    inputRef.current.focus();
    console.log(response);
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
          !isEdit ? handleCreate(formTodo) : handleEdit(curTodo);
          setFormTodo("");
        }}
      >
        {isEdit ? "Save Task" : "Add Task"}
      </button>
    </div>
  );
}

export default TodoForm;
