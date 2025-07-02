import { useContext } from "react"
import { QuizContext } from "./QuizContext"

export default function Test (){

    const injector = useContext(QuizContext)

    const {state} = injector
    console.log(state);
    return(
        <>
        <h1> 12345</h1>
        </>
    )
}