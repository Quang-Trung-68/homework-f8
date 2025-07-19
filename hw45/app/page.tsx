"use client"

import {useState} from "react";

export default function Home() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <h2>count: {count}</h2>
    </>
  );
}
