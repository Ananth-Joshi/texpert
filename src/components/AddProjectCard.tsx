'use client'
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import {db, auth } from '@/firebase/firebaseconfig'; 

interface functionType{
    refreshFunction:()=>Promise<void>
}

/*Add new project component.Takes the project list refresh function as props.*/
const AddProjectCard:React.FunctionComponent<functionType>=({refreshFunction}) => {
  const [projectName, setProjectName] = useState('');


  /*Function to create new form and display refresh the page.*/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await addDoc(collection(db, `${auth.currentUser?.uid}`), {
        name: projectName,
        createdAt: new Date(),
        content:""
      });
   
      setProjectName('');
      refreshFunction();
      alert('Project added successfully!');
    } catch (error) {
      console.error('Error adding project: ', error);
      alert('Failed to add project.');
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 h-56 rounded-lg shadow-md w-80"
      >
        <h2 className="text-lg text-center font-bold mb-4">Add a New Project</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
        >
          Add Project
        </button>
      </form>
  );
};

export default AddProjectCard;