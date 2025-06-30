import "./style.sass";
import Row from "./Row.jsx";
import { TableContext } from "./const.js";
import CellSelection from "./CellSelection.jsx";
import { useState } from "react";
import CellInput from "./CellInput.jsx";

const defaultCursor = {
  rowIndex: 0,
  columnIndex: 0,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
};

export default function EditableTable({ columns, rows: initialRows }) {
  const [cursor, setCursor] = useState({ ...defaultCursor });
  const [isEditing, setIsEditing] = useState(false);
  const [rows, setRows] = useState(initialRows);

  // Function to update value cell
  const updateCell = (rowIndex, columnName, newValue) => {
    setRows(prevRows => {
      const newRows = [...prevRows];
      newRows[rowIndex] = {
        ...newRows[rowIndex],
        [columnName]: newValue
      };
      return newRows;
    });
  };

  console.log(cursor);

  const provider = {
    columns,
    rows,
    cursor,
    setCursor,
    isEditing,
    setIsEditing,
    updateCell
  };

  return (
    <TableContext.Provider value={provider}>
      <div style={{ position: 'relative' }}>
        <table className={"editable-table"}>
          <thead>
            <tr>
              {columns.map((column) => {
                return <th style={{width: column.width }} key={column.name}>{column.name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              return <Row key={row.id} row={row} rowIndex={rowIndex} />;
            })}
          </tbody>
        </table>
        <CellInput />
        <CellSelection />
      </div>
    </TableContext.Provider>
  );
}