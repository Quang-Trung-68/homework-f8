import { Button, Modal, Box, Typography, TextField, Stack } from "@mui/material";
import { useEffect, useState } from "react";
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

export default function ExamGroupForm({ open, setOpen, action, exam }) {

    const { createExamGroup, getExamGroup, updateExamGroup, examSelecting, getExam } = useExamState();
    const { classSelecting } = useClassState()
    const [formExamGroup, setFormExamGroup] = useState({
        name: "",
        start_time: "",
        await_time: 0,
        class_id: String(classSelecting.id)
    });

    useEffect(() => {
        setFormExamGroup({ name: examSelecting.name, start_time: examSelecting.start_time, await_time: examSelecting.await_time, class_id: String(classSelecting.id) })
    }, [examSelecting])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onChange = (e) => {
        setFormExamGroup({
            ...formExamGroup,
            [e.target.name]: e.target.value,
        })
    }

    const onCreate = async () => {
        await createExamGroup({ ...formExamGroup, ["await_time"]: Number(formExamGroup.await_time) });
        await getExamGroup(Number(classSelecting.id))
        handleClose()
    }

    const onEdit = async () => {
        await updateExamGroup(examSelecting.id, { ...formExamGroup, ["await_time"]: Number(formExamGroup.await_time) })
        await getExam(Number(examSelecting.id));
        handleClose()
    }

    const onDelete = async () => {

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
                        {
                            action === "edit" ? "Chỉnh sửa bài thi" : (action === "create" ? "Tạo bài thi mới" : "Xóa bài thi")
                        }
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
                                value={action === "create" ? "" : formExamGroup.name}
                                disabled={action === "delete"}
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
                                value={action === "create" ? null : formExamGroup.await_time}
                                disabled={action === "delete"}
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
                                value={action === "create" ? "" : formExamGroup.start_time}
                                disabled={action === "delete"}
                            />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                            <Button sx={{ textTransform: "none", width: 140 }} variant="contained" color={action === "delete" ? "error" : "info"} onClick={action === "create" ? onCreate : (action === "edit" ? onEdit : onDelete)}>
                                {action === "edit" ? "Chỉnh sửa" : (action === "create" ? "Tạo mới" : "Xóa")}
                            </Button>
                            <Button sx={{ textTransform: "none", width: 140 }} onClick={handleClose}>Hủy</Button>
                        </Box>

                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}