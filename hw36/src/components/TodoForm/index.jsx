import { useRef } from "react";
import { LoadingButton } from "../LoadingComponents";

function TodoForm({
  onCreate,
  onMount,
  isEdit,
  formTodo,
  setFormTodo,
  onEdit,
  curTodo,
  isCreating = false,
  isEditing = false
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

  const isLoading = isCreating || isEditing;

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
        disabled={isLoading}
        onChange={(e) => {
          console.log(formTodo);
          setFormTodo(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !isLoading) {
            if (!isEdit) {
              handleCreate(formTodo);
            } else {
              handleEdit(curTodo);
            }
            setFormTodo("");
          }
        }}
      />
      
      <LoadingButton
        type="button"
        className="add-btn"
        id="add-todo-btn"
        isLoading={isLoading}
        onClick={() => {
          if (!isEdit) {
            handleCreate(formTodo);
          } else {
            handleEdit(curTodo);
          }
          setFormTodo("");
        }}
      >
        {isEdit ? "Save Task" : "Add Task"}
      </LoadingButton>
    </div>
  );
}

export default TodoForm;