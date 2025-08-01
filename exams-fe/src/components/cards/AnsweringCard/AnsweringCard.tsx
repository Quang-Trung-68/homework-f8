import { Box, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material"
import { memo, useState } from "react";

const AnsweringCard = memo(({ questionIndex, onQuestionChange }) => {
    const [questionType, setQuestionType] = useState('single-choice');
    const [questionText, setQuestionText] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleTypeChange = (event) => {
        const newType = event.target.value;
        setQuestionType(newType);
        setCorrectAnswer('');

        onQuestionChange(questionIndex, {
            type: newType,
            question: questionText,
            correct_answer: ''
        });
    };

    const handleQuestionTextChange = (event) => {
        const newText = event.target.value;
        setQuestionText(newText);

        onQuestionChange(questionIndex, {
            type: questionType,
            question: newText,
            correct_answer: correctAnswer
        });
    };

    const handleCorrectAnswerChange = (event) => {
        let newCorrectAnswer;

        if (questionType === 'multiple-choice') {
            const currentAnswers = correctAnswer.split(',').filter(a => a);
            const selectedValue = event.target.value;

            if (currentAnswers.includes(selectedValue)) {
                newCorrectAnswer = currentAnswers.filter(a => a !== selectedValue).join(',');
            } else {
                newCorrectAnswer = [...currentAnswers, selectedValue].join(',');
            }
        } else {
            newCorrectAnswer = event.target.value;
        }

        setCorrectAnswer(newCorrectAnswer);

        onQuestionChange(questionIndex, {
            type: questionType,
            question: questionText,
            correct_answer: newCorrectAnswer
        });
    };

    return (
        <Box sx={{
            border: '1px solid #ddd',
            borderRadius: 1,
            p: 1,
            backgroundColor: '#fafafa',
            width: "100%"
        }}>
            {/* Header row - Question number and type selector */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}>
                <Box sx={{
                    fontWeight: 'bold',
                    maxWidth: '50px',
                    flexShrink: 0,
                    color: '#495057',
                }}>
                    Câu {questionIndex + 1}:
                </Box>

                <Select
                    value={questionType}
                    onChange={handleTypeChange}
                    sx={{
                        maxWidth: 125,
                        minWidth: 125,                        
                        flexShrink: 0,
                        fontSize: "1.3rem",
                        height: "40px",
                        '& .MuiSelect-select': {
                            padding: '6px 10px',
                            fontSize: "1.3rem",
                            fontWeight: 500
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ccc',
                            borderWidth: '1px'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                        }
                    }}
                >
                    <MenuItem
                        value="single-choice"
                        sx={{
                            fontSize: "1.3rem",
                            padding: '10px 16px'
                        }}
                    >
                        1 đáp án
                    </MenuItem>
                    <MenuItem
                        value="multiple-choice"
                        sx={{
                            fontSize: "1.3rem",
                            padding: '10px 16px'
                        }}
                    >
                        Nhiều đáp án
                    </MenuItem>
                    <MenuItem
                        value="long-response"
                        sx={{
                            fontSize: "1.3rem",
                            padding: '10px 16px'
                        }}
                    >
                        Tự luận
                    </MenuItem>
                </Select>
                {/* Answer section */}
                <Box sx={{
                    width: '100%',
                    backgroundColor: '#f8f9fa',
                    borderRadius: 1,
                    p: 1,
                    border: '1px solid #e9ecef'
                }}>
                    {questionType === 'long-response' ? (
                        <Box>
                            <Box sx={{
                                fontSize: '1.4rem',
                                color: '#495057',
                                m: 1,
                                fontWeight: 600
                            }}>
                                Đáp án mẫu:
                            </Box>
                            <TextField
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="Nhập đáp án mẫu (không bắt buộc)..."
                            value={correctAnswer}
                            onChange={(e) => {
                                setCorrectAnswer(e.target.value);
                                onQuestionChange(questionIndex, {
                                    type: questionType,
                                    question: questionText,
                                    correct_answer: e.target.value
                                });
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                    fontSize: '0.95rem',
                                    borderRadius: 1,
                                    '& fieldset': {
                                        borderColor: '#555'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1976d2'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1976d2',
                                        borderWidth: '2px'
                                    },
                                    '& input::placeholder': {
                                        fontSize: '1.2rem',
                                        color: '#555'
                                    },
                                    '& textarea::placeholder': {
                                        fontSize: '1.2rem',
                                        color: '#555'
                                    }
                                }
                            }}
                        />
                        </Box>
                    ) : (
                        <Box>
                            <Box sx={{
                                fontSize: '1.4rem',
                                color: '#495057',
                                mb: 1,
                                fontWeight: 600
                            }}>
                                Chọn đáp án đúng:
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                gap: 2,
                                alignItems: 'center'
                            }}>
                                {questionType === 'single-choice' ? (
                                    <RadioGroup
                                        row
                                        value={correctAnswer}
                                        onChange={handleCorrectAnswerChange}
                                        sx={{
                                            display: 'flex',
                                            gap: 2
                                        }}
                                    >
                                        {['A', 'B', 'C', 'D'].map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '&.Mui-checked': {
                                                                color: '#1976d2'
                                                            }
                                                        }}
                                                    />
                                                }
                                                label={option}
                                                sx={{
                                                    margin: 0,
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1.3rem',
                                                        fontWeight: 500,
                                                        color: '#495057'
                                                    },
                                                    
                                                }}
                                            />
                                        ))}
                                    </RadioGroup>
                                ) : (
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 2
                                    }}>
                                        {['A', 'B', 'C', 'D'].map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <input
                                                        type="checkbox"
                                                        checked={correctAnswer.split(',').includes(option)}
                                                        onChange={handleCorrectAnswerChange}
                                                        value={option}
                                                        style={{
                                                            margin: '0 8px 0 0',
                                                            transform: 'scale(1.1)',
                                                            accentColor: '#1976d2'
                                                        }}
                                                    />
                                                }
                                                label={option}
                                                sx={{
                                                    margin: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1.3rem',
                                                        fontWeight: 500,
                                                        color: '#495057'
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>


        </Box>
    );
});

export default AnsweringCard;