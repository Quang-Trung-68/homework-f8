import { Button, Modal, Box, Typography, TextField, Stack } from "@mui/material";
import React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ExamGroupForm({ open, setOpen }) {

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                        Tạo bài thi mới
                    </Typography>

                    <Stack spacing={3}>
                        {/* Tên bài thi */}
                        <Box>
                            <Typography fontWeight={500} mb={1}>
                                Tên bài thi *
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Nhập tên bài thi"
                            />
                        </Box>

                        {/* Thời gian giữa các bài thi */}
                        <Box>
                            <Typography fontWeight={500} mb={1}>
                                Thời gian giữa các bài thi (phút) *
                            </Typography>
                            <TextField
                                fullWidth
                                type="number"
                                size="small"
                                placeholder="VD: 10"
                            />
                        </Box>

                        {/* Thời gian bắt đầu */}
                        <Box>
                            <Typography fontWeight={500} mb={1}>
                                Thời gian bắt đầu *
                            </Typography>
                            <TextField
                                fullWidth
                                type="date"
                                size="small"
                            />
                        </Box>
                        <Box sx={{display:"flex", justifyContent:"end", gap:"20px"}}>
                            <Button  sx={{textTransform:"none", width:100}} variant="contained">Tạo mới</Button>
                            <Button sx={{textTransform:"none", width:100}}>Hủy</Button>
                        </Box>
                       
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}