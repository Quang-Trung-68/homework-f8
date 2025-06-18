import "./App.css";
import { FTable } from "./components";
import { Button } from "@mui/material";
import { useState } from "react";
import EmployeeDialog from "./components/EmployeeDialog";

function App() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [curEmployee, setCurEmployee] = useState({
    id: null,
    name: null,
    age: null,
    address: null,
  });

  const columns = [
    { name: "id", text: "Id" },
    { name: "name", text: "Name" },
    { name: "age", text: "Age" },
    { name: "address", text: "Address" },
    { name: "action", text: "" },
  ];

  const [action, setAction] = useState("");

  const [employees, setEmployees] = useState([
  {
    id: 1,
    name: "Nguyễn Văn An",
    age: 28,
    address: "123/3 đường Lê Lợi, phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    age: 32,
    address: "456/7 đường Nguyễn Huệ, Phường 1, Quận 1, Thành phố Hồ Chí Minh",
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    age: 25,
    address: "789/2 đường Hai Bà Trưng, Phường Đa Kao, Quận 1, Thành phố Hồ Chí Minh",
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    age: 29,
    address: "234/5 đường Điện Biên Phủ, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
  },
  {
    id: 5,
    name: "Hoàng Văn Em",
    age: 35,
    address: "567/8 đường Lý Tự Trọng, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
  },
  {
    id: 6,
    name: "Vũ Thị Phương",
    age: 27,
    address: "123/5B đường Lê Lợi, Phường 6, Thành phố Tuy Hòa, Tỉnh Phú Yên",
  },
  {
    id: 7,
    name: "Đặng Minh Giang",
    age: 31,
    address: "890/12 đường Trần Hưng Đạo, Phường 5, Quận 5, Thành phố Hồ Chí Minh",
  },
  {
    id: 8,
    name: "Bùi Thị Hoa",
    age: 26,
    address: "345/6 đường Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1, Thành phố Hồ Chí Minh",
  },
  {
    id: 9,
    name: "Phan Văn Ích",
    age: 33,
    address: "678/9 đường Võ Văn Kiệt, Phường 3, Quận 5, Thành phố Hồ Chí Minh",
  },
  {
    id: 10,
    name: "Lý Thị Kim",
    age: 24,
    address: "901/11 đường Cách Mạng Tháng 8, Phường 10, Quận 3, Thành phố Hồ Chí Minh",
  },
]);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setAction("add");
          setCurEmployee({});
          setIsOpenDialog(true);
        }}
        sx={{ marginLeft: "80vw"}}
      >
        Add new
      </Button>
      <EmployeeDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        curEmployee={curEmployee}
        setCurEmployee={setCurEmployee}
        employees={employees}
        action={action}
        setEmployees={setEmployees}
      />
      <FTable
        columns={columns}
        rows={employees}
        curEmployee={curEmployee}
        setIsOpenDialog={setIsOpenDialog}
        setCurEmployee={setCurEmployee}
        setAction={setAction}
      />
    </>
  );
}

export default App;
