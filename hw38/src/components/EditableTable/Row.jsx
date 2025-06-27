import { useContext } from "react";
import TableContext from "./TableContext";
import Cell from "./Cell";

export default function Row({ row, rowIndex }) {
  
  const injector = useContext(TableContext);
  const { columns } = injector;

  return (
    <>
      <tr>
        {columns.map((column, columnIndex) => {
          return <Cell key={row[column.name]} row={row} column={column} rowIndex={rowIndex} columnIndex={columnIndex} />;
        })}
      </tr>
    </>
  );
}
