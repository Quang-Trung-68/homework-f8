import { memo, useState } from "react";

const User1 = memo(({name,point,setPoint})=>{
    console.log("Render user 1 with points: ",name, point);
    return (
       <>
            <p>{name}: {point}</p>
            <button onClick={()=> setPoint(point+1)}>UP POINT USER 1</button>
       </>
    )
})

const User2 = memo(({name,point,setPoint})=>{
    console.log("Render user 2 with points: ",name, point);
     return (
        <>
            <p>{name}: {point}</p>
            <button onClick={()=> setPoint(point+1)}>UP POINT USER 2</button>
       </>
    )
})

const User3 = memo(({name,point,setPoint})=>{
    console.log("Render user 3 with points: ",name, point);
     return (
        <>
            <p>{name}: {point}</p>
            <button onClick={()=> setPoint(point+1)}>UP POINT USER 3</button>
       </>
    )
})

const Hw2 = () => {
  const users = [
    { id: 1, name: "Nguyễn Văn A" },
    { id: 2, name: "Trần Thị B" },
    { id: 3, name: "Lê Văn C" },
  ];

  const [pointUser1, setPointUser1] = useState(0);
  const [pointUser2, setPointUser2] = useState(0);
  const [pointUser3, setPointUser3] = useState(0);

  return (<>
  
  <User1 name={users[0].name} point={pointUser1} setPoint={setPointUser1}/>
  <User2 name={users[1].name}  point={pointUser2} setPoint={setPointUser2}/>
  <User3 name={users[2].name} point={pointUser3} setPoint={setPointUser3} />
  
  </>);
};

export default Hw2;
