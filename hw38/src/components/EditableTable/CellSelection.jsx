import { useContext } from "react"
import TableContext from "./TableContext"

export default function CellSelection(){

    const injector = useContext(TableContext);

    const {cellSelectionRef} = injector;

    return (
        <>
        <span ref={cellSelectionRef} className="cell-selection"></span>
        </>
    )
}