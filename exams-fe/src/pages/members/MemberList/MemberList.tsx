import { Box, Button, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useClassState } from "../../../stores/classStore";


const columns = [
  { field: 'no', headerName: 'NO.', width: 70 },
  { field: 'id', headerName: 'ID.', width: 70 },
  { field: 'name', headerName: 'HỌ TÊN', width: 200 },
  {
    field: 'position',
    headerName: 'VỊ TRÍ',
    width: 200,
  }
];

const paginationModel = { page: 0, pageSize: 5 };

function DataTable({ users }) {

  console.log(users);

  const rows = users.map((user, index) => {
    return {
      no: index + 1,
      id: user.id,
      name: user.name,
      position: user.role === "teacher" ? "Giáo viên" : "Học sinh"
    }
  })

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
        }
        sx={{
          border: 0,
          // Font size cho cells
          '& .MuiDataGrid-cell': {
            fontSize: '1.4rem', // 14px
            fontWeight: 400,
            display: 'flex',
            alignItems: 'center',
            padding: '0.8rem 1.6rem', // 8px 16px
          },
          // Font size cho header
          '& .MuiDataGrid-columnHeader': {
            fontSize: '1.5rem', // 15px
            fontWeight: 600,
            color: '#333',
          },
          // Font size cho footer (pagination)
          '& .MuiDataGrid-footerContainer': {
            fontSize: '1.4rem', // 14px
          },
          // Chỉnh font size cho "Rows per page"
          '& .MuiTablePagination-displayedRows': {
            fontSize: '1.4rem', // 14px
            fontWeight: 400,
          },
          '& .MuiTablePagination-selectLabel': {
            fontSize: '1.4rem', // 14px
            fontWeight: 400,
          },
          '& .MuiTablePagination-select': {
            fontSize: '1.4rem', // 14px
          },
          // Chỉnh font size cho các nút pagination
          '& .MuiTablePagination-actions button': {
            fontSize: '1.4rem', // 14px
          },
          // Row styling
          '& .even-row': {
            backgroundColor: '#f9f9f9',
          },
          '& .odd-row': {
            backgroundColor: '#ffffff',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#e3f2fd',
          },
          // Tăng row height để font không bị chật
          '& .MuiDataGrid-row': {
            minHeight: '4.8rem !important', // 48px
          }
        }}
      />
    </Paper>
  );
}

const MemberList: React.FC = () => {
  const { classSelecting, getClass } = useClassState()

  return (
    <>
      <Box sx={{ fontSize: "2.2rem", fontWeight: "bold", mb: "30px" }}>Danh sách thành viên</Box>
      <DataTable users={classSelecting.users} />
    </>
  )
}

export default MemberList;