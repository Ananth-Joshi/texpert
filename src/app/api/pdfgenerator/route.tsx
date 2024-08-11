import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import tmp from 'tmp';
import fs from 'fs/promises';

const execPromise = promisify(exec);

export async function POST(request: NextRequest) {
    const { latex } = await request.json();
    let tempCallback:()=>void;

    if (!latex) {
        return NextResponse.json({ error: 'No LaTeX code provided' }, { status: 400 });
    }

    // Create a temporary directory
    const tempDir = await new Promise<string>((resolve, reject) => {
        tmp.dir({ unsafeCleanup: true }, (err, path, cleanupCallback) => {
            if (err) {
                reject(err);
            } else {
                resolve(path);
                tempCallback=cleanupCallback
            }
        });
    });

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
            tempCallback()
            tmp.setGracefulCleanup();
            resolve(null);
        });

        return response;
    } catch (error) {
        console.error('Error during PDF generation:', error);
        return NextResponse.json({ error: 'PDF generation failed', details: error }, { status: 500 });
    }
}
