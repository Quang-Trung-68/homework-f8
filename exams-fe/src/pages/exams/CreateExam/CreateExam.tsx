import React, { useRef, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AnsweringCard from "../../../components/cards/AnsweringCard/AnsweringCard";

const CreateExam: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    // State cho form data
    const [examData, setExamData] = useState({
        examName: "",
        examCode: "",
        duration: "",
        questionCount: 0
    });

    const handleUploadClick = () => {
        fileInputRef.current?.click(); // trigger click on hidden file input
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected file:", file.name);
            
            // TODO: Xử lý đọc file, upload lên server, parse nội dung
            handleFileUpload(file);
        }
    };

    // Xử lý upload file
    const handleFileUpload = async (file: File) => {
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

            // Simulate file processing
            console.log("Processing file:", file.name);
            
            // Ví dụ: đọc nội dung file text
            if (file.type === 'text/plain') {
                const text = await file.text();
                console.log("File content:", text);
                // TODO: Parse nội dung để tạo câu hỏi tự động
            }

        } catch (error) {
            console.error("Error processing file:", error);
            alert("Có lỗi xảy ra khi xử lý file!");
            setSelectedFile(null);
        }
    };

    // Xử lý thay đổi form data
    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setExamData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    // Xử lý tạo đề bài
    const handleCreateExam = async () => {
        try {
            // Validate form
            if (!examData.examName.trim()) {
                alert("Vui lòng nhập tên đề!");
                return;
            }
            
            if (!examData.examCode.trim()) {
                alert("Vui lòng nhập mã đề!");
                return;
            }
            
            if (!examData.duration || parseInt(examData.duration) <= 0) {
                alert("Vui lòng nhập thời gian làm bài hợp lệ!");
                return;
            }
            
            if (!examData.questionCount || examData.questionCount <= 0) {
                alert("Vui lòng nhập số câu hợp lệ!");
                return;
            }

            // Prepare data for API
            const formData = new FormData();
            formData.append('examName', examData.examName);
            formData.append('examCode', examData.examCode);
            formData.append('duration', examData.duration);
            formData.append('questionCount', examData.questionCount.toString());
            
            if (selectedFile) {
                formData.append('file', selectedFile);
            }

            // TODO: Call API to create exam
            console.log("Creating exam with data:", examData);
            console.log("Selected file:", selectedFile?.name);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert("Tạo đề bài thành công!");
            
            // Reset form
            setExamData({
                examName: "",
                examCode: "",
                duration: "",
                questionCount: 0
            });
            setSelectedFile(null);
            
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (error) {
            console.error("Error creating exam:", error);
            alert("Có lỗi xảy ra khi tạo đề bài!");
        }
    };

    // Xóa file đã chọn
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
                        
                        {/* Hidden input */}
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
                                value={examData.examName}
                                onChange={handleInputChange('examName')}
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
                                value={examData.examCode}
                                onChange={handleInputChange('examCode')}
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
                                value={examData.duration}
                                onChange={handleInputChange('duration')}
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
                                value={examData.questionCount || ''}
                                onChange={(e) => setExamData(prev => ({
                                    ...prev,
                                    questionCount: parseInt(e.target.value) || 0
                                }))}
                            />
                        </Box>
                    </Grid>
                    
                    <Grid container size={12}>
                        {/* Create answer Q & A */}
                        <AnsweringCard />
                    </Grid>
                    
                    <Grid size={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button 
                                variant="contained"
                                onClick={handleCreateExam}
                                disabled={!examData.examName || !examData.examCode || !examData.duration || !examData.questionCount}
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