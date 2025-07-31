import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material"
import React, { memo, useState } from "react";

const AnsweringCard = memo(({ questionIndex, onQuestionChange }) => {
    const [questionType, setQuestionType] = useState('single-choice');
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleTypeChange = (event) => {
        const newType = event.target.value;
        setQuestionType(newType);

        // Reset correct answer khi đổi loại câu hỏi
        setCorrectAnswer('');

        // Gọi callback để cập nhật parent component
        onQuestionChange(questionIndex, {
            type: newType,
            correct_answer: ''
        });
    };

    const handleCorrectAnswerChange = (event) => {
        let newCorrectAnswer;

        if (questionType === 'multiple-choice') {
            // Xử lý multiple choice - có thể chọn nhiều đáp án
            const currentAnswers = correctAnswer.split(',').filter(a => a);
            const selectedValue = event.target.value;

            if (currentAnswers.includes(selectedValue)) {
                // Bỏ chọn nếu đã được chọn
                newCorrectAnswer = currentAnswers.filter(a => a !== selectedValue).join(',');
            } else {
                // Thêm vào danh sách chọn
                newCorrectAnswer = [...currentAnswers, selectedValue].join(',');
            }
        } else {
            // Single choice hoặc long response
            newCorrectAnswer = event.target.value;
        }

        setCorrectAnswer(newCorrectAnswer);

        onQuestionChange(questionIndex, {
            type: questionType,
            correct_answer: newCorrectAnswer
        });
    };

    const renderAnswerOptions = () => {
        if (questionType === 'long-response') {
            return (
                <Grid size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        placeholder="Câu trả lời mẫu (không bắt buộc)"
                        value={correctAnswer}
                        onChange={(e) => {
                            setCorrectAnswer(e.target.value);
                            onQuestionChange(questionIndex, {
                                type: questionType,
                                correct_answer: e.target.value
                            });
                        }}
                    />
                </Grid>
            );
        }

        return (
            <Grid size={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                    <FormControl>
                        <FormLabel component="legend" sx={{ fontSize: '1.0rem', mb: 1 }}>
                            {questionType === 'single-choice' ? 'Chọn đáp án đúng:' : 'Chọn các đáp án đúng:'}
                        </FormLabel>
                        <RadioGroup
                            row
                            value={correctAnswer}
                            onChange={handleCorrectAnswerChange}
                            sx={{ justifyContent: 'center' }}
                        >
                            {['A', 'B', 'C', 'D'].map((option) => (
                                <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={
                                        questionType === 'single-choice' ? (
                                            <Radio size="small" />
                                        ) : (
                                            <input
                                                type="checkbox"
                                                checked={correctAnswer.split(',').includes(option)}
                                                onChange={handleCorrectAnswerChange}
                                                value={option}
                                                style={{ margin: '9px' }}
                                            />
                                        )
                                    }
                                    label={option}
                                    sx={{ mx: 1 }}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Grid>
        );
    };

    return (
        <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2, mb: 2 }}>
            <Grid container spacing={2}>
                {/* Header câu hỏi */}
                <Grid size={12}>
                    <Box sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', height: '40px' }}>
                        Câu {questionIndex + 1}:
                    </Box>
                </Grid>
                {/* Loại câu hỏi */}
                <Grid size={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Loại câu hỏi</InputLabel>
                        <Select
                            value={questionType}
                            onChange={handleTypeChange}
                            label="Loại câu hỏi"
                        >
                            <MenuItem value="single-choice">Chọn 1 đáp án</MenuItem>
                            <MenuItem value="multiple-choice">Chọn nhiều đáp án</MenuItem>
                            <MenuItem value="long-response">Điền vào chỗ trống</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid size={8}>
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '40px', color: '#666', fontSize: '0.875rem' }}>
                        {questionType === 'single-choice' && 'Chọn 1 đáp án đúng (A, B, C hoặc D)'}
                        {questionType === 'multiple-choice' && 'Chọn các đáp án đúng (có thể chọn nhiều)'}
                        {questionType === 'long-response' && 'Nhập câu trả lời mẫu (không bắt buộc)'}
                    </Box>
                </Grid>

                {/* Các đáp án */}
                <Grid size={12}>
                    {renderAnswerOptions()}
                </Grid>
            </Grid>
        </Box>
    );
});


export default AnsweringCard