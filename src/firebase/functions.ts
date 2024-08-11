import { auth, db } from "./firebaseconfig"
import { collection } from "firebase/firestore"

export const getProjects=()=>{
    try{
        const uId=auth.currentUser?.uid
        console.log(uId)
        const colRef=collection(db,uId as string)
    }
    catch(error){
        console.error('Error fetching projects: '+error)
    }
}