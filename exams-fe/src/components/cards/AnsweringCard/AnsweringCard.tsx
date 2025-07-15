import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material"
import React from "react";

const AnsweringCard: React.FC = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <>
            <Grid size={12} container sx={{alignItems:"center"}} spacing={"10px"}>
                <Grid size={2} >Câu 1:</Grid>
                <Grid size={4} >
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth size="small">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid size={6} sx={{display:"flex", justifyContent:"center"}} >
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="a" control={<Radio />} label="A" />
                            <FormControlLabel value="b" control={<Radio />} label="B" />
                            <FormControlLabel value="c" control={<Radio />} label="C" />
                             <FormControlLabel value="d" control={<Radio />} label="D" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

export default AnsweringCard