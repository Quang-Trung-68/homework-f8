import { Button, Modal, Box, Typography, TextField, Stack } from "@mui/material";
import React, { useState } from "react";
import { useExamState } from "../../../stores/examStore";
import { useClassState } from "../../../stores/classStore";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export default function ExamGroupForm({ open, setOpen }) {

    const { createExamGroup,getExamGroup } = useExamState();
    const { classSelecting } = useClassState()
    const [formExamGroup, setFormExamGroup] = useState({
        name: "",
        start_time: "",
        await_time: 0,
        class_id: String(classSelecting.id)
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onChange = (e) => {
        setFormExamGroup({
            ...formExamGroup,
            [e.target.name]: e.target.value,
        })
        console.log(formExamGroup);
    }

    const onCreate = async () => {
        await createExamGroup({ ...formExamGroup, ["await_time"]: Number(formExamGroup.await_time) });
        await getExamGroup(Number(classSelecting.id))
        handleClose()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography fontSize={"2.4rem"} fontWeight={800} id="modal-modal-title" variant="h6" component="h2" mb={2}>
                        Tạo bài thi mới
                    </Typography>

                    <Stack spacing={3}>
                        {/* Tên bài thi */}
                        <Box>
                            <Typography fontSize={"1.5rem"} fontWeight={500} mb={1}>
                                Tên bài thi *
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Nhập tên bài thi"
                                name="name"
                                onChange={onChange}
                            />
                        </Box>

                        {/* Thời gian giữa các bài thi */}
                        <Box>
                            <Typography fontSize={"1.5rem"} fontWeight={500} mb={1}>
                                Thời gian giữa các bài thi (phút) *
                            </Typography>
                            <TextField
                                fullWidth
                                type="number"
                                size="small"
                                placeholder="VD: 10"
                                name="await_time"
                                onChange={onChange}
                            />
                        </Box>

                        {/* Thời gian bắt đầu */}
                        <Box>
                            <Typography fontSize={"1.5rem"} fontWeight={500} mb={1}>
                                Thời gian bắt đầu *
                            </Typography>
                            <TextField
                                fullWidth
                                type="date"
                                size="small"
                                name="start_time"
                                onChange={onChange}
                            />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                            <Button sx={{ textTransform: "none", width: 140 }} variant="contained" onClick={onCreate}>Tạo mới</Button>
                            <Button sx={{ textTransform: "none", width: 140 }} onClick={handleClose}>Hủy</Button>
                        </Box>

                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}