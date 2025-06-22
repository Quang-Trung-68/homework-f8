import { useEffect, useState } from "react";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";
import "./TodoApp.css";
import { getTodos, postTodos, putTodos, deleteTodos } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { LoadingOverlay, SkeletonTodoList } from "../LoadingComponents";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [formTodo, setFormTodo] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [curTodo, setCurTodo] = useState({});
  
  // Separate loading states for better UX
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [loadingActions, setLoadingActions] = useState({
    creating: false,
    editing: false,
    deleting: {},
    toggling: {}
  });

  const validateInput = (title) => {
    if (typeof title !== "string" || title.trim() === "") {
      return { valid: false, message: "Todo title should not be empty!." };
    }
    return { valid: true, message: "" };
  };

  const onCreate = async (title) => {
    if (validateInput(title).valid) {
      try {
        setLoadingActions(prev => ({ ...prev, creating: true }));
        const responsePost = await postTodos("", {
          title: `${title.trim()}`,
          completed: false,
        });
        toast.success(`Added todo ${title} successfully!`);
        return responsePost;
      } catch (error) {
        console.log(error);
        toast.error(`Failed to create todo: ${title} `);
      } finally {
        setLoadingActions(prev => ({ ...prev, creating: false }));
      }
    } else {
      toast.error(`${validateInput(title).message}`);
    }
  };

  const onEdit = async (id, newTitle) => {
    if (validateInput(newTitle).valid) {
      try {
        setLoadingActions(prev => ({ ...prev, editing: true }));
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
      } finally {
        setLoadingActions(prev => ({ ...prev, editing: false }));
      }
    } else {
      toast.error(`${validateInput(newTitle).message}`);
    }
  };

  const onChecked = async (id, title, checked) => {
    try {
      setLoadingActions(prev => ({ 
        ...prev, 
        toggling: { ...prev.toggling, [id]: true }
      }));
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
    } finally {
      setLoadingActions(prev => ({ 
        ...prev, 
        toggling: { ...prev.toggling, [id]: false }
      }));
    }
  };

  const onDelete = async (id, title) => {
    try {
      setLoadingActions(prev => ({ 
        ...prev, 
        deleting: { ...prev.deleting, [id]: true }
      }));
      const responseDel = await deleteTodos(id);
      toast.warn(`Deleted todo ${title} successfully!`);
      console.log(responseDel);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to delete todo`);
    } finally {
      setLoadingActions(prev => ({ 
        ...prev, 
        deleting: { ...prev.deleting, [id]: false }
      }));
    }
  };

  const onMount = async () => {
    try {
      const response = await getTodos("");
      setTodos(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to get todos`);
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    onMount();
  }, []);

  // Check if any action is loading
  const isAnyActionLoading = Object.values(loadingActions).some(loading => 
    typeof loading === 'boolean' ? loading : Object.values(loading).some(Boolean)
  );

  return (
    <div className="container">
      <h1>Get Things Done!</h1>

      {isInitialLoading ? (
        // Show skeleton loading during initial load
        <div className="todo-form">
          <div className="add-todo">
            <div className="skeleton" style={{ 
              width: '300px', 
              height: '34px', 
              marginRight: '8px' 
            }} />
            <div className="skeleton" style={{ 
              width: '80px', 
              height: '34px' 
            }} />
          </div>
          <SkeletonTodoList count={3} />
        </div>
      ) : (
        <div className="todo-form" style={{ position: 'relative' }}>
          <TodoForm
            onCreate={onCreate}
            onMount={onMount}
            isEdit={isEdit}
            formTodo={formTodo}
            setFormTodo={setFormTodo}
            onEdit={onEdit}
            curTodo={curTodo}
            isCreating={loadingActions.creating}
            isEditing={loadingActions.editing}
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
            loadingActions={loadingActions}
          />
          
          {/* Show loading overlay for major actions */}
          {isAnyActionLoading && (
            <LoadingOverlay 
              message={
                loadingActions.creating ? "Creating todo..." :
                loadingActions.editing ? "Updating todo..." :
                "Processing..."
              } 
            />
          )}
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
}

export default TodoApp;