import { useContext, useRef } from "react";
import TableContext from "./TableContext";

export default function Cell({ row, column }) {
  const cellRef = useRef(null);
  const injector = useContext(TableContext);
  const { cursor, setCursor } = injector;
  const onClick = () => {
    if (cellRef?.current) {
      const element = cellRef.current;
      const top = element.offsetTop;
      const left = element.offsetLeft;
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      setCursor({ ...cursor, top, left, width, height });
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
