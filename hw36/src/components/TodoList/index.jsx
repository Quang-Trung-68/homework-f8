import TodoItem from "../TodoItem";

function TodoList({
  todos,
  onDelete,
  onMount,
  setIsEdit,
  setFormTodo,
  setCurTodo,
  onChecked,
  isEdit,
}) {
  console.log(todos);
  return (
    <>
      {isEdit ? (
        <div
          className="todo-list"
          style={{ opacity: 0.5, pointerEvents: "none" }}
        >
          {/* <TodoItem text="Example Task" completed />
      <TodoItem text="Second Task" /> */}
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              text={todo.title}
              completed={todo.completed}
              onDelete={onDelete}
              todoId={todo.id}
              onMount={onMount}
              setIsEdit={setIsEdit}
              todoTitle={todo.title}
              setFormTodo={setFormTodo}
              setCurTodo={setCurTodo}
              onChecked={onChecked}
              isEdit = {isEdit}
            />
          ))}
        </div>
      ) : (
        <div className="todo-list">
          {/* <TodoItem text="Example Task" completed />
      <TodoItem text="Second Task" /> */}
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              text={todo.title}
              completed={todo.completed}
              onDelete={onDelete}
              todoId={todo.id}
              onMount={onMount}
              setIsEdit={setIsEdit}
              todoTitle={todo.title}
              setFormTodo={setFormTodo}
              setCurTodo={setCurTodo}
              onChecked={onChecked}
              isEdit = {isEdit}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default TodoList;
