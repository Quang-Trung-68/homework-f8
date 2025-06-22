// Spinner Component
export const Spinner = ({ size = 40, color = "#8758ff" }) => (
  <div 
    className="spinner" 
    style={{ 
      width: size, 
      height: size,
      borderTopColor: color 
    }}
  />
);

// Loading Overlay Component
export const LoadingOverlay = ({ message = "Loading..." }) => (
  <div className="loading-overlay">
    <Spinner />
    <div className="loading-text">{message}</div>
  </div>
);

// Skeleton Todo Item Component
export const SkeletonTodoItem = () => (
  <div className="skeleton-todo-item">
    <div className="skeleton-checkbox" />
    <div className="skeleton-text" />
    <div className="skeleton-buttons">
      <div className="skeleton-button" />
      <div className="skeleton-button" />
    </div>
  </div>
);

// Skeleton Todo List Component
export const SkeletonTodoList = ({ count = 3 }) => (
  <div className="todo-list">
    {Array.from({ length: count }, (_, index) => (
      <SkeletonTodoItem key={index} />
    ))}
  </div>
);

// Button Loading Component
export const LoadingButton = ({ 
  children, 
  isLoading, 
  onClick, 
  className = "", 
  disabled = false,
  ...props 
}) => (
  <button
    className={`${className} ${isLoading ? 'button-loading' : ''}`}
    onClick={onClick}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading ? '' : children}
  </button>
);