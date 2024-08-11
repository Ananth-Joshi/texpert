import { auth, db } from "./firebaseconfig"
import { collection, getDocs } from "firebase/firestore"



export const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db,`${auth.currentUser?.uid}`));
      const projectList: { name: string; createdAt: Date,id:string }[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        projectList.push({
          name: data.name,
          createdAt: data.createdAt.toDate(), // Convert Firestore timestamp to JavaScript Date
          id:doc.id
        });
      });
      return projectList;
    } catch (error) {
      console.error('Error fetching projects: ', error);
      throw error;
    }
  };