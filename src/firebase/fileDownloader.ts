import { getDownloadURL, listAll, ref } from "firebase/storage"
import {storage} from '@/firebase/firebaseconfig'
import path from "path"
import fetch from 'node-fetch'
import fs from 'fs'


/*Function to download images from firebase into the server temporary directory before compilation of latex code(to render images in PDF). */
export async function downloadFilesFromFirebase(firebaseFolderPath: string, downloadFolderPath: string) {
    const folderRef = ref(storage, firebaseFolderPath);
    const { items } = await listAll(folderRef);

    // Ensure the download folder exists
    await fs.promises.mkdir(downloadFolderPath, { recursive: true });

    // Download each file
    const filePaths = await Promise.all(items.map(async (item) => {
        const downloadURL = await getDownloadURL(item);
        const response = await fetch(downloadURL);
        const arrayBuffer = await response.arrayBuffer();
        const buffer=Buffer.from(arrayBuffer)
        const filePath = path.join(downloadFolderPath, item.name);
        await fs.promises.writeFile(filePath, buffer);
        return filePath;
    }));

    return filePaths;
}
