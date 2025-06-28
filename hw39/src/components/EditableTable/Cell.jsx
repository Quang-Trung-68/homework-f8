import {useContext, useRef} from "react";
import {TableContext} from "./const.js";

export default function Cell ({row, column, rowIndex, columnIndex}) {
  const injector = useContext(TableContext)

  const {cursor, setCursor, setIsEditing, isEditing} = injector

  const cellRef = useRef(null)
  const cell = row[column.name]

  const updateCursor = () => {
    if (cellRef.current) {
      // Sử dụng getBoundingClientRect để tính toán chính xác
      const cellRect = cellRef.current.getBoundingClientRect();
      const tableContainer = cellRef.current.closest('div'); // div chứa table
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
    // Nếu click vào ô đã được chọn, bắt đầu edit
    if (cursor.rowIndex === rowIndex && cursor.columnIndex === columnIndex) {
      setIsEditing(true);
    } else {
      // Nếu đang edit ô khác, thoát edit mode trước
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