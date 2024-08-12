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


### Using Docker

To run TeXpert using Docker, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ananth-Joshi/texpert.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd texpert
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root of the project directory and add your Firebase and gemini configuration variables just like given in .env.example .

4. **Build the Docker Image**:
   Run the following command to build the Docker image:
   ```bash
   docker build -t texpert .
   ```

5. **Run the Docker Container**:
   Use the following command to run the Docker container:
   ```bash
   docker run -p 3000:3000 --env-file .env texpert
   ```
   This command maps port 3000 on your host machine to port 3000 in the container and uses the environment variables defined in the `.env` file.

6. **Access the Application**:
   Open your web browser and navigate to `http://localhost:3000` to access TeXpert running in the Docker container.



## Screenshots
![Screenshot from 2024-08-12 01-20-12](https://github.com/user-attachments/assets/0dd3b1f3-01d0-44c9-90bd-a3611840e2e9)
![image](https://github.com/user-attachments/assets/5d05f63c-35d7-4174-b8b2-bf777500f18a)
![Screenshot from 2024-08-12 01-19-42](https://github.com/user-attachments/assets/e27d0479-d300-4a3a-9b77-5bac8934b47e)


