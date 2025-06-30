import { useContext } from "react";
import { TableContext } from "./const";

export default function CellSelection() {
  const injector = useContext(TableContext);
  const { cursor, isEditing } = injector;
  
  if (isEditing) return null;
  
  return (
    <div
      style={{
        position: 'absolute',
        top: cursor.top,
        left: cursor.left,
        width: cursor.width,
        height: cursor.height,
        border: '2px solid blue',
        pointerEvents: 'none',
        zIndex: 999,
        boxSizing: 'border-box'
      }}
    />
  );
}