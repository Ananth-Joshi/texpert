'use client'
import { collection, addDoc } from "firebase/firestore";
import { app, db } from "@/firebase/firebaseconfig";
import NavBar from "@/components/NavBar";
import { getProjects } from "@/firebase/functions";

const handleClick = async () => {
 getProjects()
};

export default function Home() {
  return (
   <>
   <NavBar/>
   <button className="bg-white p-4 m-auto" onClick={handleClick}>
  Add Sample Document
</button>
   </>
  );
}
