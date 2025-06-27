import "./style.sass";
import { useContext } from "react";
import TableContext from "./TableContext.jsx";
import Row from "./Row.jsx";
import CellSelection from "./CellSelection.jsx";

export default function EditableTable() {
  const injector = useContext(TableContext);
  const { columns, rows} = injector
  return (
    <>
      <div>
        <table className="editable-table">
          <thead>
            <tr>
              {columns.map((column) => {
                return <th key={column.name}>{column.name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row,rowIndex) => {
              return (
                <Row key={row.id} row={row} rowIndex={rowIndex} />
              );
            })}
          </tbody>
        </table>
        <CellSelection/>
      </div>
    </>
  );
}
