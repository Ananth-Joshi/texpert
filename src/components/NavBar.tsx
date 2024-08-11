'use client'
import { auth } from '@/firebase/firebaseconfig';
import { browserSessionPersistence, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function NavBar() {
    const provider = new GoogleAuthProvider();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router=useRouter()

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                router.refresh()
            }
        })
    })
   
    const handleLogin = async () => {
        try {
        auth.setPersistence(browserSessionPersistence)
        await signInWithPopup(auth, provider);
        router.refresh()
        } catch (error) {
        console.error("Error signing in with Google: ", error);
        }
    };

    const handleLogout = async () => {
        try {
        await signOut(auth);
        router.refresh()
        } catch (error) {
        console.error("Error signing out: ", error);
        }
    };
    return (
        <nav className="flex justify-between items-center h-20 py-4 px-6 bg-gray-800 text-white">
      <h1 className="text-2xl">TeXpert</h1>
      <div className="relative">
        {auth.currentUser ? (
          <div className="flex items-center">      
          <span className="mr-4 items-center gap-2 bg-slate-300 text-black p-2 flex rounded-xl">
          <img className='size-8 rounded-full ' src={auth.currentUser.photoURL as string}></img>     
            {auth.currentUser.email}
            </span>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                <button 
                  onClick={handleLogin} 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Sign in with Google
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
    )
}

export default NavBar