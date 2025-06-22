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
  onChecked,
  loadingActions = {}
}) {
  const isDeleting = loadingActions.deleting?.[todoId] || false;
  const isToggling = loadingActions.toggling?.[todoId] || false;

  const handleDelete = async (todoId, todoTitle) => {
    console.log(todoId);
    await onDelete(todoId, todoTitle);
    await onMount();
  };

  const handleEdit = async (todoId, todoTitle, completed) => {
    console.log(todoId, todoTitle);
    setFormTodo(todoTitle);
    setCurTodo({ id: todoId, title: todoTitle, completed: completed });
    setIsEdit(true);
  };

  const toChecked = async (todoId, checked) => {
    console.log(todoId, checked);
    await onChecked(todoId, todoTitle, checked);
    await onMount();
  };

  return (
    <div className={`todo-item ${isDeleting ? 'item-deleting' : ''}`}>
      <input 
        type="checkbox" 
        checked={completed}
        disabled={isToggling || isDeleting}
        onChange={(e) => {
          toChecked(todoId, e.target.checked);
        }} 
      />
      
      <div className={`todo-content ${completed ? "completed" : ""}`}>
        {text}
        {isToggling && (
          <span className="inline-loading"> ⟳</span>
        )}
      </div>
      
      <button
        type="button"
        className={`edit-btn fa-solid fa-pen-to-square ${isDeleting ? 'disabled' : ''}`}
        disabled={isDeleting || isToggling}
        onClick={() => {
          handleEdit(todoId, todoTitle, completed);
        }}
      />
      
      <button
        type="button"
        className={`del-btn fa-solid fa-trash ${isDeleting ? 'button-loading' : ''}`}
        disabled={isDeleting || isToggling}
        onClick={() => handleDelete(todoId, todoTitle)}
      >
        {isDeleting ? '' : ''}
      </button>
    </div>
  );
}

export default TodoItem;