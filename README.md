# TeXpert - AI PDF Generator.

**TeXpert** is an AI-powered PDF generator using LaTeX, built with Next.js. With TeXpert, you can effortlessly create professional-quality PDFs from simple text prompts. Whether you're drafting documents, reports, or even academic papers, TeXpert handles the heavy lifting by converting your ideas into beautifully formatted LaTeX code.

## Features

- **AI-Powered PDF Creation**: Generate LaTeX-based PDFs from plain English prompts.
- **Iterative Document Building**: Modify and extend your documents iteratively using natural language.
- **Image Support**: Upload images to include them seamlessly in your PDF documents.
- **Customizable Output**: Fine-tune the LaTeX code for personalized and detailed document formatting.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **AI API**: Gemini API
- **Database,Storage and Authentication**: Firebase

## How It Works

1. **Start with a Prompt**: Provide a prompt describing the content and structure of your document.
2. **Generate PDF**: TeXpert will convert your prompt into LaTeX code and generate a PDF.
3. **Iterate & Modify**: Use additional prompts to modify, extend, or refine the generated content.
4. **Add Images**: Upload images to be embedded within the document at specified locations.

## Installation

To run TeXpert locally, clone the repository and install the dependencies.

```bash
git clone https://github.com/Ananth-Joshi/texpert.git
cd TeXpert
npm install
sudo apt-get update
sudo apt-get install -y curl git build-essential texlive-full
```
## Usage
1. Input the necessary ENV variables. 

2. Run the development server:
   ```bash
   npm run dev
   ```
   
3. Open http://localhost:3000 to view it in the browser.

4. Sign In with Google: Click on the "Sign In" button to authenticate using your Google account.

5. Enter your prompt in the input field and hit the prompt button to create your PDF.

6. Upload images if required and use additional prompts to refine the document.

## Screenshots
![Screenshot from 2024-08-12 01-20-12](https://github.com/user-attachments/assets/0dd3b1f3-01d0-44c9-90bd-a3611840e2e9)
![image](https://github.com/user-attachments/assets/5d05f63c-35d7-4174-b8b2-bf777500f18a)
![Screenshot from 2024-08-12 01-19-42](https://github.com/user-attachments/assets/e27d0479-d300-4a3a-9b77-5bac8934b47e)


