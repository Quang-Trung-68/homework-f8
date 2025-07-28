import { Avatar, AvatarGroup, Box, Button, Chip, Grid, Paper } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import { DataGrid } from '@mui/x-data-grid';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useParams } from "react-router-dom";
import { useClassState } from "../../../stores/classStore";
import { useEffect } from "react";
import { useExamState } from "../../../stores/examStore";
import dayjs from "dayjs";

const columns = [
  { field: 'no', headerName: 'NO.', width: 70 },
  { field: 'id', headerName: 'ID.', width: 70 },
  { field: 'name', headerName: 'HỌ TÊN', width: 200 },
  {
    field: 'position',
    headerName: 'VỊ TRÍ',
    width: 100,
  },
  {
    field: 'role',
    headerName: '',
    width: 100,
  }
];

const PostExam = ({ time, examName }) => {

  const formatted = dayjs(time).format("DD-MM-YYYY HH:mm:ss");
  console.log(formatted);
  return (
    <Box sx={{ display: "flex", gap: "5px" }}>
      <Box><Avatar></Avatar></Box>
      <Box sx={{ fontSize: "14px", display: "flex", alignItems: "start", justifyContent: "space-between", flexDirection: "column", gap: "5px" }}>
        <Box fontWeight={"bold"}>Bài thi <Box sx={{color:"blue"}} component={"span"}>{examName}</Box> vừa được tải lên</Box>
        <Box>🕒 {formatted}</Box>
      </Box>
    </Box>
  )
}

const paginationModel = { page: 0, pageSize: 5 };

function DataTable({ users }) {

  const rows = users.map((user, index) => {
    return {
      no: (index + 1),
      id: user.id,
      name: user.name,
      position: user.role === "teacher" ? "Giáo viên" : "Học sinh",
      role: user.role === "teacher" ? "🔑" : "",
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

const ClassDetail: React.FC = () => {

  const { id } = useParams()
  console.log(id)

  const { classSelecting, getClass } = useClassState()
  const { examGroupSelecting, getExamGroup } = useExamState();

  useEffect(() => {
    getClass(Number(id))
    getExamGroup(Number(id))
  }, [])

  console.log(classSelecting);


  return (
    <>

      <Grid container spacing={4}  >
        <Grid size={8} sx={{ p: "30px" }}  >
          <Grid sx={{ background: "#45b0e1", color: "#fff", mb: "20px", p: "30px", borderRadius: "10px" }}>
            <Box sx={{ mb: "20px" }}>
              <Box sx={{ fontSize: "24px", mb: "10px", fontWeight: "bold" }}>Test thi thu</Box>
              <Box>Giáo viên: Đặng Quang Trung</Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box>Chia sẻ lớp học:</Box>
                <Button startIcon={<ContentCopyIcon />} size="small" sx={{ p: "2px", textTransform: "none", color: "#fff" }} variant="outlined">Sao chép liên kết</Button>
              </Box>
              <Box>
                <AvatarGroup max={4}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                  <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                </AvatarGroup>
              </Box>
            </Box>
          </Grid>
          <Grid container >
            <Grid size={6} padding={"20px"} sx={{ display: "flex", alignItems: "center", gap: "20px" }} >
              <GroupIcon sx={{ fontSize: "70px" }} color="primary" />
              <Box sx={{ fontSize: "26px", fontWeight: "bold" }} >{classSelecting.users.length} Thành viên</Box>
            </Grid>
            <Grid size={6} padding={"20px"} sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <DescriptionIcon sx={{ fontSize: "70px" }} color="primary" />
              <Box sx={{ fontSize: "26px", fontWeight: "bold" }}>{examGroupSelecting.length} Bài kiểm tra</Box>
            </Grid>
          </Grid>
          <Grid container>
            <Box>Danh sách thành viên</Box>
            <DataTable users={classSelecting.users} />
          </Grid>
        </Grid>
        <Grid size={4} fontSize={24} padding={"30px"} sx={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "start" }} >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px" }} >
            <NoteAltIcon />
            <Box>Hoạt động gần đây</Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "start", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
              {
                examGroupSelecting.map((examSelecting => {
                  return <PostExam time={examSelecting["created_at"]} examName = {examSelecting["name"]} />
                }))
              }
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ClassDetail;
