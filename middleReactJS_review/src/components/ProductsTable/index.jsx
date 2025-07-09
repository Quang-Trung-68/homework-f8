import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ProductForm from "../ProductForm";
import api from "../../plugins/api";

export default function ProductsTable({
  products,
  open,
  setOpen,
  handleOpen,
  handleClose,
  formData,
  setFormData,
  getDataProducts,
  isEdit,
  setIsEdit,
  onSaveEdit,
  onEdit, idEdit, setIdEdit,onSaveDelete
}) {
  console.log(products);


  const showEdit = (row)=>{
    setIsEdit(true);
    setFormData({name: row.name, categoryId: row.categoryId, orderNum : row.orderNum})
    handleOpen()
    setIdEdit(row.id)
    console.log(row);
  }

  const showDelete = async (row)=>{
    // setIdEdit(row.id);
    console.log(row);
    await onSaveDelete(row.id)
  }

  

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Danh sach san pham</h2>
        <ProductForm
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          formData={formData}
          setFormData={setFormData}
          getDataProducts={getDataProducts}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSaveEdit = {onSaveEdit}
          onEdit = {onEdit}
          idEdit = {idEdit}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Ten san pham</TableCell>
              <TableCell align="right">Danh muc</TableCell>
              <TableCell align="right">So thu tu</TableCell>
              <TableCell align="right">Thao tac</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.categoryId}</TableCell>
                <TableCell align="right">{row.orderNum}</TableCell>
                <TableCell row={row} align="right">
                  <Button variant="outlined" onClick={() => showEdit(row)}>
                    SUA
                  </Button>
                  <Button variant="outlined" onClick={()=> showDelete(row)} color="error">
                    XOA
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
