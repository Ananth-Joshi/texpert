'use client'
import AddProjectCard from '@/components/AddProjectCard'
import NavBar from '@/components/NavBar'
import ProjectNameCard from '@/components/ProjectNameCard'
import { auth } from '@/firebase/firebaseconfig'
import { fetchProjects } from '@/firebase/functions'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface ProjectCard{
  name: string;
  createdAt: Date;
  id:string
}


function page() {
  const router=useRouter()
  const [projectList,setProjectList]=useState<ProjectCard[]|[]>([])
  
  const getProjects=async()=>{
    const data=await fetchProjects()
    setProjectList(data)
  }
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(!user){
        router.replace('/')
        }
      if(user){
        getProjects()
      }
      })
    }
  )

  
  return (
    <div className='h-screen'>
        <NavBar/>
        <div className='h-20 bg-gray-800 text-center text-3xl text-white p-5'>PROJECTS</div>
        <div className='flex pt-5 gap-2 flex-wrap justify-center h-[calc(100vh-10rem)] bg-gray-800'>
          
          {
            projectList.map((p)=>(
              <ProjectNameCard name={p.name} createdAt={p.createdAt} docId={p.id} />
            ))
          }
          <AddProjectCard refreshFunction={getProjects}/>
        </div>
    </div>
  )
}

export default page