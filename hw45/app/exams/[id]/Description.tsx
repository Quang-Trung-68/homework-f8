import { useContext } from "react";
import { Context } from "./page";

export default function () {
  const injector = useContext(Context);
  const { questionIndex,question } = injector;
  return (
    <>
      <h1>Description</h1>
      <p>
        {question.description}
      </p>
    </>
  )
}