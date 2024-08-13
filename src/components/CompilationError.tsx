import React from 'react'
import { RxCrossCircled } from "react-icons/rx";

//Compilation error component.
function CompilationError() {
  return (
    <div className='flex rounded-xl flex-col justify-center items-center w-2/5 h-full bg-red-400'>
        <RxCrossCircled size={150} color='red'/>
        <div className='text-3xl text-center text-white '>
          COMPILATION ERROR OCCURED!!! ENSURE THE IMAGE NAMES 
          ARE VALID
        </div>
    </div>
  )
}

export default CompilationError