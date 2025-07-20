import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useContext, useState } from "react";
import { Context } from "./page";

export default function () {

  const injector = useContext(Context);
  const { questionIndex, question } = injector;

  const [key, setKey] = useState(0);

  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    question.answer = e.target.value;
    setKey(key + 1)
  }

  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group"
      onChange={onChange}
      value={question.answer || ""}
    >
      <FormControlLabel value={'A'} control={<Radio />} label={`${question.optionA}`} />
      <FormControlLabel value={'B'} control={<Radio />} label={`${question.optionB}`} />
      <FormControlLabel value={'C'} control={<Radio />} label={`${question.optionC}`} />
      <FormControlLabel value={'D'} control={<Radio />} label={`${question.optionD}`} />
    </RadioGroup>
  )
}