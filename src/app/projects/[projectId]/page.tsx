'use client'
import React, {FormEvent, useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-latex'
import 'ace-builds/src-noconflict/theme-github_dark'
import CompilationError from '@/components/CompilationError'
import { IoSend } from "react-icons/io5";
import FileList from '@/components/FileList'
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from 'next/link'
import { codeGenerator } from '@/gemini/geminiCongif'
import { auth } from '@/firebase/firebaseconfig'
import { useParams, useRouter } from 'next/navigation'
import SaveButton from '@/components/SaveButton'
import { fetchProjectContent } from '@/firebase/functions'
import { AiOutlineLoading } from "react-icons/ai";


/* PDF creation and editing page.*/
function Page() {
  const [content,setContent]=useState("") /*Content of the editor.*/
  const router=useRouter()
  const [error,setError]=useState(false)
  const [pdf,setpdf]=useState('https://pdfobject.com/pdf/sample.pdf',) /*Display a demo pdf initially.*/
  const [loading,setLoading]=useState(false) /*Check if code or pdf is being generated or not.*/
  const params=useParams()
  const projectId=params.projectId /* Project Id from URL params.*/

  /*Function to fetch previously saved code from firebase and set state.*/
  const fetchContent=async()=>{
    try{
        const cont=await fetchProjectContent(projectId as string)
        setContent(cont as string)
    }catch(e){
        console.error('Error fetching latest content.')
    }
  }

  /*Check if user is logged in. */
  useEffect(()=>{
      auth.onAuthStateChanged((user)=>{
        if(!user){
          router.replace('/')
          }
        else{
          router.refresh()
          fetchContent()
        }
      })
    },[]
    )
  
/*Function to submit user prompt.*/
  const handlePromptSubmit=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData=new FormData(e.currentTarget)
    const prompt=formData.get('prompt')
    if(prompt){
      setLoading(true)
      const aiResponse=await codeGenerator(content+'\n'+JSON.stringify(prompt));
      setContent(aiResponse.toString())
      setLoading(false)
    }
  }

/*Compile latex code from the backend and fetch the generated PDF.*/
  const getPDF=async()=>{
    setLoading(true)
    const res=await fetch('/api/pdfgenerator',{
      method:'POST',
      body:JSON.stringify({latex:content,firebaseFolderPath:`${auth.currentUser?.uid}/${params.projectId}`}),
    });

    if(res.status===500){
      console.log('compilation error occurred')
      setError(true)
    }else{
      setError(false)
    }
    const pdfBlob=await res.blob();
    const pdfUrl=URL.createObjectURL(pdfBlob);
    setpdf(pdfUrl)
    setLoading(false)
  }

  return (
    <div className='flex gap-2 h-screen p-4'>
      <FileList/>
      <div className='flex flex-col justify-between w-2/5 h-full'>
        <div className='flex bg-[#1f2223] p-4 gap-2 rounded-xl items-center justify-between'>
          <Link href={'/'}>
            <IoMdArrowRoundBack size={40} className='text-white rounded-full hover:bg-gray-600 cursor-pointer'/>
          </Link>
          <div className='flex gap-2'>
            <SaveButton data={content}/>
            <button className='bg-green-600 disabled:bg-green-300 p-2 rounded hover:bg-green-700 text-white'
              disabled={loading}
              onClick={async()=>{await getPDF()}}
            >
              Recompile
            </button>
          </div>
        </div>
         {/*Editor component for Latex code.*/}
        <AceEditor
          showPrintMargin={false}
          fontSize={18} wrapEnabled  setOptions={{newLineMode:'auto',}}
          height='80%' width='100%' value={content} theme='github_dark'  mode='latex'
          placeholder='%Write code Here' 
          className='rounded-xl'
          onChange={(value)=>{setContent(value)}}
        />
        {/*Form to submit user prompt.*/}
        <form onSubmit={handlePromptSubmit} className="flex gap-2 items-center p-4 bg-gray-600 rounded-lg shadow-md"> {/*Form to submit user prompt.*/}
          <textarea id="userInput" required placeholder="Enter a prompt here" name='prompt'
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <button id="sendButton" 
            className="p-4 text-white disabled:bg-blue-300 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} 
          >
            {(loading)?(<AiOutlineLoading size={20} className='animate-spin'/>):(<IoSend size={20}/>)}
          </button>  
        </form>  
      </div>
      {(error)?
        <CompilationError/>: /*In case of error.*/
        <embed type='application/pdf' className='w-2/5 h-full rounded-xl' src={`${pdf}#zoom=80#toolbar=0`}/>
      }
    </div>
  )
}

export default Page