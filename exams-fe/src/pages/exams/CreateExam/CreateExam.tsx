import React, { memo, useRef, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AnsweringCard from "../../../components/cards/AnsweringCard/AnsweringCard";

const RenderQuestions = memo(({ count, onQuestionsChange }) => {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <AnsweringCard
                    key={index}
                    questionIndex={index}
                    onQuestionChange={onQuestionsChange}
                />
            ))}
        </>
    );
});

const CreateExam = () => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // State cho form data
    const [examData, setExamData] = useState({
        exam_group: "",
        description: "default",
        name: "",
        code: "",
        total_time: 0,
        number_of_question: 1,
        questions: [] // Thêm array để lưu câu hỏi
    });

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected file:", file.name);
            handleFileUpload(file);
        }
    };

    const handleFileUpload = async (file) => {
        try {
            if (file.size > 10 * 1024 * 1024) {
                alert("File quá lớn! Vui lòng chọn file nhỏ hơn 10MB.");
                setSelectedFile(null);
                return;
            }

            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain'
            ];

            if (!allowedTypes.includes(file.type)) {
                alert("Định dạng file không được hỗ trợ!");
                setSelectedFile(null);
                return;
            }

            console.log("Processing file:", file.name);

            if (file.type === 'text/plain') {
                const text = await file.text();
                console.log("File content:", text);
            }

        } catch (error) {
            console.error("Error processing file:", error);
            alert("Có lỗi xảy ra khi xử lý file!");
            setSelectedFile(null);
        }
    };

    const handleInputChange = (field) => (event) => {
        const value = field === 'number_of_question' ? parseInt(event.target.value) || 1 : event.target.value;

        setExamData(prev => {
            const newData = {
                ...prev,
                [field]: value
            };

            // Khi thay đổi số câu hỏi, reset lại array questions
            if (field === 'number_of_question') {
                newData.questions = Array(value).fill(null).map((_, index) => ({
                    index,
                    type: 'single-choice',
                    question: '',
                    answers: { A: '', B: '', C: '', D: '' },
                    correct_answer: ''
                }));
            }

            return newData;
        });
    };

    // Hàm xử lý khi câu hỏi thay đổi
    const handleQuestionsChange = (questionIndex, questionData) => {
        setExamData(prev => {
            const newQuestions = [...prev.questions];
            newQuestions[questionIndex] = {
                index: questionIndex,
                ...questionData
            };

            return {
                ...prev,
                questions: newQuestions
            };
        });
    };

    const handleCreateExam = async () => {
        console.log("Exam Data:", examData);

        // Validate dữ liệu trước khi gửi
        const hasEmptyQuestions = examData.questions.some(q =>
            !q.question.trim() ||
            (q.type !== 'long-response' && Object.values(q.answers).some(a => !a.trim())) ||
            !q.correct_answer.trim()
        );

        if (hasEmptyQuestions) {
            alert("Vui lòng điền đầy đủ thông tin cho tất cả câu hỏi!");
            return;
        }

        // TODO: Gửi dữ liệu lên server
        try {
            // API call here
            alert("Tạo đề bài thành công!");
        } catch (error) {
            console.error("Error creating exam:", error);
            alert("Có lỗi xảy ra khi tạo đề bài!");
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <Grid container spacing={4} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Grid size={12}>
                    Danh sách bài thi {">"} Đề thi lần 1 {">"} Thêm bài thi
                </Grid>

                <Grid size={6}>
                    <Box color={"#000"} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Button
                            onClick={handleUploadClick}
                            startIcon={<FileUploadIcon />}
                            color="inherit"
                            sx={{ textTransform: "none" }}
                        >
                            Tải lên từ máy
                        </Button>

                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.txt"
                        />
                    </Box>

                    {selectedFile && (
                        <Box mt={1} textAlign="center">
                            <Box>
                                Đã chọn: <strong>{selectedFile.name}</strong>
                            </Box>
                            <Box mt={1}>
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={handleRemoveFile}
                                    sx={{ textTransform: "none" }}
                                >
                                    Xóa file
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Grid>

                <Grid size={6} container>
                    <Grid size={6} container sx={{ gap: "10px", flexDirection: "column" }}>
                        <Box>Tên đề *</Box>
                        <Box>
                            <TextField
                                fullWidth
                                size="small"
                                required
                                label="Nhập tên đề"
                                value={examData.name}
                                onChange={handleInputChange('name')}
                            />
                        </Box>
                    </Grid>

                    <Grid size={6} container sx={{ gap: "10px", flexDirection: "column" }}>
                        <Box>Mã đề *</Box>
                        <Box>
                            <TextField
                                fullWidth
                                size="small"
                                required
                                label="Nhập mã đề"
                                value={examData.code}
                                onChange={handleInputChange('code')}
                            />
                        </Box>
                    </Grid>

                    <Grid size={6} container sx={{ gap: "10px", flexDirection: "column" }}>
                        <Box>Thời gian làm bài(phút) *</Box>
                        <Box>
                            <TextField
                                fullWidth
                                size="small"
                                required
                                type="number"
                                label="Nhập thời gian"
                                value={examData.total_time}
                                onChange={handleInputChange('total_time')}
                                inputProps={{
                                    min: 1,
                                    max: 300
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={6} container sx={{ gap: "10px", flexDirection: "column" }}>
                        <Box>Số câu *</Box>
                        <Box>
                            <TextField
                                type="number"
                                inputProps={{
                                    min: 1,
                                    max: 100,
                                    step: 1,
                                }}
                                fullWidth
                                size="small"
                                required
                                label="Nhập số câu"
                                value={examData.number_of_question}
                                onChange={handleInputChange('number_of_question')}
                            />
                        </Box>
                    </Grid>

                    <Grid container size={12}>
                        <RenderQuestions
                            count={examData.number_of_question}
                            onQuestionsChange={handleQuestionsChange}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                onClick={handleCreateExam}
                            >
                                Tạo đề bài
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default CreateExam;