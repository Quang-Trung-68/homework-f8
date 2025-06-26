import { useContext } from "react";
import TableContext from "./TableContext";
import Cell from "./Cell";

export default function Row({ row }) {
  
  const injector = useContext(TableContext);
  const { columns } = injector;

  return (
    <>
      <tr>
        {columns.map((column) => {
          return <Cell key={row[column.name]} row={row} column={column} />;
        })}
      </tr>
    </>
  );
}
