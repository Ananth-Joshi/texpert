'use client'
import React, {useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-latex'
import 'ace-builds/src-noconflict/theme-github_dark'

function page() {
  const [content,setContent]=useState(
    "\\documentclass{article}\\usepackage{amsmath}\\title{Sample Document}\\author{John Doe}\\date{\\today}\\begin{document}\\maketitle\\section{Introduction}This is a sample document to demonstrate LaTeX compilation.\\section{Math Example}Here is a simple equation: $E = mc^2$.\\end{document}"
  )
  const [pdf,setpdf]=useState<any>()
  useEffect(()=>{
    getPDF()
  },[content])
  const getPDF=async()=>{
    const res=await fetch('/api/pdfgenerator',{
      method:'POST',
      body:JSON.stringify({latex:content}),
    });
    const pdfBlob=await res.blob();
    const pdfUrl=URL.createObjectURL(pdfBlob);
    console.log(pdfUrl)
    setpdf(pdfUrl)
  }

  return (
    <div className='h-full'>
      <div className='flex gap-2 h-full m-4'>
      <AceEditor 
        showPrintMargin={false}
        fontSize={18} width='50%' wrapEnabled 
        height='50vh' value={content} theme='github_dark'  mode='latex'
        placeholder='%Write code Here'
        onChange={(value)=>{setContent(value)}}
      />

      </div>
      <button onClick={async()=>{await getPDF()}}>click</button>
    </div>
  )
}

export default page