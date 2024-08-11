import { auth, db } from "./firebaseconfig"
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"



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

export const fetchProjectContent = async (projectId:string) => {
    try {
      const docRef = doc(db, `${auth.currentUser?.uid}`, projectId); // Create a reference to the project document
      const docSnap = await getDoc(docRef); // Get the document snapshot
      if (docSnap.exists()) {
        return docSnap.data()?.content as string;
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching project: ', error);
    }
  };

export const saveProjectContent=async({projectId,content}:{projectId:string,content:string})=>{
    try {
      const docRef = doc(db, `${auth.currentUser?.uid}`, projectId); // Create a reference to the document
      await updateDoc(docRef, {
        content:content, // Update the 'content' field
      });
      console.log('Project content updated successfully!');
    } catch (error) {
      console.error('Error updating project content: ', error);
    }
  };
