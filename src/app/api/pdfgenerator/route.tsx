import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import process from "process";
import { exec } from "child_process";

export async function POST(request:NextRequest){
    const {latex}=await request.json();
    console.log(latex)
    if (!latex) {
        return NextResponse.json({ error: 'No LaTeX code provided' }, { status: 400 });
    }

    const latexFilePath=path.join(process.cwd(),'document.tex');
    await fs.writeFile(latexFilePath,latex);
    
    return new Promise((resolve) => {
        exec(`pdflatex ${latexFilePath}`, async (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${stderr}`);
                return resolve(NextResponse.json({ error: 'Compilation failed', details: stderr }, { status: 500 }));
            }

            // Send the generated PDF file as a response
            const pdfFilePath = path.join(process.cwd(), 'document.pdf');
            const pdfBuffer = await fs.readFile(pdfFilePath);
            

            const response = new NextResponse(pdfBuffer, {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename=document.pdf',
                },
            });
            resolve(response);
        });
    });
}

