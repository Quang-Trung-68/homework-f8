import { useContext, useState, useEffect, useRef } from "react";
import { TableContext } from "./const";

export default function CellInput() {
  const injector = useContext(TableContext);
  const { cursor,setCursor, rows, columns, isEditing, setIsEditing, updateCell } = injector;
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // Lấy giá trị hiện tại của ô khi bắt đầu edit
  useEffect(() => {
    if (isEditing && cursor.rowIndex !== undefined && cursor.columnIndex !== undefined) {
      const currentRow = rows[cursor.rowIndex];
      const currentColumn = columns[cursor.columnIndex];
      const cellValue = currentRow[currentColumn.name];
      setInputValue(cellValue || "");
      
      // Focus vào input và select all text
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 0);
    }
  }, [isEditing, cursor.rowIndex, cursor.columnIndex, rows, columns]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Lưu giá trị và thoát edit mode
      saveValue();
    } else if (e.key === "Escape") {
      // Hủy edit và thoát edit mode
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    // Lưu giá trị khi click ra ngoài
    saveValue();
  };

  const saveValue = () => {
    if (cursor.rowIndex !== undefined && cursor.columnIndex !== undefined) {
      const currentColumn = columns[cursor.columnIndex];
      updateCell(cursor.rowIndex, currentColumn.name, inputValue);
    }
    setIsEditing(false);
  };

  const onClick = (e) => {
    // Ngăn không cho click event bubble up
    e.stopPropagation();
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: cursor.top,
        left: cursor.left,
        width: cursor.width,
        height: cursor.height,
        zIndex: 1000,
        pointerEvents: isEditing ? 'auto' : 'none',
      }}
      onClick={onClick}
    >
      {isEditing && (
        <input
          ref={inputRef}
          style={{
            width: "100%",
            height: "100%",
            border: "2px solid blue",
            outline: "none",
            padding: "2px",
            fontSize: "inherit",
            fontFamily: "inherit",
            backgroundColor: "white",
            boxSizing: "border-box",
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      )}
    </div>
  );
}