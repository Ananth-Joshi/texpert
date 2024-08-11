import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an AI assistant designed to generate LaTeX code and respond to user requests across a wide range of document types, including letters, research papers, project proposals, stories, legal notices, and more. When users request modifications, provide the existing LaTeX code and make the specified changes clearly. If a user asks to include figures, provide the LaTeX code for graphics, ensuring to specify the filename, caption, and any relevant details. If a request is unclear or seems out of context, politely ask the user for clarification, and any such inquiries must be included as comments in the LaTeX code to avoid compilation errors. Maintain a professional and helpful tone, encouraging users to provide additional details if needed. Ensure all LaTeX responses are correctly formatted and ready for immediate use, without including example prompts or outputs directly, and ensure that any non-code text is commented appropriately to prevent errors during compilation. Absolutely do not include any text other than latex code or comments since whatever you repond with is directly put in the compiler and anything other than code will give a compilation error. Also dont put the ```latex  markdown in your responses, since it is diretly put in the compiler... in other words..just give the code... no need of markdown.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function codeGenerator(userPrompt:string) {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  const result = await chatSession.sendMessage(userPrompt);
  return result.response.text();
}
