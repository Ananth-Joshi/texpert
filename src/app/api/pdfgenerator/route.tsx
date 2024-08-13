import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import tmp from 'tmp';
import fs from 'fs/promises';
import { downloadFilesFromFirebase } from '@/firebase/fileDownloader';


const execPromise = promisify(exec);


/* Route to generate PDFs from latex code. */
export async function POST(request: NextRequest) {
    const { latex, firebaseFolderPath } = await request.json();
    let tempCallback:()=>void=()=>{};  //Function to store cleanup function of temporary directory.

    if (!latex) {
        return NextResponse.json({ error: 'No LaTeX code provided' }, { status: 400 });  //No code provided.
    }

    // Create a temporary directory
    const tempDir = await new Promise<string>((resolve, reject) => {
        tmp.dir({ unsafeCleanup: true }, (err, path, cleanupCallback) => {
            tempCallback=cleanupCallback  //Store temporary folder cleanup function to cleaup later in case of error.
            if (err) {
                reject(err);
            } else {
                resolve(path);
                
            }
        });
    });

    //Download files from the project firebase storage folder before compiling the latex document.
    await downloadFilesFromFirebase(firebaseFolderPath,tempDir)

    //Create tex file in temporary folder.
    const latexFilePath = `${tempDir}/document.tex`;
    await fs.writeFile(latexFilePath, latex);

    try {
        // Compile the LaTeX document to PDF
        const { stdout, stderr } = await execPromise(`xelatex ${latexFilePath}`, { timeout: 10000, cwd: tempDir });

        // Check if the PDF file was created
        const pdfFilePath = `${tempDir}/document.pdf`;
        const pdfBuffer = await fs.readFile(pdfFilePath);

        const response = new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=document.pdf',
            },
        });

        // Clean up the temporary directory
        await new Promise((resolve, reject) => {
            tmp.setGracefulCleanup();
            resolve(null);
        });

        // Return PDF.
        return response;
    } catch (error) {
        console.error('Error during PDF generation:', error);
        return NextResponse.json({ error: 'PDF generation failed', details: error }, { status: 500 });
    }finally{
        if(tempCallback){
            //Clean file when error occurs before cleanup code runs.
            tempCallback()
        }
    }
}
