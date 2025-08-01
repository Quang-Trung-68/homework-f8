import { Box, Button, Chip } from "@mui/material"
import GoClass from '@mui/icons-material/Login';
import ShareIcon from '@mui/icons-material/Share';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router-dom";
import type { ClassI } from "../../../types/classes.types";

interface ClassCardProps {
    classElement: ClassI
}

const ClassCard: React.FC<ClassCardProps> = ({ classElement }) => {
    const navigate = useNavigate()

    return (
        <Box sx={{
            background: 'linear-gradient(135deg, #667db6 0%, #0082c8 100%)',
            borderRadius: 3,
            padding: 3,
            color: 'white',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
        }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Box sx={{
                    fontWeight: 700,
                    fontSize: '1.8rem',
                    lineHeight: 1.2,
                    flex: 1,
                    mr: 2
                }}>
                    {classElement.name}
                </Box>
                
                <Button
                    onClick={() => navigate(`/classes/${classElement.id}`)}
                    variant="contained"
                    size="small"
                    startIcon={<GoClass />}
                    sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        borderRadius: 2,
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.3)'
                        }
                    }}
                >
                    Vào lớp
                </Button>
            </Box>

            {/* Member Count */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2
            }}>
                <PeopleIcon sx={{ fontSize: '2rem' }} />
                <Box>
                    <Box sx={{
                        fontSize: '2.6rem',
                        fontWeight: 700,
                        lineHeight: 1
                    }}>
                        {classElement.users.length}
                    </Box>
                    <Box sx={{
                        fontSize: '1.3rem',
                        opacity: 0.9
                    }}>
                        Thành viên
                    </Box>
                </Box>
            </Box>

            {/* Footer */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Chip 
                    label={`Mã: ${classElement.id}`}
                    size="medium"
                    sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        fontSize:"1.2rem"
                    }}
                />
                
                <Button
                    variant="text"
                    size="small"
                    startIcon={<ShareIcon />}
                    sx={{
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '1.2rem',
                        textTransform: 'none',
                        minWidth: 'auto',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    Chia sẻ
                </Button>
            </Box>
        </Box>
    )
}

export default ClassCard;