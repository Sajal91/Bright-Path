import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'
import { getFinalPrompt } from "./prompt.js";

dotenv.config({ path: '.env' })

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


export async function generate(payload) {
    let prompt = getFinalPrompt(payload)
    // console.log(prompt)

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response;
}

export const trimAndParseJson = (inputString) => {
    // Regular Expression to find the content starting with the first '{' 
    // and ending with the last '}'. The 's' flag ([\s\S]) is key to matching 
    // content across multiple lines, which is common with formatted JSON.
    const jsonRegex = /\{[\s\S]*\}/;

    // Attempt to match the JSON object within the string
    const match = inputString.match(jsonRegex);

    if (match && match[0]) {
        try {
            // match[0] contains the clean JSON string
            const cleanJsonString = match[0];

            // Use JSON.parse() to convert the clean string to an object
            const data = JSON.parse(cleanJsonString);
            return data;
        } catch (e) {
            // Handle JSON parsing errors if the structure inside the braces is invalid
            return `Error decoding JSON after trimming: ${e.message}`;
        }
    } else {
        return "Error: Could not find a complete JSON object (starting with '{' and ending with '}') in the input string.";
    }
}