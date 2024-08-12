import React, { useEffect, useState } from 'react';
import { ref, listAll, uploadBytes, deleteObject } from 'firebase/storage';
import { auth, storage } from '@/firebase/firebaseconfig'; // Import the storage constant from your firebase config
import { useParams } from 'next/navigation';
import { MdDelete } from "react-icons/md";


const FileList: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]); // Store only file names
  const params = useParams();

  const fetchFiles = async () => {
    const folderRef = ref(storage, `${auth.currentUser?.uid}/${params.projectId}`);
    console.log('Fetching from folder:', folderRef); // Log the folder reference
    try {
      const { items } = await listAll(folderRef);
      const fileNames = items.map(item => item.name); // Get only the file names
      console.log('Fetched files:', fileNames); // Log fetched file names
      setFiles(fileNames);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileRef = ref(storage, `${auth.currentUser?.uid}/${params.projectId}/${file.name}`); // Specify file path
      try {
        await uploadBytes(fileRef, file);
        console.log('File uploaded:', file.name);
        await fetchFiles(); // Refresh the file list after upload
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const deleteFile = async (fileName: string) => {
    const fileRef = ref(storage, `${auth.currentUser?.uid}/${params.projectId}/${fileName}`); // Create a reference to the file
    try {
      await deleteObject(fileRef); // Delete the file
      console.log('File deleted:', fileName);
      await fetchFiles(); // Refresh the file list after deletion
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  useEffect(() => {
    fetchFiles(); // Fetch files when the component mounts
  });

  useEffect(() => {
    console.log('Files updated:', files); // Log the updated files
  }, [files]);

  return (
    <div
      className='w-1/5 bg-[#1f2223] rounded-xl overflow-y-auto p-4'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className='text-white text-lg mb-2 sticky'>Files (drag and drop only images)</h2>
      <ul className='text-white'>
        {files.length > 0 ? (
          files.map((fileName) => (
            <li key={fileName} className='flex py-1 px-1 items-center bg-gray-800 my-1'>
              {fileName} {/* Display only the file name */}
              <MdDelete 
                color='red' 
                className='hover:text-red-400 text-right cursor-pointer'
                onClick={async()=>{await deleteFile(fileName)}}
                />
            </li>
          ))
        ) : (
          <li>No files uploaded yet.</li>
        )}
      </ul>
    </div>
  );
};

export default FileList;
