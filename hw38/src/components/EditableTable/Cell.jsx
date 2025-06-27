import { useContext, useRef } from "react";
import TableContext from "./TableContext";

export default function Cell({ row, column, rowIndex, columnIndex }) {
  const cellRef = useRef(null);
  const injector = useContext(TableContext);
  const { cursor, setCursor, cellSelectionRef } = injector;
  const onClick = () => {
    if (cellRef?.current) {
      const element = cellRef.current;
      const top = element.offsetTop;
      const left = element.offsetLeft;
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      setCursor({
        ...cursor,
        top,
        left,
        width,
        height,
        rowIndex: rowIndex + 1,
        columnIndex: columnIndex + 1,
      });
      const cellSelectCurrent = cellSelectionRef.current;
      cellSelectCurrent.style.border = "3px solid blue";
      cellSelectCurrent.style.position = "absolute";
      cellSelectCurrent.style.top = `${top}px`;
      cellSelectCurrent.style.left = `${left}px`;
      cellSelectCurrent.style.width = `${width}px`;
      cellSelectCurrent.style.height = `${height}px`;
    }
  };
  return (
    <>
      <td ref={cellRef} onClick={onClick}>
        {row[column.name]}
      </td>
    </>
  );
}
