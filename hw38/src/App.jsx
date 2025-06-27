import { EditableTable } from "./components";
import TableContext from "./components/EditableTable/TableContext";
import "./App.css";
import { useRef, useState } from "react";

const columns = [
  { name: "product" },
  { name: "quantity" },
  { name: "price" },
  { name: "amount" },
  { name: "comment" },
];

const defaultCursor = {
  rowIndex: 0,
  columnIndex: 0,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
};

function App() {
  const cellSelectionRef = useRef(null);
  const [cursor, setCursor] = useState({ ...defaultCursor });

  const [rows, setRows] = useState([
    {
      id: 1,
      product: "product 1",
      quantity: 50,
      price: 10000,
      amount: 500000,
      comment: "this is comment",
    },
    {
      id: 2,
      product: "product 2",
      quantity: 50,
      price: 10000,
      amount: 500000,
      comment: "this is comment 2",
    },
  ]);

  const provider = { rows, columns, cursor, setCursor, cellSelectionRef };
  console.log(cursor, cellSelectionRef.current);
  return (
    <TableContext.Provider value={provider}>
      <EditableTable />
    </TableContext.Provider>
  );
}

export default App;
