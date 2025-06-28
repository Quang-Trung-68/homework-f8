import {useContext} from "react";
import {TableContext} from "./const.js";
import Cell from "./Cell.jsx";

export default function Row ({row, rowIndex}) {

  const injector = useContext(TableContext)

  const {columns} = injector

  return (
    <tr>
      {
        columns.map((column, columnIndex) => {
          return <Cell key={column.name} row={row} column={column} columnIndex={columnIndex} rowIndex={rowIndex} />
        })
      }
    </tr>
  )
}