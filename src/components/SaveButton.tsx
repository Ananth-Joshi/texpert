'use client'
import { fetchProjectContent, saveProjectContent } from '@/firebase/functions'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

/*Button to save changes made in the editor. */
function SaveButton({data}:{data:string}) {
  const [serverContent,setServerContent]=useState('')
  const params=useParams()
  const projectId=params.projectId
  console.log(projectId)
  
  /*Fetch latest code content in firestore database */
  const fetchContent=async()=>{
    try{
        const content=await fetchProjectContent(projectId as string)
        setServerContent(content as string)
    }catch(e){
        console.error('Error fetching latest content.')
    }
  }

  useEffect(()=>{
    fetchContent()
  },[data])

  /*Display 'Unsaved Changes if there is a difference between editor and database content.' */
  if(serverContent==data){
    return (
    <button className='bg-green-600  p-2 rounded hover:bg-green-700 text-white'
    onClick={async()=>{
        if(projectId){
            await saveProjectContent({projectId:projectId as string,content:data})
            await fetchContent()
        }
    }}>
        Saved
    </button>
    )
  }
  else{
    return(
        <button className='bg-red-600  p-2 rounded hover:bg-red-700 text-white'
        onClick={async()=>{
            if(projectId){
                await saveProjectContent({projectId:projectId as string,content:data})
                await fetchContent()
            }

        }}
        >
            Unsaved changes
        </button>
    )
  }
}

export default SaveButton