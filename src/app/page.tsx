'use client'
import { collection, addDoc } from "firebase/firestore";
import { app, auth, db } from "@/firebase/firebaseconfig";
import NavBar from "@/components/NavBar";
import { getProjects } from "@/firebase/functions";
import { browserSessionPersistence, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Home() {
  const provider=new GoogleAuthProvider()
  const router=useRouter()
  const [dropdownOpen,setDropdownOpen]=useState(false)

  const handleLogin = async () => {
    try {
      auth.setPersistence(browserSessionPersistence)
      await signInWithPopup(auth, provider);
      router.refresh()
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
};

  return (
   <div className="h-screen">
   <NavBar/>
   <div className="flex flex-col items-center justify-center text-white  h-[calc(100vh-5rem)] bg-gray-800">
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-4xl font-bold mb-4">Welcome to TeXpert</h2>
        <p className="text-lg mb-8">
          Make Document with AI.
        </p>
        <div>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login to Get Started
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white text-black rounded shadow-lg">
                <button 
                  onClick={handleLogin} 
                  className="block w-full text-center px-4 py-2 hover:bg-gray-200"
                >
                  Sign in with Google
                </button>
              </div>
            )}
          </div>
      </main>

      <section id="features" className="bg-gray-800 py-12 w-full">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-6">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-600 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Generate Documents.</h4>
              <p>
              Our innovative AI-powered tool enables users to effortlessly generate high-quality LaTeX code tailored to their specific needs. 
              </p>
            </div>
            <div className="bg-gray-600 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Customize</h4>
              <p>
                Customize the document according to your use case.
              </p>
            </div>
            <div className="bg-gray-600 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Download PDF</h4>
              <p>
                Download the PDF directly from the cloud.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
   </div>
  );
}
