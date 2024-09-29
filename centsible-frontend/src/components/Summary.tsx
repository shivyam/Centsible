


import { useState } from "react";

import clsx from 'clsx';

function Summary() {

  const[level, setLevel] = useState("beginner");


  return (
    <>

    <h1 className="font-bold text-3xl">Current Level: {level}</h1>
    {/* Pass the state handler functions as props to ScraperComponent */}

    <button onClick={() => setLevel("beginner")} 
        className={clsx("bg-blue-600 p-2 m-2 rounded-full", 
        {"bg-gray-200": level==="beginner"})}>Beginner</button>

    <button onClick={() => setLevel("intermediate")} 
        className={clsx("bg-blue-600 p-2 m-2 rounded-full", 
        {"bg-gray-200": level==="intermediate"})}>Intermediate</button>

    <button onClick={() => setLevel("advanced")} 
        className={clsx("bg-blue-600 p-2 m-2 rounded-full", 
        {"bg-gray-200": level==="advanced"})}>Advanced</button>



    </>


  );
}

export default Summary;
