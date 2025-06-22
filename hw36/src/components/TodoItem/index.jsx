function TodoItem({
  text,
  completed,
  onDelete,
  todoId,
  onMount,
  setIsEdit,
  todoTitle,
  setFormTodo,
  setCurTodo,
  onChecked
}) {
  const handleDelete = async (todoId, todoTitle) => {
    console.log(todoId);
    await onDelete(todoId,todoTitle);
    await onMount();
  };

  const handleEdit = async (todoId, todoTitle, completed) => {
    console.log(todoId, todoTitle);
    setFormTodo(todoTitle);
    setCurTodo({ id: todoId, title: todoTitle, completed: completed });
    setIsEdit(true);
  };

  const toChecked = async (todoId, checked)=>{
    console.log(todoId, checked);
    await onChecked(todoId,todoTitle, checked)
    await onMount()
  }

  return (
    <div className="todo-item">
      <input type="checkbox" defaultChecked={completed} onChange={(e)=>{
        toChecked(todoId,e.target.checked )
      }} />
      <div className={`todo-content ${completed ? "completed" : ""}`}>
        {text}
      </div>
      <button
        type="button"
        className="edit-btn fa-solid fa-pen-to-square"
        onClick={() => {
          handleEdit(todoId, todoTitle, completed);
        }}
      ></button>
      <button
        type="button"
        className="del-btn fa-solid fa-trash"
        onClick={() => handleDelete(todoId,todoTitle)}
      ></button>
    </div>
  );
}

export default TodoItem;
