import React, { memo, useRef, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AnsweringCard from "../../../components/cards/AnsweringCard/AnsweringCard";
import { useExamState } from "../../../stores/examStore";

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
    const { examSelecting } = useExamState();

    // State cho form data
    const [examData, setExamData] = useState({
        exam_group: String(examSelecting.id),
        description: "default",
        name: "",
        code: "",
        total_time: 0,
        number_of_question: 1,
        questions: [],
        file: {
            id: null,
            payload: "",
            type: "",
            url: ""
        }
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

    // Hàm chuyển file thành base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleFileUpload = async (file) => {
        try {
            // Kiểm tra kích thước file (ví dụ: tối đa 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert("File quá lớn! Vui lòng chọn file nhỏ hơn 10MB.");
                setSelectedFile(null);
                return;
            }

            // Kiểm tra định dạng file
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

            // Chuyển file thành base64
            const base64String = await fileToBase64(file);

            // Tạo blob URL
            const blobUrl = URL.createObjectURL(file);

            // Cập nhật examData với thông tin file
            setExamData(prev => ({
                ...prev,
                file: {
                    id: null, // Sẽ được cập nhật sau khi upload lên server
                    payload: base64String, // "data:application/pdf;base64,JVBERi0x..."
                    type: file.type, // "application/pdf"
                    url: blobUrl // "blob:https://..."
                }
            }));

            console.log("File processed successfully:", {
                name: file.name,
                type: file.type,
                size: file.size,
                base64Length: base64String.length
            });

            // Xử lý nội dung file nếu cần
            if (file.type === 'text/plain') {
                const text = await file.text();
                console.log("File content:", text);
                // TODO: Parse nội dung để tạo câu hỏi tự động
            }

        } catch (error) {
            console.error("Error processing file:", error);
            alert("Có lỗi xảy ra khi xử lý file!");
            setSelectedFile(null);

            // Reset file data trong examData
            setExamData(prev => ({
                ...prev,
                file: {
                    id: null,
                    payload: "",
                    type: "",
                    url: ""
                }
            }));
        }
    };

    const handleInputChange = (field) => (event) => {
        let value = event.target.value;

        // Chuyển đổi sang number cho các field cần thiết
        if (field === 'number_of_question') {
            value = parseInt(value) || 1;
        } else if (field === 'total_time') {
            value = parseInt(value) || 0;
        }

        setExamData(prev => {
            const newData = {
                ...prev,
                [field]: value,
            };

            // Khi thay đổi số câu hỏi, reset lại array questions
            if (field === 'number_of_question') {
                newData.questions = Array(value).fill(null).map((_, index) => ({
                    index,
                    type: 'single-choice',
                    question: '',
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

        // Validate dữ liệu
        // if (!examData.name.trim()) {
        //     alert("Vui lòng nhập tên đề!");
        //     return;
        // }

        // if (!examData.code.trim()) {
        //     alert("Vui lòng nhập mã đề!");
        //     return;
        // }

        // if (examData.total_time <= 0) {
        //     alert("Vui lòng nhập thời gian làm bài!");
        //     return;
        // }

        // // Validate câu hỏi
        // const hasEmptyQuestions = examData.questions.some(q => 
        //     !q.question.trim() || 
        //     (q.type !== 'long-response' && !q.correct_answer.trim())
        // );

        // if (hasEmptyQuestions) {
        //     alert("Vui lòng điền đầy đủ thông tin cho tất cả câu hỏi!");
        //     return;
        // }

        try {
            // Log thông tin file để debug
            if (examData.file.payload) {
                console.log("File info:", {
                    type: examData.file.type,
                    payloadLength: examData.file.payload.length,
                    url: examData.file.url
                });
            }

            // TODO: Gửi dữ liệu lên server
            // const response = await createExamAPI(examData);
            // console.log("Created exam:", response);

            alert("Tạo đề bài thành công!");
        } catch (error) {
            console.error("Error creating exam:", error);
            alert("Có lỗi xảy ra khi tạo đề bài!");
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);

        // Cleanup blob URL để tránh memory leak
        if (examData.file.url) {
            URL.revokeObjectURL(examData.file.url);
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        // Reset file data trong examData
        setExamData(prev => ({
            ...prev,
            file: {
                id: null,
                payload: "",
                type: "",
                url: ""
            }
        }));
    };

    // Cleanup blob URL khi component unmount
    React.useEffect(() => {
        return () => {
            if (examData.file.url) {
                URL.revokeObjectURL(examData.file.url);
            }
        };
    }, [examData.file.url]);

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
                            <Box sx={{ fontSize: '0.875rem', color: '#666', mt: 0.5 }}>
                                Loại: {examData.file.type} |
                                Kích thước: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </Box>
                            {examData.file.payload && (
                                <Box sx={{ fontSize: '0.75rem', color: '#888', mt: 0.5 }}>
                                    Base64 length: {examData.file.payload.length} chars
                                </Box>
                            )}
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