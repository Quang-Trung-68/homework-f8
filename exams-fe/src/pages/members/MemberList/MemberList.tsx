import { Box, Button, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import ExamCard from "../../../components/cards/ExamCard/ExamCard";
import { DataGrid } from "@mui/x-data-grid";

const examClasses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const columns = [
  { field: 'id', headerName: 'NO.', width: 70 },
  { field: 'name', headerName: 'HỌ TÊN', width: 200 },
  {
    field: 'position',
    headerName: 'VỊ TRÍ',
    width: 200,
  }
];

const rows = [
  { id: 1, name: 'Snow', position: "Giáo viên" },
  { id: 2, name: 'Snow', position: "Hoc sinh" },
  { id: 3, name: 'Snow', position: "Hoc sinh" },
  { id: 4, name: 'Snow', position: "Hoc sinh" },
  { id: 5, name: 'Snow', position: "Hoc sinh" },
];

const paginationModel = { page: 0, pageSize: 5 };

function DataTable() {
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
        sx={{border:0,
          '& .even-row': {
            backgroundColor: '#f9f9f9',
          },
          '& .odd-row': {
            backgroundColor: '#ffffff',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#e3f2fd',
          },
        }}
      />
    </Paper>
  );
}

const MemberList: React.FC = () => {

    return (
        <>
        <Box sx={{fontSize:"32px", fontWeight:"bold", mb:"30px"}}>Danh sách thành viên</Box>
        <DataTable/>
        </>
    )
}

export default MemberList;