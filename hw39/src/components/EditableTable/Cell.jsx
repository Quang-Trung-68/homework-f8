import {useContext, useRef} from "react";
import {TableContext} from "./const.js";

export default function Cell ({row, column, rowIndex, columnIndex}) {
  const injector = useContext(TableContext)

  const {cursor, setCursor, setIsEditing, isEditing} = injector

  const cellRef = useRef(null)
  const cell = row[column.name]

  const updateCursor = () => {
    if (cellRef.current) {
      // Use getBoundingClientRect to calculate
      const cellRect = cellRef.current.getBoundingClientRect();
      // div include table
      const tableContainer = cellRef.current.closest('div'); 
      const containerRect = tableContainer.getBoundingClientRect();
      
      const width = cellRef.current.offsetWidth;
      const height = cellRef.current.offsetHeight;
      const left = cellRect.left - containerRect.left;
      const top = cellRect.top - containerRect.top;

      setCursor({
        width, height, top, left, rowIndex, columnIndex
      })
    }
  }

  const onClick = () => {
    updateCursor();
    // if clicking to cell that is selected, start editing
    if (cursor.rowIndex === rowIndex && cursor.columnIndex === columnIndex) {
      setIsEditing(true);
    } else {
      // if click to another cell, exiting editing
      if (isEditing) {
        setIsEditing(false);
      }
    }
  }

  const onDoubleClick = () => {
    updateCursor();
    setIsEditing(true);
  }

  return (
    <td
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      ref={cellRef}
      style={{
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {cell}
    </td>
  )
}